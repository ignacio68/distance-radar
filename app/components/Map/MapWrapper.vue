<template>
    <GridLayout>
      <MapComponent
        height="100%"
        row="0"
        @first-location-alert="$emit('first-location-alert')"
      />
      <StackLayout
        v-if="backgroundFilter"
        class="backgroundFilter"
        row="0"
        height="100%"
        width="100%"
      />
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
        <Page actionBarHidden="true">
          <StackLayout>
            <keep-alive>
              <component
                v-bind:is="bottomSheetContent"
                class="m-16"
              ></component>
            </keep-alive>
          </StackLayout>
        </Page>
      </Frame>
    </GridLayout>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue'

  import { getVisibility, setVisibility } from '@/composables/useComponent'
  import { Color, Screen, Enums } from '@nativescript/core'
  import { Location, BasicPolygonOptions, LngLat } from '@/types/types'

  import MapComponent from './MapComponent.vue'
  import NewLocation from './NewLocation.vue'
  import NewSecurityArea from './NewSecurityArea.vue'

  export default Vue.extend({
    name: 'Home',

    components: {
      MapComponent,
      NewLocation,
      NewSecurityArea
    },

    props:{
      isVisible: {
        type: Boolean,
        default: true
      },
    },

    data() {
      return {
        screenHeight: Screen.mainScreen.heightDIPs,
        screenWidth: Screen.mainScreen.widthDIPs,
        backgroundFilter: false,
        bottomSheetContent: NewLocation,
      }
    },

    computed: {

      isVisibleNewLocationMenu(): boolean {
        console.log(`MapWrapper::computed:isVisibleNewLocationMenu() ${getVisibility('newLocationMenu')}`)
        return getVisibility('newLocationMenu')
      },

      isVisibleNewSecurityAreaMenu(): boolean {
        console.log(`MapWrapper::computed:isVisibleNewSecurityAreaMenu() ${getVisibility('newSecurityAreaMenu')}`)
        return getVisibility('newSecurityAreaMenu')
      },

      bottomSheet() {
        return this.$refs.bottomSheet.nativeView
      },
    },

    watch: {
      // isVisible: function(newValue: boolean, oldValue: boolean) {
      //   this.showSecurityArea('user', newValue)
      // },

      isVisibleNewLocationMenu(newValue: boolean, oldValue: boolean) {
        console.log(`MapWrapper::watch:isVisibleNewLocationMenu(): ${newValue}`)
        if(newValue) {
          this.bottomSheetContent = NewLocation
          this.showBottomSheet()
        } else {
          this.hideBottomSheet()
        }
      },

      isVisibleNewSecurityAreaMenu(newValue: boolean, oldValue: boolean) {
        console.log(`MapWrapper::watch:isVisibleNewSecurityAreaMenu(): ${newValue}`)
        if(newValue) {
          this.bottomSheetContent = NewSecurityArea
          this.showBottomSheet()
        } else {
          this.hideBottomSheet()
        }
      }
    },

    methods: {
      preventBubbling() {
        console.log('onTap')
        return
      },

      /***** BOTTOM SHEET *****/
      loadBottomSheet() {
        console.log('loadBottomSheet()')
        this.bottomSheet.translateY = this.screenHeight
      },
      showBottomSheet() {
        console.log('showBottomSheet()')
        this.backgroundFilter = true
        this.animationBottomSheet(600)
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
          curve: Enums.AnimationCurve.cubicBezier(.44, .63, 0, 1)
        })
      },
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
