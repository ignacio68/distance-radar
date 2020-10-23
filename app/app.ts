/**
 * @file Information and help about Covid-19
 *
 * @copyright Ignacio López-Amor Pinillos 2020
 * @author Ignacio López-Amor Pinillos <ignaciolopezamor@gmail.com>
 * @license APACHE
 * @version 0.1.0
 */

import Vue from "nativescript-vue"

// Plugins
import '@/plugins/installMapbox'
import VueDevtools from 'nativescript-vue-devtools'

// Internationalization
import { i18n, setLanguage } from '@/locales'

// Geolocation
import { getCurrentUserLocation } from '@/services/geolocationService'
//Components
import Home from './views/Home.vue'

if (TNS_ENV !== 'production') {
  Vue.use(VueDevtools as any)
}

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = TNS_ENV === 'production'


new Vue({
  i18n,
  beforeCreate() {
    setLanguage()
  },
  async mounted() {
    await getCurrentUserLocation()
  },
  render: (h) => h('frame', [h(Home)]),
}).$start()
