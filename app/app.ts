/**
 * @file Information and help about Covid-19
 *
 * @copyright Ignacio López-Amor Pinillos 2020
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license APACHE
 * @version 0.4.0
 */

import VueDevtools from 'nativescript-vue-devtools'
import Vue from 'nativescript-vue'

// Internationalization
import { i18n, setLanguage } from '@/locales'

//Components
// import Main from './views/Main/Main.vue'
import MainNavigation from '@/views/Navigation/MainNavigation.vue'
import Main from '@/views/Main/Main.vue'
import DrawerContent from '@/views/Navigation/DrawerContent.vue'
// import HomeTest from './views/TestViews/HomeTest.vue'

if (TNS_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Vue.use(VueDevtools as any, { host: '192.168.1.22' })
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production'

new Vue({
  i18n,
  created() {
    setLanguage()
  },
  render: (h) =>
    h(MainNavigation, [
      h(DrawerContent, { slot: 'drawerContent' }),
      h(Main, { slot: 'mainContent' }),
    ]),
  // render: (h) => h('frame', [h(MainNavigation)]),
  // render: (h) => h('frame', [h(HomeTest)]),
}).$start()
