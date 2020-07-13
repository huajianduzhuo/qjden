import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Timeline from '../views/QjdevTimeline.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Timeline',
    component: Timeline,
  },
]

const router = new VueRouter({
  routes,
})

export default router
