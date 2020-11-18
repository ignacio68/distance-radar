<template>
  <Page actionBarHidden="true">
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
      <StackLayout
        v-if="backgroundFilter"
        class="backgroundFilter"
        row="0"
        height="100%"
        width="100%"
      />
      <!-- <Button
        id="bottomSheet"
        ref="bottomSheet"
        borderTopLeftRadius="16"
        borderTopRightRadius="16"
        backgroundColor="white"
        verticalAlignment="top"
        height="600"
        width="100%"
        @loaded="loadBottomSheet"
      > -->
      <Frame
        id="bottomSheet"
        ref="bottomSheet"
        borderTopLeftRadius="16"
        borderTopRightRadius="16"
        backgroundColor="white"
        verticalAlignment="top"
        androidElevation="16"
        @loaded="loadBottomSheet"
        @tap="preventBubbling"
      >
        <StackLayout>
          <keep-alive>
          <NewLocation
            v-if="isVisibleNewLocationMenu"
            class="newMarker m-16"
            backgroundColor="white"
            @enabled-fab="isEnabledFAB"
          />
          </keep-alive>
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
  </Page>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue'

  /***** MAP *****/
  import MapComponent from './MapComponent.vue'
  import { mapToken } from '@/setup/map'
  import { setCenter } from '@/api/map'
  import { getMap as map } from '@/store/mapStore'

  /***** USER MARKER *****/
  import { updateUserMarker } from '@/api/userMarker'
  import { getUserMarker as userMarker } from '@/store/userMarkerStore'

  /***** USER LOCATION *****/
  import {
            getInitialLocation as initialLocation,
            getCurrentUserLocation as userLocation,
          } from '@/store/userLocationStore'

  /***** LOCATIONS *****/
  import NewLocation from './NewLocation.vue'
  import { numberOfLocations } from '@/store/locationsStore'

  /***** SECURITY AREAS *****/
  // import NewArea from './NewArea.vue'
  // import securityArea from '@/store/securityAreaStore'
  // import {
  //           addSource,
  //           setSecurityArea,
  //           showSecurityArea,
  //           removeSecurityArea,
  //         } from '@/api/securityArea'

  // import { setStorage } from '@/api/storage'
  import { Color } from '@nativescript/core/color'
  import { Screen, Enums } from '@nativescript/core'
  // import { CubicBezierAnimationCurve } from  '@nativescript/core/ui/animation'

  import { Location, BasicPolygonOptions, LngLat } from '@/types/types'

  import { getVisibility, setVisibility } from '@/composables/useComponent'

  export default Vue.extend({
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
        screenWidth: Screen.mainScreen.widthDIPs,
        radius: 1,
        fillOpacity: 5,
        activeUser: null,
        backgroundFilter: false
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

      bottomSheetHeight() {
        return this.screenHeight - 600
      },

      // getRadius: {
      //   get: function() { return this.radius },
      //   set: function (value: number) {
      //     this.radius = value
      //   }
      // },

      // getFillOpacity: {
      //   get: function () {return this.fillOpacity},
      //   set: function (value: number) {
      //     this.fillOpacity = value
      //   }
      // }
    },

    watch: {
      isVisible: function(newValue) {
        this.showSecurityArea('user', newValue)
      },

      isVisibleNewLocationMenu(newValue){
        console.log(`isVisibleNewLocationMenu?: ${newValue}`)
        newValue === true ? this.showBottomSheet() : this.hideBottomSheet()
      },

      isNewAreaMenuShowing(newValue){
        newValue === true ? this.showBottomSheet() : this.hideBottomSheet()
      }
    },

    methods: {
      preventBubbling(){
        console.log('onTap')
        return
      },

      /***** MAP *****/
      async onMapReady() {
        console.log('onMapReady()')
        this.setOnMapLongClickAction()
        await setCenter().then(() => {
          if (!numberOfLocations()) this.$emit('first-location-alert')
        })
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
        console.log('showBottomSheet()')
        this.backgroundFilter = true
        this.animationBottomSheet(600)
        // this.$showModal(NewLocation)
      },
      async hideBottomSheet() {
        console.log('hideBottomSheet()')
         await this.animationBottomSheet(0)
         this.backgroundFilter = false
      },
      animationBottomSheet(height: number) {
        this.bottomSheet.animate({
          duration: 1000,
          translate: { x: 0, y: this.screenHeight - height },
          // curve: new CubicBezierAnimationCurve(.44, .63, 0, 1)
          curve: Enums.AnimationCurve.cubicBezier(.44, .63, 0, 1)
        })
      },

      // /***** SECURITY AREA ******/

      // newSecurityArea(id: string, color: any) {
      //   if (securityArea.getSecurityArea(id)) {
      //     console.log(`${id} exist, choose another name`)
      //     return
      //   }
      //   const polygonOptions: BasicPolygonOptions = {
      //     id: id,
      //     radius: this.radius,
      //     fillColor: new Color(color),
      //     fillOpacity: this.fillOpacity / 10,
      //     isVisible: true
      //   }
      //   setSecurityArea(polygonOptions)
      // },

      // showSecurityArea(id: string, value:boolean) {
      //   showSecurityArea(id, value)
      // },

      // removeSecurityArea(id: string) {
      //   console.log(`remove polygon: ${id}`)
      //   removeSecurityArea(id)
      // }
    }
  })
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.backgroundFilter {
  // background-color: red
  background-color: rgba(255, 255, 255, .5)
}

.newMarker {
  color: $primary-dark;
}
</style>
