import { ShowOptions } from '@nativescript-community/ui-mapbox'
export const mapToken =
  'pk.eyJ1IjoiaWduYWNpbzY4IiwiYSI6ImNrOWs3bzN6ZzA1Y2gzbW82dmtubm43ZnAifQ.3gcxeQCFEuPhpE1bkWw4HA'

export const customMapStyle = 'mapbox://styles/ignacio68/ckay3bxbr11qt1hquzxx1ohot'

export const initialMapSettings: ShowOptions = {
  accessToken: mapToken,
  style: null,
  // margins: {
  //   left: 0,
  //   right: 0,
  //   top: null,
  //   bottom: null,
  // },
  center: {
    lat: 0,
    lng: 0,
  },
  zoomLevel: 15,
  showUserLocation: true,
  hideLogo: false,
  hideAttribution: true,
  hideCompass: true,
  disableRotation: true,
  disableScroll: false,
  disableZoom: false,
  disableTilt: false,
  markers: [],
  // @locationPermissionGranted:"onLocationPermissionGranted",
  // @locationPermissionDenied:"onLocationPermissionDenied",
  // @mapReady: "onMapReady"
  // @scrollEvent: 'onScrollEvent'
  // @moveBeginEvent: '@onMoveBeginEvent'
}
