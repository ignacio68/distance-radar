<template>
  <GridLayout>
    <MapComponent
      height="100%"
      row="0"
      :mapToken="mapToken"
      :zoomLevel="15"
      :userLatitude="initialLocation.lat"
      :userLongitude="initialLocation.lng"
      @on-map-ready="onMapReady($event)"
      @on-marker-updated="updateMarker"
      @on-set-center="centerMarker"
    />
    <Frame
      id="bottomSheet"
      ref="bottomSheet"
      borderTopLeftRadius="16"
      borderTopRightRadius="16"
      backgroundColor="white"
      verticalAlignment="top"
      @loaded="loadBottomSheet"
    >
      <StackLayout>
        <NewMarker
          v-if="isVisibleNewMarkerMenu"
          class="newMarker m-16"
          backgroundColor="white"
          @enabled-fab="isEnabledFAB"
          @add-new-marker="newMarker"
        />
        <!-- <NewArea
          v-if="isNewAreaMenuShowing"
          class="newArea m-16"
          backgroundColor="white"
          @enabled-fab="isEnabledFAB"
          @on-new-area-cancel="hideBottomSheet()"
          @on-new-area-done="newSecurityArea"
        /> -->
      </StackLayout>
    </Frame>
  </GridLayout>
</template>

<script lang="ts">
  import { mapToken } from '@/setup/map'

  import { setCenter } from '@/api/map'
  import {  addMarker,
            updateMarker,
            removeMarker,
          } from '@/api/markers'
  import {  addSource,
            setSecurityArea,
            showSecurityArea,
            removeSecurityArea,
          } from '@/api/securityArea'

  // import { setStorage } from '@/api/storage'
  import { Color } from '@nativescript/core/color'
  import { Screen } from '@nativescript/core'
  import { CubicBezierAnimationCurve } from  '@nativescript/core/ui/animation'

  import { Marker, PolygonOptions, LngLat, UpdatedMarkerCoordinatesOptions } from '@/types/types'

  import { getVisibility } from '@/composables/useComponent'

  import { getMap as map } from '@/store/mapStore'
  import {
            getInitialLocation as initialLocation,
            getCurrentUserLocation as userLocation
          } from '@/store/userLocationStore'
  import { hasMarkers, numberOfMarkers, getMarker } from '@/store/markersStore'
  import securityArea from '@/store/securityAreaStore'

  import MapComponent from './MapComponent.vue'
  import NewMarker from './NewMarker.vue'
  // import NewArea from './NewArea.vue'

  export default({
    name: 'Home',

    components: {
      MapComponent,
      NewMarker,
      // NewArea
    },

    props:{
      isVisible: {
        type: Boolean,
        default: true
      },
      isNewAreaMenuShowing: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        mapToken: mapToken,
        screenHeight: Screen.mainScreen.heightDIPs,
        radius: 1,
        fillOpacity: 5,
        activeUser: null,
        // map,
        // userLocation,
        // hasMarkers
        initialLocation: initialLocation()
      }
    },

    computed: {
      map,
      userLocation,
      numberOfMarkers,
      initialMarker(): Marker {
        console.log(`Current LngLat: ${JSON.stringify(userLocation())}`)
        const initialMarkerCoordinates = userLocation()
        const initialMarker: Marker = {
          id: '_user',
          lat: initialMarkerCoordinates.lat,
          lng: initialMarkerCoordinates.lng
        }
        return initialMarker
      },

      isVisibleNewMarkerMenu() {
        return getVisibility('newMarkerMenu')
      },

      bottomSheet() {
        return this.$refs.bottomSheet.nativeView
      },

      getRadius: {
        get: function() { return this.radius },
        set: function (value: number) {
          this.radius = value
        }
      },

      getFillOpacity: {
        get: function () {return this.fillOpacity},
        set: function (value: number) {
          this.fillOpacity = value
        }
      }
    },

    watch: {
      isVisible: function(newValue) {
        this.showSecurityArea('user', newValue)
      },

      isVisibleNewMarkerMenu(newValue){
        console.log('isVisibleNewMarkerMenu change')
        newValue === true ? this.showBottomSheet() : this.hideBottomSheet()
      },

      isNewAreaMenuShowing(newValue){
        newValue === true ? this.showBottomSheet() : this.hideBottomSheet()
      }
    },

    async mounted() {
      // console.log('mounted()')
      // // this.$root.$on('remove-security-area', value => this.removeSecurityArea(value.name))
    },

    methods: {

      /***** MAP *****/
      async onMapReady() {
        console.log('onMapReady()')
        await setCenter()
        const initialMarker = this.initialMarker
        await addMarker(initialMarker)
        map().setOnMapLongClickListener(function (point: LngLat) {
          console.log(`Map clicked at latitude: ${point.lat} and Longitude ${point.lng}` )
          return true
        })

        if (!hasMarkers() || (numberOfMarkers() === 1 && getMarker('_user'))) this.$emit('first-marker-alert')

        // TODO: Change source name, add options
        // addSource('main')
        // this.showMarkers()
      },

      isEnabledFAB(bool) {
        console.log(`isEnabledFAB(): ${bool}`)
        this.$emit('enabled-fab', bool)
      },
      // onRadiusChange(value) {
      //    this.getRadius = value
      // },

      /***** BOTTOM SHEET *****/
      loadBottomSheet() {
        this.bottomSheet.translateY = this.screenHeight
      },
      showBottomSheet() {
        this.animationBottomSheet(600)
      },
      hideBottomSheet() {
        this.animationBottomSheet(0)
      },
      animationBottomSheet(height: number) {
        this.bottomSheet.animate({
          duration: 1000,
          translate: { x: 0, y: this.screenHeight - height },
          curve: new CubicBezierAnimationCurve(.44, .63, 0, 1)
        })
      },

/***** MARKERS *****/

      newMarker(values) { // TODO: Add true type
        console.log(`newMarker()`)
        // if(!values.id || !values.coordinates) {
        //   this.hasNewMarkerError = true
        //   return
        // }
        const marker: Marker = {
          id: values.id,
          group: values.group,
          lat: values.coordinates.lat,
          lng: values.coordinates.lng,
          title: values.id,
          selected: true,
          // onTap: () => this.newSecurityArea(values.id, values.color),
        }
        // TODO: sustituir por el código de abajo
        addMarker(marker)
        this.hideBottomSheet()
        // setStorage(marker.id, marker).then(success => {
        //   console.log(`setStorage? ${success}`)
        //   if(success){
        //     addMarker(this.map, marker)
        //   }
        // })

      },

      updateMarkerCoordinates(options: UpdatedMarkerCoordinatesOptions): Marker { // TODO: Add true type
        const { id, coordinates } = options
        const currentMarker = getMarker(id)
        const updatedMarker = Object.assign(currentMarker, coordinates)
        return updatedMarker
      },

      updateMarker(options: UpdatedMarkerCoordinatesOptions) { // TODO: Add true type
        const updatedMarker: Marker = this.updateMarkerCoordinates(options)
        const coordinates: any = options.coordinates
        updatedMarker.update(coordinates)
      },

      setUpdatedMarkerCoordinatesOptions(coordinates: LngLat) {
        const options: UpdatedMarkerCoordinatesOptions = {
          id: '_user',
          coordinates
        }
        return options
      },

      centerMarker() {
        const coordinates = userLocation()
        const options: UpdatedMarkerCoordinatesOptions = this.setUpdatedMarkerCoordinatesOptions(coordinates)
        this.updateMarker(options)
      },

      removeMarker(id: string) {
        removeMarker(id)
      },
      // showMarkers() {
      //   this.activeUser = '_user'
      //   this.newMarker(this.activeUser)
      //   console.log('showMarkers')
      //   console.dir(JSON.stringify(this.markers))
      // },

      /***** SECURITY AREA ******/

      newSecurityArea(id: string, color: any) {
        if (securityArea.getSecurityArea(id)) {
          console.log(`${id} exist, choose another name`)
          return
        }
        const polygonOptions: PolygonOptions = {
          id: id,
          radius: this.radius,
          fillColor: new Color(color),
          fillOpacity: this.fillOpacity / 10,
          isVisible: true
        }
        setSecurityArea(polygonOptions)
      },

      showSecurityArea(id: string, value:boolean) {
        showSecurityArea(id, value)
      },

      removeSecurityArea(id: string) {
        console.log(`remove polygon: ${id}`)
        removeSecurityArea(id)
      }
    }
  })
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.newMarker {
  color: $primary-dark;
}
</style>
