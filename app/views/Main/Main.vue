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
      />
      <MapWrapper
        id="MapWrapper"
        row="1"
        @first-location-alert="onFirstLocationAlert"
      />

      <!-- <StackLayout
        class="Bottom"
        row="2"
      > -->
        <!-- <Label textWrap="true">
          <FormattedString>
            <Span text="latitude: "/>
            <Span :text="getCurrentUserLocation.lat"/>
          </FormattedString>
        </Label>
        <Label textWrap="true">
          <FormattedString>
            <Span text="longitude: "/>
            <Span :text="getCurrentUserLocation.lng"/>
          </FormattedString>
        </Label>
        <Label textWrap="true">
          <FormattedString>
            <Span text="distance from location1: "/>
            <Span :text="getDistanceToCenter"/>
          </FormattedString>
        </Label> -->
        <!-- <Label textWrap="true">
          <FormattedString>
            <Span text="distance from location2: "/>
            <Span :text="getDistanceToCenter"/>
          </FormattedString>
        </Label> -->
        <!-- <StackLayout orientation="horizontal">
          <Button text="START" @tap="onStart" />
          <Button text="STOP" @tap="onStop" />
        </StackLayout>
      </StackLayout> -->

      <BottomAppBar
        class="BottomBar"
        row="2"
      />
    </GridLayout>
    </Page>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue'

  import { FirstLocationAlert } from '@/components/UI/types'
  import { LngLat } from '@/types/types'

  import { getVisibility } from '@/composables/useComponent'
  import { getViewName, setViewName } from  '@/composables/useNavigation'

  import { getSecurityAreaActive, getAllSecurityAreas} from '@/store/securityAreasStore'
  import { getCurrentUserLocation, getDistanceToCenter, getWatchId as watchId } from '@/store/userLocationStore'
  import { getIsWatchUserLocationEnabled as isWatchUserLocationEnabled , setIsWatchUserLocationEnabled } from '@/composables/useGeolocation'
  import { startTrackingUserLocation, stopTrackingUserLocation, isUserInSecurityArea } from '@/api/geolocation'

  import { firstLocationAlert } from '@/components/UI/FirstLocationAlert'
  import CustomActionBar from '@/components/UI/CustomActionBar.vue'
  import MapWrapper from '@/components/Map/MapWrapper.vue'
  import BottomAppBar from '@/components/UI/BottomAppBar.vue'

  export default Vue.extend({
    name: 'Main',

    components: {
      CustomActionBar,
      MapWrapper,
      BottomAppBar,
    },

    data() {
      return {
        latitude: getCurrentUserLocation().lat,
        longitude: getCurrentUserLocation().lng,
        distance: getDistanceToCenter(),
      }
    },

    computed: {
      isWatchUserLocationEnabled(): boolean {
        return isWatchUserLocationEnabled()
      },
      fetchUserLocation(): LngLat {
        return getCurrentUserLocation()
      },
      getCurrentUserLocation,
      getDistanceToCenter,
      getAllSecurityAreas,
    },

    watch: {
      isWatchUserLocationEnabled(newValue: boolean, oldValue: boolean) {
        // newValue ? this.distance = getDistanceToCenter() : console.log('Watcher is off!!')
        newValue ? this.isUserInSecurityArea(1000) : console.log('Watcher is off!!')
      },

       getAllSecurityAreas(newValue: any, oldValue: any) {
        console.log('------ THE SECURITY AREAS STORE HAS CHANGED!! -----')
      },

      // fetchUserLocation(newValue: LngLat, oldValue: LngLat) {
      //   if(newValue !== oldValue) {
      //     console.log(`Home::fetchUserLocation(): ${JSON.stringify(getCurrentUserLocation())}`)
      //   }
      // }
    },

    mounted() {
      setViewName('Main')
    },

    methods: {
      onFirstLocationAlert() {
        const firstLocationOptions: FirstLocationAlert  = {
          title: `${this.$t('lang.components.firstLocationAlert.title')}`,
          message: `${this.$t('lang.components.firstLocationAlert.message')}`,
          okButtonText: `${this.$t('lang.components.firstLocationAlert.okButton')}`,
          cancelButtonText: `${this.$t('lang.components.firstLocationAlert.cancelButton')}`
        }
        firstLocationAlert(firstLocationOptions)
      },

      getSecurityAreaProps() {
        const securityArea = getSecurityAreaActive()
        console.log(`Home.vue::getSecurityAreaProps():securityArea:center: ${JSON.stringify(securityArea.center)}`)
        const securityAreaProps = {
          initialLocation: securityArea.center,
          securityDistance: securityArea.radius,
          mode: 'OUT'
        }
        return securityAreaProps
      },

      isUserInSecurityArea(interval: number) {
        const securityAreaProps = this.getSecurityAreaProps()
        const securityDistanceProps = { ...securityAreaProps, interval }
        isUserInSecurityArea(securityDistanceProps)
      },

      onStart() {
        isWatchUserLocationEnabled() ? console.log('The tracking is activated yet!!') : startTrackingUserLocation()
      },

      onStop() {
        isWatchUserLocationEnabled() ? stopTrackingUserLocation(watchId()) : console.log('There is not tracking activated!!')
      }
    }
  }
)
</script>
<style lang="scss" scoped>
@import '../../app-variables';
.Bottom {
  font-size: $font-sz-l;
}
</style>
