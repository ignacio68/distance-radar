<template>
  <Frame>
    <Page
      actionBarHidden="true"
    >
      <StackLayout
        id="BottomAppMenuModal"
        height="100%"
        width="100%"
      >
        <Label
          text="MODAL PAGE"
          @tap="onTap"
        />
        <Frame
          id="BottomSheet"
          ref="bottomSheet"
          borderTopLeftRadius="16"
          borderTopRightRadius="16"
          backgroundColor="white"
          verticalAlignment="top"
          @loaded="loadBottomSheet"
        >
          <StackLayout>
            <NewLocation
              v-if="isVisibleNewLocationMenu"
              class="newMarker m-16"
              backgroundColor="white"
              isPassThroughParentEnabled="false"
              @add-new-location="newLocation"
            />
            <!-- <NewArea
              v-if="isNewAreaMenuShowing"
              class="newArea m-16"
              backgroundColor="white"
              @enabled-fab="isEnabledFAB"
              @on-new-area-cancel="hideBottomSheet()"
              @on-new-area-done="newSecurityArea"
            /> -->
          </StackLayout>
        </Frame>
      </StackLayout>
    </Page>
  </Frame>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue'

  import { Screen, Enums } from '@nativescript/core'
  import { newLocation, removeLocation } from '@/api/locations'
  // import { numberOfLocations } from '@/store/locationsStore'
  import { getVisibility, setVisibility } from '@/composables/useComponent'
  import { Location } from '@/types/types'

  import NewLocation from '@/components/Map/NewLocation.vue'

  export default Vue.extend({
    name: "BottomAppMenuModal",

    components: {
      NewLocation,
    },

    data() {
      return {
        screenHeight: Screen.mainScreen.heightDIPs,
        screenWidth: Screen.mainScreen.widthDIPs,
      }
    },

    computed: {
      bottomSheet() {
        return this.$refs.bottomSheet.nativeView
      },
    },

    watch: {
    },

    created(){
      console.log('BottomAppMenuModal created()')
      // this.showBottomSheet()
    },

    methods:{
      onTap() {
        this.$modal.close()
        setVisibility('newLocationMenu', false)
      },
       /***** BOTTOM SHEET *****/
      loadBottomSheet() {
        this.bottomSheet.translateY = this.screenHeight
      },

      showBottomSheet() {
        console.log('showBottomSheet()')
        this.animationBottomSheet(600)
        // this.$showModal(NewLocation)
      },

      async hideBottomSheet() {
        await this.animationBottomSheet(0).then(() => this.$modal.close())
      },

      animationBottomSheet(height: number) {
        console.log('animationBottomSheet()')
        this.bottomSheet.animate({
          duration: 1000,
          translate: { x: 0, y: this.screenHeight - height },
          curve: Enums.AnimationCurve.cubicBezier(.44, .63, 0, 1)
        })
      },

      // /***** LOCATIONS ******/
      newLocation(values: Location) {
        console.log(`newLocation()`)
        // TODO: sustituir por el código de abajo
        newLocation(values)
        this.hideBottomSheet()
        // setStorage(marker.id, marker).then(success => {
        //   console.log(`setStorage? ${success}`)
        //   if(success){
        //     addMarker(this.map, marker)
        //   }
        // })
      },

      removeLocation(id: string) {
        removeLocation(id)
      },


    }
  })
</script>

<style lang="scss" scoped>
  @import '../../app-variables';

  #BottomAppMenuModal {
    background-color: rgba(0, 255, 0, .2);
    width: 100%;
    height: 100%;
    margin: {
      top: 56;
      bottom: 56;
    }
  }
</style>