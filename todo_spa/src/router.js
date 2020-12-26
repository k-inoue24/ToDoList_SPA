import VueRouter from 'vue-router'
import router from './router.js'

import Top from '@/views/Top.vue'
import Add from '@/views/Add.vue'
import Download from '@/views/Download.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/',component: Top},
    {path: '/add',component: Add},
    {path: '/download',component: Download},
  ]
})

export default router