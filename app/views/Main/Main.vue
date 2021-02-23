<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
    <GridLayout rows="auto, *" columns="">
      <MainActionBar row="0" class="action-bar" width="100%" />

      <MDBottomNavigation
        row="1"
        ref="bottomNavigation"
        selectedIndex="0"
        unloadOnTabChange="false"
        @tabSelected="onTabSelected"
      >
        <MDTabStrip>
          <MDTabStripItem>
            <Label :text="$t('lang.views.Main.bottomTabbar.map')" />
            <Image class="botton-navigation-tab_icon" src="res://ic_public_white_24dp" />
          </MDTabStripItem>

          <MDTabStripItem>
            <Label :text="$t('lang.views.Main.bottomTabbar.locations')" />
            <Image class="botton-navigation-tab_icon" src="res://ic_place_white_24dp" />
          </MDTabStripItem>

          <MDTabStripItem>
            <Label :text="$t('lang.views.Main.bottomTabbar.securityAreas')" />
            <Image class="botton-navigation-tab_icon" src="res://ic_blur_circular_white_24dp" />
          </MDTabStripItem>
        </MDTabStrip>

        <MDTabContentItem>
          <MapWrapper />
        </MDTabContentItem>

        <MDTabContentItem>
          <Locations />
        </MDTabContentItem>

        <MDTabContentItem>
          <SecurityAreas />
        </MDTabContentItem>
      </MDBottomNavigation>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import '@/plugins/installMDBottomNavigation'

import { activateAlarms } from '@/api/securityAreas'

import { resetBottomSheet } from '@/composables/useComponent'

import { getAllLocations } from '@/store/locationsStore'
import { getAllSecurityAreas, getSecurityAreasActive } from '@/store/securityAreasStore'
// import { getAllAlarms } from '@/store/alarmsStore'
import { getUserCurrentLocation, getDistanceToCenter } from '@/store/userLocationStore'

import MapWrapper from './MapWrapper.vue'
import Locations from './Locations.vue'
import SecurityAreas from './SecurityAreas.vue'
import MainActionBar from '@/components/UI/MainActionBar.vue'

export default Vue.extend({
  name: 'Main',

  components: {
    MainActionBar,
    MapWrapper,
    Locations,
    SecurityAreas,
  },

  data() {
    return {
      // distance: getDistanceToCenter(),
    }
  },

  computed: {
    bottomNavigation() {
      return this.$refs.bottomNavigation.nativeView
    },
    locations(): number | undefined {
      return getAllLocations().length
    },
    securityAreas(): number | undefined {
      return getAllSecurityAreas().length
    },
    getSecurityAreasActive,
    // getAllAlarms,
    // getUserCurrentLocation,
    // getDistanceToCenter,
  },

  watch: {
    getLocations(newValue: unknown, oldValue: unknown) {
      if (newValue !== undefined) this.bottomNavigation.showBadge(1, newValue)
      return
    },
    getAllSecurityAreas(newValue: unknown, oldValue: unknown) {
      if (newValue !== undefined) this.bottomNavigation.showBadge(2, newValue)
      return
    },
    getSecurityAreasActive(newValue: string[], oldValue: string[]) {
      if (newValue.length !== undefined) this.activateAlarms(newValue)
      return
    },
  },

  mounted() {
    console.log('__Main::mounted()')
  },

  beforeUpdate() {
    console.log('__Main::beforeUpdate()')
  },

  updated() {
    console.log('__Main::updated()')
  },

  beforeDestroy() {
    console.log('__Main::beforeDestroy()')
  },

  destroyed() {
    console.log('__Main::beforeDestroy()')
  },

  methods: {
    activateAlarms(alarms: string[]): void {
      console.log(`Main.vue::activateAlarms:alarms ${JSON.stringify(alarms)}`)
      activateAlarms(alarms)
    },

    onTabSelected() {
      if (this.bottomNavigation.selectedTabIndex !== 0) resetBottomSheet()
      return
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

TabStripItem {
  background-color: $primary-variant;
  & Label {
    color: $onPrimary;
  }
  &:active Label {
    color: $primary-bright;
  }
}
</style>

<!-- <GridLayout class="home" rows="auto, *, auto" columns="*">
      <MainActionBar class="action-bar" row="0" width="100%" />
      <MapWrapper
        id="MapWrapper"
        row="1"
        @first-location-alert="onConfirmFirstLocation"
      /> -->

<!-- <StackLayout class="Bottom" row="2"> -->
<!-- <StackLayout>
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
        </StackLayout> -->
<!-- <StackLayout orientation="horizontal">
          <Button text="VIB ON" @tap="onPlayVibration" />
          <Button text="VIB OFF" @tap="onStopVibration" />
          <Button text="MUSIC ON" @tap="onPlaySound" />
          <Button text="MUSIC OFF" @tap="onStopSound" />
        </StackLayout> -->
<!-- </StackLayout> -->

<!-- </GridLayout> -->
