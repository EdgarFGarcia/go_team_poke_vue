import Vue from 'vue'

export default {
    namespaced: true,
    state: {
        user: {},
        snackbar: {
            show: false,
            message: "",
            button: false,
        },
        token: null
    },
    mutations: {
        setUser(state, payload){
            state.user = payload
        },
        setMessage(state, v) {
            state.snackbar.show = v.show
            state.snackbar.message = v.message
            state.snackbar.button = v.button
        },
        setToken(state, payload){
            state.token = payload
        }
    },
    getters: {
        getUser : state => state.user,
        mSnackbar : state => state.snackbar,
    },
    actions: {
        setUser({commit}, payload){
            commit('setUser', payload)
        },
        async registerUser(_, payload){
            const emit = await Vue.axios.post('/unauth/register', payload)
            return emit
        },
        async loginUser(_, payload){
            const emit = await Vue.axios.post('/unauth/login', payload)
            return emit
        },
        async userInfo({commit}, payload){
            await commit('setUser', payload)
        },
        async userToken({commit}, payload){
            await commit('setToken', payload)
        }
    }
}