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
        <StackLayout>
          <Label textWrap="true">
            <FormattedString>
              <Span text="user latitude: " />
              <Span :text="getUserCurrentLocation.lat" />
            </FormattedString>
          </Label>
          <Label textWrap="true">
            <FormattedString>
              <Span text="user longitude: " />
              <Span :text="getUserCurrentLocation.lng" />
            </FormattedString>
          </Label>
          <Label textWrap="true">
            <FormattedString>
              <Span text="distance from location1: " />
              <Span :text="getDistanceToCenter" />
            </FormattedString>
          </Label>
        </StackLayout>
        <!-- <StackLayout orientation="horizontal">
          <Button text="VIB ON" @tap="onPlayVibration" />
          <Button text="VIB OFF" @tap="onStopVibration" />
          <Button text="MUSIC ON" @tap="onPlaySound" />
          <Button text="MUSIC OFF" @tap="onStopSound" />
        </StackLayout> -->
      </StackLayout>

      <!-- <BottomAppBar class="BottomBar" row="2" /> -->
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { ConfirmOptions } from '@nativescript/core'

import { activateAlarms } from '@/api/securityAreas'

import { getAllAlarms } from '@/store/alarmsStore'
import { getUserCurrentLocation, getDistanceToCenter } from '@/store/userLocationStore'

import { SecurityArea } from '@/api/types'

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
      distance: getDistanceToCenter(),
    }
  },

  computed: {
    getUserCurrentLocation,
    getDistanceToCenter,
    getAllAlarms,
  },

  watch: {
    getAllAlarms(newValue: string[], oldValue: string[]) {
      if (newValue) this.activateAlarms(newValue)
      return
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

    activateAlarms(alarms: string[]): void {
      console.log(`Main.vue::activateAlarms:alarms ${JSON.stringify(alarms)}`)
      activateAlarms(alarms)
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
