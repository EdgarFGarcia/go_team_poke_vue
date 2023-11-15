import Vue from 'vue'
import App from './App.vue'

// router
import router from './utils/router.js'
// axios
import axios from './utils/axios.js'

// store
import store from './utils/state.js'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// layouts
import Default from './layout/DefaultLayout.vue'
import Home from '@/layout/HomeLayout.vue'

Vue.component('default-layout', Default)
Vue.component('home-layout', Home)

Vue.use(axios)

new Vue({
  router: router,
  store: store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
