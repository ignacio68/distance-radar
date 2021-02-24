<template>
  <RadSideDrawer
    ref="drawer"
    drawerLocation="left"
    gesturesEnabled="true"
    :drawerTransition="transition"
    @drawerClosed="onDrawerClosed"
  >
    <StackLayout ~drawerContent backgroundColor="#ffffff">
      <slot name="drawerContent" />
    </StackLayout>
    <Frame ~mainContent ref="drawerMainContent">
      <slot name="mainContent" />
    </Frame>
  </RadSideDrawer>
</template>

<script lang="ts">
import Vue from 'vue'

import { Application as application } from '@nativescript/core'
import { onBackEvent, clearBackEvent } from '@/utils/backButton'

import { SlideInOnTopTransition } from 'nativescript-ui-sidedrawer'

import { getVisibility, setVisibility } from '@/composables/useComponent'

export default Vue.extend({
  name: 'MainNavigation',

  data() {
    return {
      transition: new SlideInOnTopTransition(),
    }
  },

  computed: {
    isVisibleDrawer(): boolean {
      console.log(`MainNavigation::computed:isVisibleDrawer() ${getVisibility('drawer')}`)
      return getVisibility('drawer')
    },

    // drawer(): any {
    //   return this.$refs.drawer.nativeView
    // }
  },

  watch: {
    isVisibleDrawer(newVal: boolean, oldVal: boolean) {
      newVal
        ? this.$refs.drawer.nativeView.showDrawer()
        : this.$refs.drawer.nativeView.closeDrawer()
    },
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
      application.android.foregroundActivity.finish()
    },

    onDrawerClosed() {
      setVisibility('drawer', false)
    },
  },
})
</script>
