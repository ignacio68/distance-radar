<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
    <GridLayout
      class="home"
      rows="auto, *, 56"
      columns="*"
    >
      <CustomActionBar
        class="action-bar"
        row="0"
        width="100%"
        @tap-visibility="onTapVisibility"
      />
      <Frame
        id="Map"
        row="1"
      >
        <MapWrapper
          id="MapWrapper"
          @first-location-alert="onFirstLocationAlert"
        />
      </Frame>
      <BottomAppBar
        class="BottomBar"
        row="2"
      />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue'

  import { Application as application } from '@nativescript/core'

  import { onBackEvent, clearBackEvent } from '@/utils/backButton'

  import { FirstLocationAlert } from '@/components/UI/types'

  import { firstLocationAlert } from '@/components/UI/FirstLocationAlert'


  import CustomActionBar from '@/components/UI/CustomActionBar.vue'
  import MapWrapper from '@/components/Map/MapWrapper.vue'
  import BottomAppBar from '@/components/UI/BottomAppBar.vue'

  export default Vue.extend({
    name: 'Home',

    components: {
      CustomActionBar,
      MapWrapper,
      BottomAppBar,
    },

    data() {
      return {
        // TODO: Refactoring
        isVisibleSecurityArea: false,
      }
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

      onFirstLocationAlert() {
        const firstLocationOptions: FirstLocationAlert  = {
          title: `${this.$t('lang.components.firstLocationAlert.title')}`,
          message: `${this.$t('lang.components.firstLocationAlert.message')}`,
          okButtonText: `${this.$t('lang.components.firstLocationAlert.okButton')}`,
          cancelButtonText: `${this.$t('lang.components.firstLocationAlert.cancelButton')}`
        }
        firstLocationAlert(firstLocationOptions)
      }
    }
  }
)
</script>
<style lang="scss" scoped>
// @import '../../app-variables';
</style>
