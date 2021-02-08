<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
    <GridLayout class="home" rows="auto, *, auto" columns="*">
      <MainActionBar class="action-bar" row="0" width="100%" />
      <MapWrapper id="MapWrapper" row="1" @first-location-alert="onConfirmFirstLocation" />

      <StackLayout class="Bottom" row="2">
        <!-- <Label textWrap="true">
          <FormattedString>
            <Span text="latitude: " />
            <Span :text="getCurrentUserLocation.lat" />
          </FormattedString>
        </Label>
        <Label textWrap="true">
          <FormattedString>
            <Span text="longitude: " />
            <Span :text="getCurrentUserLocation.lng" />
          </FormattedString>
        </Label> -->
        <!-- <Label textWrap="true">
          <FormattedString>
            <Span text="distance from location1: " />
            <Span :text="getDistanceToCenter" />
          </FormattedString>
        </Label>
        <Label textWrap="true">
          <FormattedString>
            <Span text="distance from location2: " />
            <Span :text="getDistanceToCenter" />
          </FormattedString>
        </Label> -->
        <StackLayout orientation="horizontal">
          <Button text="VIB ON" @tap="onPlayVibration" />
          <Button text="VIB OFF" @tap="onStopVibration" />
          <Button text="MUSIC ON" @tap="onPlaySound" />
          <Button text="MUSIC OFF" @tap="onStopSound" />
        </StackLayout>
      </StackLayout>

      <!-- <BottomAppBar class="BottomBar" row="2" /> -->
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { playVibration, stopVibration, playSound } from '@/api/common'

import { ConfirmOptions } from '@nativescript/core'

import { getVisibility } from '@/composables/useComponent'

import { getSecurityAreaActive as isSecurityAreaActive } from '@/store/securityAreasStore'
import {
  getCurrentUserLocation,
  getDistanceToCenter,
  getWatchId as watchId,
} from '@/store/userLocationStore'
import {
  getIsWatchUserLocationEnabled as isWatchUserLocationEnabled,
  setIsWatchUserLocationEnabled,
} from '@/composables/useGeolocation'
import {
  startTrackingUserLocation,
  stopTrackingUserLocation,
  isUserIntoSecurityArea,
} from '@/api/geolocation'

import { LatLng } from '@/types/commons'
import { SecurityArea, CalculateSecurityDistance } from '@/api/types'

import { confirmFirstLocation } from '@/components/Dialogs/ConfirmFirstLocation'
import MainActionBar from '@/components/UI/MainActionBar.vue'
import MapWrapper from '@/components/Map/MapWrapper.vue'
import BottomAppBar from '@/components/UI/BottomAppBar.vue'

export default Vue.extend({
  name: 'Main',

  components: {
    MainActionBar,
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
    fetchUserLocation(): LatLng {
      return getCurrentUserLocation()
    },
    getCurrentUserLocation,
    getDistanceToCenter,
    isSecurityAreaActive,
  },

  watch: {
    isWatchUserLocationEnabled(newValue: boolean, oldValue: boolean) {
      // newValue ? this.distance = getDistanceToCenter() : console.log('Watcher is off!!')
      newValue ? this.isUserIntoSecurityArea(1000) : console.log('Watcher is off!!')
    },

    // fetchUserLocation(newValue: LatLng, oldValue: LatLng) {
    //   if(newValue !== oldValue) {
    //     console.log(`Home::fetchUserLocation(): ${JSON.stringify(getCurrentUserLocation())}`)
    //   }
    // }
    isSecurityAreaActive(newValue: SecurityArea, oldValue: SecurityArea) {
      newValue ? this.securityAreaActive(newValue.radius) : this.securityAreaDesactive()
    },
  },

  methods: {
    onConfirmFirstLocation(): void {
      const options: ConfirmOptions = {
        title: `${this.$t('lang.dialogs.firstLocation.title')}`,
        message: `${this.$t('lang.dialogs.firstLocation.message')}`,
        okButtonText: `${this.$t('lang.dialogs.firstLocation.okButton')}`,
        cancelButtonText: `${this.$t('lang.dialogs.firstLocation.cancelButton')}`,
      }
      confirmFirstLocation(options)
    },

    securityAreaActive(securityDistance: number): void {
      startTrackingUserLocation()
      const args: CalculateSecurityDistance = {
        initialLocation: getCurrentUserLocation(),
        securityDistance,
        interval: 1000,
      }
      isUserIntoSecurityArea(args)
    },

    securityAreaDesactive() {
      stopTrackingUserLocation(watchId())
    },

    getSecurityAreaProps(): Record<string, unknown> {
      const securityArea = isSecurityAreaActive()
      console.log(
        `Home.vue::getSecurityAreaProps():securityArea:center: ${JSON.stringify(
          securityArea.center,
        )}`,
      )
      const securityAreaProps = {
        initialLocation: securityArea.center,
        securityDistance: securityArea.radius,
        mode: 'OUT',
      }
      return securityAreaProps
    },

    isUserIntoSecurityArea(interval: number): void {
      const securityAreaProps = this.getSecurityAreaProps()
      const securityDistanceProps = { ...securityAreaProps, interval }
      isUserIntoSecurityArea(securityDistanceProps)
    },

    onPlayVibration(): void {
      playVibration([300, 500])
    },

    onStopVibration(): void {
      stopVibration()
    },

    onPlaySound(): void {
      playSound('PLAY')
    },

    onStopSound(): void {
      playSound('STOP')
    },

    onStart(): void {
      isWatchUserLocationEnabled()
        ? console.log('The tracking is activated yet!!')
        : startTrackingUserLocation()
    },

    onStop(): void {
      isWatchUserLocationEnabled()
        ? stopTrackingUserLocation(watchId())
        : console.log('There is not tracking activated!!')
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';
.Bottom {
  font-size: $font-sz-l;
}
</style>
