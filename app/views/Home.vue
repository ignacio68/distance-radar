<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
    <GridLayout
      class="home"
      rows="auto, *"
      columns="*"
    >
      <CustomActionBar
        class="action-bar"
        row="0"
        width="100%"
        @tap-visibility="onTapVisibility"
      />
      <Map
        id="Map"
        row="1"
        @first-marker-alert="onFirstMarkerAlert"
      />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import { Application as application } from '@nativescript/core'

  import { onBackEvent, clearBackEvent } from '@/utils/backButton'

  import { FirstMarkerAlert } from '@/components/UI/types'

  import { firstMarkerAlert } from '@/components/UI/FirstMarkerAlert'
  import CustomActionBar from '@/components/UI/CustomActionBar.vue'
  import MapWrapper from '@/components/Map/MapWrapper.vue'

  export default({
    name: 'Home',

    components: {
      CustomActionBar,
      Map: MapWrapper
    },
    data() {
      return {
        // TODO: Refactoring
        isVisibleSecurityArea: false,
      }
    },

    computed: {
    },

    created() {
      onBackEvent(this.backEvent)
    },

    beforeDestroy() {
      clearBackEvent(this.backEvent)
    },

    methods: {
      backEvent() {
      console.log('Has presionado el botón de volver de Android!!')
      application.android.foregroundActivity.finish();
    },

      // TODO: Refactoring
      onTapVisibility(): void {
        console.log('onTapVisibility()')
        this.isVisibleSecurityArea = !this.isVisibleSecurityArea
      },

      onFirstMarkerAlert() {
        const firstMarkersOptions: FirstMarkerAlert = {
          message: `${this.$t('lang.components.firstMarkerAlert.message')}`,
          okButtonText: `${this.$t('lang.components.firstMarkerAlert.okButton')}`,
          cancelButtonText: `${this.$t('lang.components.firstMarkerAlert.cancelButton')}`
        }

        firstMarkerAlert(firstMarkersOptions)
      }
    }
  }
)
</script>
<style lang="scss" scoped>
// @import '../../app-variables';
</style>
