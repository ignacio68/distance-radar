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
import MainNavigation from '@/views/Navigation/MainNavigation.vue'
import Main from '@/views/Main/Main.vue'
import DrawerContent from '@/views/Navigation/DrawerContent.vue'
// import HomeTest from './views/TestViews/HomeTest.vue'

if (TNS_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Vue.use(VueDevtools as any, { host: '192.168.1.22' })

  const inspect = require('util-inspect')
  const newLineRegExp = /\\n/g
  console.log = (function (log, inspect, Vue) {
    return function (...args) {
      return log.call(
        this,
        ...Array.prototype.map.call(args, function (arg) {
          return inspect(arg, {
            depth: 2,
            colors: Vue.config,
            showHidden: true,
          }).replace(newLineRegExp, '\n')
        }),
      )
    }
  })(console.log, inspect, Vue)
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
