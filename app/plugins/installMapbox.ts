/* eslint-disable @typescript-eslint/no-var-requires */
// MapBox
import Vue from 'nativescript-vue'

Vue.registerElement('Mapbox', () => require('@nstudio/nativescript-mapbox').MapboxView)
