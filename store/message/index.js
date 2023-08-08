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
	// 聊天界面数据
	chatHistoryList: [
		{
			message: "Hello how are you?",
			msgId: 1,
			msgType: 1,
			receiverOpenId: "",
			senderOpenId: "2375697969077461446034904154",
			sendTime: "2023-08-08 12:51:24"
		},
		{
			message: "I'm fine, thank you. And you ? ",
			msgId: 2,
			msgType: 1,
			receiverOpenId: "",
			senderOpenId: "2375697969077461446034901122",
			sendTime: "2023-08-08 12:52:24"
		},
		{
			message: "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
			msgId: 3,
			msgType: 2,
			receiverOpenId: "",
			senderOpenId: "2375697969077461446034904154",
			sendTime: "2023-08-08 12:53:24"
		},
		{
			message: "Nice picture!",
			msgId: 4,
			msgType: 1,
			receiverOpenId: "",
			senderOpenId: "2375697969077461446034901122",
			sendTime: "2023-08-08 12:54:24"
		},
		{
			message: "Thank you",
			msgId: 5,
			msgType: 1,
			receiverOpenId: "",
			senderOpenId: "2375697969077461446034904154",
			sendTime: "2023-08-08 12:55:24"
		},
		{
			message: "https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg",
			msgId: 6,
			msgType: 2,
			receiverOpenId: "",
			senderOpenId: "2375697969077461446034904154",
			sendTime: "2023-08-08 12:56:24"
		},
	],
	receiverAvatar: 'https://pic2.zhimg.com/v2-fbfd76ad09fd529970c0e8a29107df35_r.jpg',
	receiveNickname: '胡图图'
}

const actions = {
	connectWebSocket({ commit }) {
		// const token = wx.getStorageSync('token')
		const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiIyMzc1Njk3OTY5MDc3NDYxNDQ2MDM0OTA0MTU0IiwiaWQiOjEsImV4cCI6MTY5MjY5MDI0NX0.nfYhj4tjKmDKIHp4eH15_HjS64urMazIhM1tsSINR1U'
		const socket = wx.connectSocket({
			url: `wss://silentdragon.pro:7115/private-chat/{${token}}`
		})
		socket.onOpen(() => {
			console.log('WebSocket connection established')
		})
		socket.onMessage((res) => {
			commit('GET_NEWCHAT', res)
		})
		socket.onClose((res) => {
			if (res.code !== 1000) {
				console.log('尝试重连');
				setTimeout(() => {
					const socket = wx.connectSocket({
						url: `wss://silentdragon.pro:7115/private-chat/{${token}}`
					})
					commit('SET_SOCKET', socket);
				})
			} else {
				console.log('连接已关闭');
			}
		})
		commit('SET_SOCKET', socket);
	},

	sendMine({ state }, message) {
		if (state.socket && state.socket.readyState === 1) {
			state.socket.send(JSON.stringify(message));
		} else {
			console.error('WebSocket connection is not open')
		}
	},

	async getChatList({ commit }) {
		await wx.request({
			url: 'https://101.43.254.115:7115/page/message',
			header: {
				// Authorization: wx.getStorageSync('token')
				Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiIyMzc1Njk3OTY5MDc3NDYxNDQ2MDM0OTA0MTU0IiwiaWQiOjEsImV4cCI6MTY5MjY5MDI0NX0.nfYhj4tjKmDKIHp4eH15_HjS64urMazIhM1tsSINR1U'
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
	async getInform({ commit }, openId) {
		await wx.request({
			url: `http://101.43.254.115:7115/chat-page/{${openId}}`,
			header: {
				Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJvcGVuaWQiOiIyMzc1Njk3OTY5MDc3NDYxNDQ2MDM0OTA0MTU0IiwiaWQiOjEsImV4cCI6MTY5MjY5MDI0NX0.nfYhj4tjKmDKIHp4eH15_HjS64urMazIhM1tsSINR1U'
			},
			method: 'GET',
			success(res) {
				if (res.data.code === '00000') {
					commit('SET_CHATHISTORYLIST', res.data.data)
				}
				else {
					console.log('请求失败');
				}
			}
		})
	}
}

const mutations = {
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
	// 处理ws连接发过来的数据
	GET_NEWCHAT(state, res) {
		if (!res.inChatView) {

			const index = state.chatList.findIndex(item => {
				item.receiverOpenId === res.senderOpenId
			})
			if (index !== -1) {
				state.chatList[index].lastTalkMsg = res.message
				state.chatList[index].lastTalkMsgType = res.msgType
				state.chatList[index].receiverAvatar = res.senderAvatar
				state.chatList[index].lastTalkTime = res.sendTime
				state.chatList[index].receiverName = res.senderNickName
				state.chatList[index].unreadMsgNum++
			}
			else {
				const temp = {
					lastTalkMsg: res.message,
					lastTalkMsgType: res.msgTy,
					receiverAvatar: res.sender,
					lastTalkTime: res.sendTime,
					receiverName: res.senderNickName,
					receiverOpenId: res.senderOpenId,
					unreadMsgNum: 1
				}
				state.chatList.unshift(temp)
			}
		} else {
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
	}
}

export default {
	namespaced: true,
	state,
	actions,
	mutations
}