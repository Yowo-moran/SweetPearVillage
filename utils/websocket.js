let websock = null;
let messageCallback = null;
let errorCallback = null;
let wsUrl = '';

// 接收WebSocket后端返回的数据
function websocketOnMessage(e) {
    messageCallback(JSON.parse(e.data));
}

// 发送WebSocket消息
function websocketSend(agentData) {
    return new Promise((resolve, reject) => {
        if (websock.readyState === websock.OPEN) {
            // 发给后端的数据需要字符串化
            websock.send(JSON.stringify(agentData));
            resolve();
        } else if (websock.readyState === websock.CONNECTING) {
            websock.onopen = function () {
                websocketSend(agentData).then(() => {
                    resolve();
                }).catch((error) => {
                    reject(error);
                });
            };
        } else if (websock.readyState === websock.CLOSED) {
            console.log('WebSocket 连接已关闭');
            errorCallback('WebSocket 连接失败');
            reject('WebSocket 连接关闭');
        }
    });
}

// 关闭WebSocket连接
function websocketClose(e) {
    // e.code === 1000 表示正常关闭。无论为何目的而创建，该连接都已成功完成任务。
    // e.code !== 1000 表示非正常关闭。
    if (e && e.code !== 1000) {
        errorCallback(e);
        console.log('WebSocket 连接非正常关闭');
    }
    if (e && e.code === 1000) {
        console.log('WebSocket 连接已关闭');
    }
}

// 建立WebSocket连接
function websocketOpen(e) {
    console.log('WebSocket 连接已建立', e);
}

// 初始化WebSocket连接
function initWebSocket() {
    return new Promise((resolve, reject) => {
        if (typeof (WebSocket) === 'undefined') {
            console.log('WebSocket not supported');
            reject('WebSocket not supported');
        }
        // 完整的WebSocket连接地址
        const requstWsUrl = wsUrl;
        websock = new WebSocket(requstWsUrl, [localStorage.getItem('token')]);

        websock.onmessage = function (e) {
            websocketOnMessage(e);
        };
        websock.onopen = function (e) {
            websocketOpen(e);
            resolve();
        };
        websock.onerror = function (e) {
            console.log('ws连接异常，请稍候重试')
            errorCallback(e)
            reject('WebSocket connection error');
        };
        websock.onclose = function (e) {
            websocketClose(e);
        };
    });
}

/**
 * 发起WebSocket请求函数
 * @param {string} url WebSocket连接地址
 * @param {Object} agentData 传给后端的参数
 * @param {function} successCallback 接收到WebSocket数据，对数据进行处理的回调函数
 * @param {function} errCallback WebSocket连接错误的回调函数
 */
export function sendWebSocket(url, agentData, successCallback, errCallback) {
    wsUrl = url;
    console.log(wsUrl);
    messageCallback = successCallback;
    errorCallback = errCallback;
    initWebSocket().then(() => {
        websocketSend(agentData).then(() => {
            console.log('WebSocket data sent successfully');
        }).catch((error) => {
            console.log('WebSocket data sending failed', error);
        });
    }).catch((error) => {
        console.log('WebSocket connection failed', error);
    });
}

/**
 * 关闭WebSocket函数
 */
export function closeWebSocket() {
    if (websock) {
        websock.close(); // 关闭WebSocket
        websock.onclose(); // 关闭WebSocket
    }
}