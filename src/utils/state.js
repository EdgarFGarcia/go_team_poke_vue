import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/**
 * imports from modules
 */
import UserState from '../modules/user/state/UserState.js'
import UserHomeState from '@/modules/auth/user/state/UserState.js'

const store = new Vuex.Store({
    modules: {
        auth:           UserState,
        home:           UserHomeState
    },
    plugins: [createPersistedState()]
})

export default store