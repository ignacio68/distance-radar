<template>
  <Frame>
    <Page actionBarHidden="true">
      <Home/>
    </Page>
  </Frame>
</template>

<script lang="ts">
import Vue from 'vue'

import { Application as application } from '@nativescript/core'
import { onBackEvent, clearBackEvent } from '@/utils/backButton'

import Main from '@/views/Main/Main.vue'

export default Vue.extend({
  name: "MainContent",
  components: { Home: Main },
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