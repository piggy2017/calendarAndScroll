import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import datePicker from '@/components/datePicker'
import scroll from '@/components/scroll'
import swiper from '@/components/swiper'
import loadmore from '@/components/loadmore'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'datePicker',
      component: datePicker
    },
      {
          path: '/scroll',
          name: 'scroll',
          component: scroll
      },
      {
          path: '/swiper',
          name: 'swiper',
          component: swiper
      },
      {
          path: '/loadmore',
          name: 'loadmore',
          component: loadmore
      }
  ]
})
