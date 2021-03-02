<template>
  <GridLayout>
    <MapWrapper height="100%" row="0" @first-location-alert="onFirstLocationAlert" />
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
            <component v-bind:is="bottomSheetContent" class="m-16"></component>
          </keep-alive>
        </StackLayout>
      </Page>
    </Frame>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { VueBottomSheetOptions } from '@nativescript-community/ui-material-bottomsheet/vue'
import { NativeScriptVue } from 'nativescript-vue'

import { ConfirmOptions } from '@nativescript/core'
import { confirmFirstLocation } from '@/components/Dialogs/ConfirmFirstLocation'

import { getVisibility } from '@/composables/useComponent'
import { Screen, Enums } from '@nativescript/core'

import MapWrapper from '@/components/Map/MapWrapper.vue'
import NewLocationMenu from '@/components/Map/NewLocationMenu.vue'
import NewSecurityAreaMenu from '@/components/Map/NewSecurityAreaMenu.vue'

export default Vue.extend({
  name: 'Map',

  components: {
    MapWrapper,
    NewLocationMenu,
    NewSecurityAreaMenu,
  },

  props: {
    isVisible: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      screenHeight: Screen.mainScreen.heightDIPs,
      screenWidth: Screen.mainScreen.widthDIPs,
      backgroundFilter: false,
      bottomSheetContent: null,
    }
  },

  computed: {
    isVisibleNewLocationMenu(): boolean {
      console.log(
        `MapWrapper::computed:isVisibleNewLocationMenu() ${getVisibility('newLocationMenu')}`,
      )
      return getVisibility('newLocationMenu')
    },

    isVisibleNewSecurityAreaMenu(): boolean {
      console.log(
        `MapWrapper::computed:isVisibleNewSecurityAreaMenu() ${getVisibility(
          'newSecurityAreaMenu',
        )}`,
      )
      return getVisibility('newSecurityAreaMenu')
    },

    bottomSheet() {
      return this.$refs.bottomSheet.nativeView
    },
  },

  watch: {
    // isVisibleNewLocationMenu(newValue: boolean, oldValue: boolean) {
    //   console.log(`MapWrapper::watch:isVisibleNewLocationMenu(): ${newValue}`)
    //   newValue ? this.loadBottomSheet(NewLocationMenu) : this.$closeBottomSheet()
    // },

    // isVisibleNewSecurityAreaMenu(newValue: boolean, oldValue: boolean) {
    //   console.log(`MapWrapper::watch:isVisibleNewSecurityAreaMenu(): ${newValue}`)
    //   if (newValue) {
    //     newValue ? this.loadBottomSheet(NewSecurityAreaMenu) : this.$closeBottomSheet()
    //   }
    // },
    isVisibleNewLocationMenu(newValue: boolean, oldValue: boolean) {
      console.log(`MapWrapper::watch:isVisibleNewLocationMenu(): ${newValue}`)
      if (newValue) {
        this.bottomSheetContent = NewLocationMenu
        this.showBottomSheet()
      } else {
        this.hideBottomSheet()
      }
    },

    isVisibleNewSecurityAreaMenu(newValue: boolean, oldValue: boolean) {
      console.log(`MapWrapper::watch:isVisibleNewSecurityAreaMenu(): ${newValue}`)
      if (newValue) {
        this.bottomSheetContent = NewSecurityAreaMenu
        this.showBottomSheet()
      } else {
        this.hideBottomSheet()
      }
    },
  },

  methods: {
    preventBubbling() {
      console.log('onTap')
      return
    },

    onFirstLocationAlert(): void {
      const options = this.setFirstLocationAlertOptions()
      confirmFirstLocation(options)
    },

    setFirstLocationAlertOptions(): ConfirmOptions {
      const options: ConfirmOptions = {
        title: `${this.$t('lang.dialogs.firstLocation.title')}`,
        message: `${this.$t('lang.dialogs.firstLocation.message')}`,
        okButtonText: `${this.$t('lang.dialogs.firstLocation.okButton')}`,
        cancelButtonText: `${this.$t('lang.dialogs.firstLocation.cancelButton')}`,
      }
      return options
    },

    /***** BOTTOM SHEET *****/
    loadBottomSheet() {
      console.log('loadBottomSheet()')
      this.bottomSheet.translateY = this.screenHeight
    },

    // loadBottomSheet(component: any) {
    //   // ;(this as NativeScriptVue).$showBottomSheet(component, { animated: true })
    //   const options: VueBottomSheetOptions = {
    //     animated: true,
    //     // dismissOnBackgroundTap: true,
    //     // dismissOnDraggingDownSheet: true,
    //     closeCallback: () => console.log('bottom sheet closed!'),
    //     // transparent: false,
    //     // ignoreTopSafeArea: true,
    //     // ignoreBottomSafeArea: true,
    //     // disableDimBackground: true,
    //   }

    //   this.$showBottomSheet(component, options)
    // },

    showBottomSheet() {
      console.log('showBottomSheet()')
      this.backgroundFilter = true
      this.animationBottomSheet(800)
    },

    hideBottomSheet() {
      console.log('hideBottomSheet()')
      this.animationBottomSheet(0)
      this.backgroundFilter = false
    },

    animationBottomSheet(height: number) {
      this.bottomSheet.animate({
        duration: 1000,
        translate: { x: 0, y: this.screenHeight - height },
        curve: Enums.AnimationCurve.cubicBezier(0.44, 0.63, 0, 1),
      })
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.backgroundFilter {
  // background-color: red
  background-color: rgba(255, 255, 255, 0.5);
}

.newMarker {
  color: $primary-dark;
}
</style>
