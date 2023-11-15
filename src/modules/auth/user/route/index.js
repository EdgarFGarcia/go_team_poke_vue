import UserDashboard from '@/modules/auth/user/UserDashboardComponent.vue'

export default [
    {
        path: '/home',
        name: '/home',
        meta: {
            layout: 'home'
        },
        component: UserDashboard
    }
]