import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * imports
 */
import UserDashboard from '@/modules/auth/user/route/index.js'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        ...UserDashboard
    ]
})