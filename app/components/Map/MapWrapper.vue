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
      @set-center="centerMarker"
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
  import {  setMarker,
            addMarker,
            updateMarker,
            removeMarker,
            setUserMarkerNewCoordinatesOptions
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

  import { BasicMarker, Marker, BasicPolygonOptions, LngLat } from '@/types/types'

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
        // hasMarkers
        initialLocation: initialLocation()
      }
    },

    computed: {
      map,
      userLocation,
      numberOfMarkers,
      initialMarker(): BasicMarker {
        console.log(`Current LngLat: ${JSON.stringify(userLocation())}`)
        const initialMarker: Marker = {
          id: '_user',
          lat: userLocation().lat,
          lng: userLocation().lng,
          onTap: () => console.log('on tap marker!')
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
      console.log('mounted()')
      // // this.$root.$on('remove-security-area', value => this.removeSecurityArea(value.name))
      await setCenter()
    },

    methods: {

      /***** MAP *****/
      async onMapReady() {
        console.log('onMapReady()')
        const vm = this
        await setCenter().then(() => addMarker(vm.initialMarker))
        // setCenter()
        // addMarker(this.initialMarker)
        this.setOnMapLongClickAction()
        if (!hasMarkers() || (numberOfMarkers() === 1 && getMarker('_user'))) this.$emit('first-marker-alert')

        // TODO: Change source name, add options
        // addSource('main')
        // this.showMarkers()
      },

      setOnMapLongClickAction() {
        const vm = this
        map().setOnMapLongClickListener(function (point: LngLat) {
          const values:Marker = setUserMarkerNewCoordinatesOptions(point)
          vm.updateMarker(values)
          return true
        })
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
      onTapMarker() {
        console.log('onTap marker')
      },

      onCalloutTapMarker() {
        console.log('onCallOutTap marker')
      },

      newMarker(values: Marker) {
        console.log(`newMarker()`)
        // if(!values.id || !values.coordinates) {
        //   this.hasNewMarkerError = true
        //   return
        // }
        values.selected = true
        values.onTap = this.onTapMarker()
        values.onCalloutTap = this.onCalloutTapMarker()
        const marker = setMarker(values)

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

      updateMarker(values: Marker) { // TODO: Add true type
        const currentMarker: Marker = getMarker(values.id)
        currentMarker.update(values)
        updateMarker(values)
      },

      centerMarker() {
        const values: BasicMarker = setUserMarkerNewCoordinatesOptions(userLocation())
        values.id = '_user'
        this.updateMarker(values)
        setCenter()
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
        const polygonOptions: BasicPolygonOptions = {
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
