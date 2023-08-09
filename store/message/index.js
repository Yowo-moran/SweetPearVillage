const state = {
	// 用于让聊天界面保持当前位置
	count: 0,
	// 存储ws连接
	socket: null,
	// 聊天首页列表数据
	chatList: [
		{
			lastTalkMsg: '',
			lastTalkMsgType: 1,
			lastTalkTime: '',
			receiverAvatar: '',
			receiverName: '',
			receiverOpenId: '',
			unreadMsgNum: 0
		}
	],
	// 新消息
	newChat: {
		senderOpenId: "",
		senderNickName: "",
		senderAvatar: "",
		sendTime: "",
		message: "",
		msgType: 1,// 消息类型，1为普通消息，2为图片，3为语音
		inChatView: false //是否在聊天页，是的话为true，否的话为fasle
	},
	// 存储消息通知
	notice: {
		senderOpenId: '',

	},
	// 聊天界面数据
	chatHistoryList: [
		{
			message: "",
			msgId: 1,
			msgType: 1,
			receiverOpenId: "",
			senderOpenId: "",
			sendTime: ""
		},
	],
	receiverAvatar: '',
	receiveNickname: '',
	// 存储当前聊天对象
	chatter: ''
}

const actions = {
	connectWebSocket({ commit }) {
		const token = wx.getStorageSync('token')
		// const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiIyMzc1Njk3OTY5MDc3NDYxNDQ2MDM0OTA0MTU0IiwiaWQiOjEsImV4cCI6MTY5MjY5MDI0NX0.nfYhj4tjKmDKIHp4eH15_HjS64urMazIhM1tsSINR1U'
		const socket = wx.connectSocket({
			url: `wss://silentdragon.pro:7115/private-chat/{${token}}`
		})
		socket.onOpen(() => {
			console.log('WebSocket connection established')
		})
		socket.onMessage((res) => {
			const data = JSON.parse(res.data)
			if (data.code) {
				console.log(data.message);
			} else
				commit('GET_NEWCHAT', data)
		})
		socket.onClose((res) => {
			console.log(res)
			if (res.code !== 1000) {
				console.log('尝试重连');
				setTimeout(() => {
					const socket = wx.connectSocket({
						url: `wss://silentdragon.pro:7115/private-chat/{${token}}`
					})
					commit('SET_SOCKET', socket);
				}, 2000)
			} else {
				console.log('连接已关闭');
			}
		})
		socket.onError((res) => {
			console.log(res);
			setTimeout(() => {
				const socket = wx.connectSocket({
					url: `wss://silentdragon.pro:7115/private-chat/{${token}}`
				})
				commit('SET_SOCKET', socket);
			}, 2000)
		})
		commit('SET_SOCKET', socket);
	},

	closeWeb({ commit }) {
		commit('CLOSE')
	},

	sendMine({ state }, message) {
		if (state.socket && state.socket.readyState === 1) {
			state.socket.send({
				data: JSON.stringify(message)
			});
		} else {
			console.error('WebSocket connection is not open')
		}
	},

	async getChatList({ commit }) {
		await wx.request({
			url: 'https://101.43.254.115:7115/page/message',
			header: {
				Authorization: wx.getStorageSync('token')
				// Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiIyMzc1Njk3OTY5MDc3NDYxNDQ2MDM0OTA0MTU0IiwiaWQiOjEsImV4cCI6MTY5MjY5MDI0NX0.nfYhj4tjKmDKIHp4eH15_HjS64urMazIhM1tsSINR1U'
			},
			method: 'GET',
			success(res) {
				if (res.data.code === '00000') {
					commit('SET_CHATLIST', res.data.data)
				}
				else {
					console.log('请求失败')
				}
			}
		})
	},
	async getInform({ commit }, talkerOpenId) {
		console.log(talkerOpenId)
		commit('SET_CHATTER', talkerOpenId)
		await wx.request({
			url: `https://101.43.254.115:7115/chat-page/${talkerOpenId}`,
			header: {
				Authorization: wx.getStorageSync('token')
			},
			method: 'GET',
			success(res) {
				if (res.data.code === '00000') {
					commit('SET_CHATHISTORYLIST', res.data.data)
				}
				else {
					console.log('请求失败', res);
				}
			}
		})
	},
	async getHistory({ commit }, { msgId, that, openId, time }) {
		wx.request({
			url: `https://101.43.254.115:7115/chat-history/${openId}`,
			data: {
				currentMsgId: msgId
			},
			header: {
				Authorization: wx.getStorageSync('token')
			},
			method: 'GET',
			success(res) {
				console.log(res);
				if (res.data.data.chatHistoryList[0]) {
					commit('ADD_OLDCHAT', { data: res.data.data.chatHistoryList, that: that, time: time })
				}
			}
		})
	}
}

const mutations = {
	CLOSE(state) {
		state.socket.close();
	},

	SET_SOCKET(state, socket) {
		state.socket = socket
	},
	SET_CHATLIST(state, data) {
		console.log('@SET_CHATLIST', data)
		state.chatList = data.chatList
	},
	SET_CHATHISTORYLIST(state, data) {
		console.log('@SET_CHATHISTORYLIST', data)
		state.chatHistoryList = data.chatHistoryList
		state.receiveNickname = data.receiveNickname
		state.receiverAvatar = data.receiverAvatar
	},
	// 处理聊天对象
	SET_CHATTER(state, data) {
		console.log('@CHATTER', data)
		state.chatter = data
	},
	// 处理ws连接发过来的数据
	GET_NEWCHAT(state, res) {
		console.log(res);
		if (!res.inChatView) {
			console.log('当前不在聊天页')
			state.newChat = res
			const index = state.chatList.findIndex(item => {
				return item.receiverOpenId === res.senderOpenId
			})
			if (index !== -1) {
				state.chatList[index].lastTalkMsg = res.message
				state.chatList[index].lastTalkMsgType = res.msgType
				state.chatList[index].receiverAvatar = res.senderAvatar
				state.chatList[index].lastTalkTime = res.sendTime
				state.chatList[index].receiverName = res.senderNickName
				state.chatList[index].unreadMsgNum++
				state.chatList.sort((a, b) => {
					return Date.parse(b.lastTalkTime) - Date.parse((a.lastTalkTime))
				})
			}
			else {
				const temp = {
					lastTalkMsg: res.message,
					lastTalkMsgType: res.msgType,
					receiverAvatar: res.senderAvatar,
					lastTalkTime: res.sendTime,
					receiverName: res.senderNickName,
					receiverOpenId: res.senderOpenId,
					unreadMsgNum: 1
				}
				state.chatList.unshift(temp)
			}
		} else {
			// 判断消息是否为当前聊天
			console.log('当前在聊天页')
			if (res.senderOpenId !== state.chatter) return;
			const temp = {
				message: res.message,
				msgType: res.msgType,
				senderOpenId: res.senderOpenId,
				sendTime: res.sendTime
			}
			state.chatHistoryList.push(temp)
			state.count++
		}
	},
	// 处理自己发的数据
	ADD_NEWCHAT(state, data) {
		console.log(data);
		state.chatHistoryList.push(data)
	},
	// 处理历史记录
	ADD_OLDCHAT(state, { data, that, time }) {
		console.log(data, that, time);
		state.chatHistoryList.unshift(...data);
		that.scrollIntoIndex = time
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}