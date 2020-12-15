<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
    <RadSideDrawer
      ref="drawer"
      @drawerClosed="onDrawerClosed"
    >
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
import { getVisibility, setVisibility } from '@/composables/useComponent'
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

  computed: {
    isVisibleDrawer(): boolean {
        return getVisibility('drawer')
      },
  },

  watch: {
    isVisibleDrawer(newVal) {
      newVal ? this.$refs.drawer.showDrawer() : this.$refs.drawer.closeDrawer()
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

      onDrawerClosed() {
        setVisibility('drawer', false)
      }
  }
})
</script>