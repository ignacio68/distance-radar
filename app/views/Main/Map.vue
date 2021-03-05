<template>
  <StackLayout>
    <MapWrapper height="100%" width="100%" @first-location-alert="onFirstLocationAlert" />
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { VueBottomSheetOptions } from '@nativescript-community/ui-material-bottomsheet/vue'
import { NativeScriptVue } from 'nativescript-vue'

import { ConfirmOptions } from '@nativescript/core'
import { confirmFirstLocation } from '@/components/Dialogs/ConfirmFirstLocation'

import { getVisibility } from '@/composables/useComponent'

import MapWrapper from '@/components/Map/MapWrapper.vue'
import NewLocationMenu from '@/components/Map/NewLocationMenu.vue'
import NewSecurityAreaMenu from '@/components/Map/NewSecurityAreaMenu.vue'

export default Vue.extend({
  name: 'Map',

  components: {
    MapWrapper,
  },

  data() {
    return {}
  },

  computed: {
    isVisibleNewLocationMenu(): boolean {
      return getVisibility('newLocationMenu')
    },

    isVisibleNewSecurityAreaMenu(): boolean {
      return getVisibility('newSecurityAreaMenu')
    },
  },

  watch: {
    isVisibleNewLocationMenu(newValue: boolean, oldValue: boolean) {
      if (newValue) this.loadBottomSheet(NewLocationMenu)
      return
    },

    isVisibleNewSecurityAreaMenu(newValue: boolean, oldValue: boolean) {
      if (newValue) this.loadBottomSheet(NewSecurityAreaMenu)
      return
    },
  },

  methods: {
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

    loadBottomSheet(component: any) {
      const options = this.setBottomSheetOptions()
      ;(this as NativeScriptVue).$showBottomSheet(component, options)

      // this.$showBottomSheet(component, options)
    },

    setBottomSheetOptions(): VueBottomSheetOptions {
      const options: VueBottomSheetOptions = {
        animated: true,
        dismissOnBackgroundTap: false,
        dismissOnDraggingDownSheet: false,
        closeCallback: () => console.log('bottom sheet closed!'),
        transparent: true,
        disableDimBackground: false,
      }
      return options
    },
  },
})
</script>
