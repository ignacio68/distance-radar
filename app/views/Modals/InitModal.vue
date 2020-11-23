<template>
  <Frame>
    <Page
      actionBarHidden="true"
      backgroundSpanUnderStatusBar="true"
      androidStatusBarBackground="#00251e"
    >
      <StackLayout
        id="initModal"
      >
        <ActivityIndicator
          width="100"
          height="100"
          color="red"
          busy="isBusy"
        />
      </StackLayout>
    </Page>
  </Frame>
</template>

<script lang="ts">
  export default {
    name: "InitModal",
    mounted() {
      console.log('InitModal mounted()')
    },
    created() {
      console.log('InitModal created()')
    },
    methods:{
      isBusy() {
        console.log(`Activity Indicator is busy`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../app-variables';

  #initModal {
    background-color:white;
    width: 100%;
    height: 100%;
  }
  // #initModal {
  //   background-color:$primary;
  //   opacity: 10%;
  //   width: 100%;
  //   height: 100%;
  // }
</style>