<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
    <GridLayout class="Configuration" rows="auto, *">
      <CommonActionBar
        row="0"
        :title="$t('lang.views.Configuration.title')"
        @on-tap="onBackNavigation"
      />
      <Label row="1" text="Configuration Page" fontSize="24" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import CommonActionBar from '@/components/UI/CommonActionBar.vue'
import Main from '@/views/Main/Main.vue'

export default Vue.extend({
  name: 'Configuration',

  components: {
    CommonActionBar,
    Main,
  },

  data() {
    return {
      Main: Main,
    }
  },

  methods: {
    onBackNavigation() {
      console.log('Locations::onBackNavigation()')
      this.$navigateTo(this.Main, { ClearHistory: true })
    },
  },
})
</script>
