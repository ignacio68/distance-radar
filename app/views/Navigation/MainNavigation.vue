<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
    <RadSideDrawer ref="drawer">
      <DrawerContent ~drawerContent />
      <MainContent
        ~mainContent
      />
      <!-- <MainContent
        ~mainContent
        @on-tap-drawer-menu="$refs.drawer.nativeView.showDrawer()"
      /> -->
    </RadSideDrawer>
   </Page>
</template>

<script lang="ts">
import Vue from 'vue'

import { Application as application } from '@nativescript/core'
import { onBackEvent, clearBackEvent } from '@/utils/backButton'

import '@/plugins/installRadSideDrawer'

import MainContent from './MainContent.vue'
import DrawerContent from './DrawerContent.vue'

export default Vue.extend({
  name: 'MainNavigation',

  components: {
    DrawerContent,
    MainContent
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
  }
})
</script>