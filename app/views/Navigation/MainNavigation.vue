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

import '@/plugins/installRadSideDrawer'

import MainContent from './MainContent.vue'
import DrawerContent from './DrawerContent.vue'

export default Vue.extend({
  name: 'MainNavigation',
  components: {
    DrawerContent,
    MainContent
  }
})
</script>