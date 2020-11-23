<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
    <StackLayout
      class="modal"
      width="100%"
      height="100%"
    />
  </Page>
</template>

<script lang="ts">
//   import { setGeolocationServicesEnabled } from '@/api/geolocation'
//   import { getIsEnabled as isGeolocationServicesEnabled } from '@/composables/useGeolocation'
//   import Home from '@/views/Home.vue'

//   export default {
//     name: "Modal",
//     computed: {
//       isGeolocationServicesEnabled
//     },
//     watch: {
//       isGeolocationServicesEnabled(newValue: boolean) {
//         console.log(`Modal: ${this.isGeolocationServicesEnabled}`)
//         // TODO: Add error handler
//         newValue ? this.$navigateTo(Home) : console.log('An error ocurred')
//       }
//     },
//     mounted() {
//       setGeolocationServicesEnabled()
//       console.log(`isGeolocationServicesEnabled? ${JSON.stringify(this.isGeolocationServicesEnabled)}` )
//     }
// }
</script>

<style scoped lang="scss">
@import '../../app-variables';

.modal {
  background-color: $primary;
}
</style>
