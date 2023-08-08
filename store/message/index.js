const state = {
    socket: null
}

const actions = {
    connectWebSocket({ commit }, url) {
        const socket = new WebSocket(url)
    }
}

const mutations = {

}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}