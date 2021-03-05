import BottomNavigation from '@nativescript-community/ui-material-bottom-navigation/vue'
import FloatingActionButtonPlugin from '@nativescript-community/ui-material-floatingactionbutton/vue'
import BottomSheetPlugin from '@nativescript-community/ui-material-bottomsheet/vue'
import { install as installBottomSheet } from '@nativescript-community/ui-material-bottomsheet'
import ButtonPlugin from '@nativescript-community/ui-material-button/vue'
import SliderPlugin from '@nativescript-community/ui-material-slider/vue'

import { RadSideDrawer } from 'nativescript-ui-sidedrawer'
import { MapboxView } from '@nativescript-community/ui-mapbox'

installBottomSheet()

const Plugin = {
  install(Vue: any) {
    Vue.use(BottomNavigation)
    Vue.use(FloatingActionButtonPlugin)
    Vue.use(BottomSheetPlugin)
    Vue.use(ButtonPlugin)
    Vue.use(SliderPlugin)

    Vue.registerElement('RadSideDrawer', () => RadSideDrawer)
    Vue.registerElement('Mapbox', () => MapboxView)
  },
}

export default Plugin
