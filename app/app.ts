/**
 * @file Information and help about Covid-19
 *
 * @copyright Ignacio López-Amor Pinillos 2020
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license APACHE
 * @version 0.4.0
 */

import Vue from 'nativescript-vue'

import VueDevtools from 'nativescript-vue-devtools'

// Plugins
import '@/plugins/installMapbox'

// Internationalization
import { i18n, setLanguage } from '@/locales'

//Components
import Home from './views/Home.vue'
// import HomeTest from './views/TestViews/HomeTest.vue'

import { initLocationStorage } from '@/api/locationsStorage'
// import { addNewLocation } from '@/store/locationsStore'

if (TNS_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Vue.use(VueDevtools as any)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production'

new Vue({
  i18n,
  created() {
    setLanguage()
    initLocationStorage()
  },
  render: (h) => h('frame', [h(Home)]),
  // render: (h) => h('frame', [h(HomeTest)]),
}).$start()
