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
        <NewLocation
          v-if="isVisibleNewLocationMenu"
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
  import { setNewUserMarker, updateUserMarker } from '@/api/userMarker'
  import { newLocation, removeLocation } from '@/api/locations'
  import {  addSource,
            setSecurityArea,
            showSecurityArea,
            removeSecurityArea,
          } from '@/api/securityArea'

  // import { setStorage } from '@/api/storage'
  import { Color } from '@nativescript/core/color'
  import { Screen } from '@nativescript/core'
  import { CubicBezierAnimationCurve } from  '@nativescript/core/ui/animation'

  import { Location, BasicPolygonOptions, LngLat } from '@/types/types'

  import { getVisibility } from '@/composables/useComponent'
  import { setVisibility } from '@/composables/useComponent'

  import { getMap as map } from '@/store/mapStore'
  import {
            getInitialLocation as initialLocation,
            getCurrentUserLocation as userLocation
          } from '@/store/userLocationStore'
  import { getUserMarker as userMarker } from '@/store/userMarkerStore'
  import { numberOfLocations } from '@/store/locationsStore'
  import securityArea from '@/store/securityAreaStore'

  import MapComponent from './MapComponent.vue'
  import NewLocation from './NewLocation.vue'
  // import NewArea from './NewArea.vue'

  export default({
    name: 'Home',

    components: {
      MapComponent,
      NewLocation,
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
      }
    },

    computed: {
      map,
      userLocation,
      userMarker,
      initialLocation, //TODO: Change to the user's country default center point
      isVisibleNewLocationMenu() {
        return getVisibility('newLocationMenu')
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

      isVisibleNewLocationMenu(newValue){
        console.log('isVisibleNewLocationMenu change')
        newValue === true ? this.showBottomSheet() : this.hideBottomSheet()
      },

      isNewAreaMenuShowing(newValue){
        newValue === true ? this.showBottomSheet() : this.hideBottomSheet()
      }
    },

    methods: {

      /***** MAP *****/
      onMapReady() {
        console.log('onMapReady()')
        setCenter().then(() => setNewUserMarker())
        this.setOnMapLongClickAction()
        if (!numberOfLocations()) this.$emit('first-location-alert')
        // TODO: Change source name, add options
        // addSource('main')
        // this.showMarkers()
      },

      setOnMapLongClickAction() {
        map().setOnMapLongClickListener(function (point: LngLat) {
          updateUserMarker(point)
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

      /***** USER MARKER *****/
      onTapMarker() {
        console.log('onTap marker')
        setVisibility('newLocationMenu', true)
      },

      /***** LOCATIONS ******/
      onTapLocation() {
        console.log('onTapLocation()')
        setVisibility('newLocationMenu', true)
      },

      onCalloutTapLocation() {
        console.log('onCalloutTapLocation()')
      },

      newLocation(values: Location) {
        console.log(`newLocation()`)
        values.selected = true
        values.onTap = this.onTapLocation()
        values.onCalloutTap = this.onCalloutTapLocation()
        // const Location = setLocation(values)

        // TODO: sustituir por el código de abajo
        // addLocation(marker)
        this.hideBottomSheet()
        // setStorage(marker.id, marker).then(success => {
        //   console.log(`setStorage? ${success}`)
        //   if(success){
        //     addMarker(this.map, marker)
        //   }
        // })
      },

      removeLocation(id: string) {
        removeLocation(id)
      },

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
