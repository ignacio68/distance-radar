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
          <Map />
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

import { resetBottomSheet } from '@/composables/useComponent'

import { getAllLocations } from '@/store/locationsStore'
import { getAllSecurityAreas } from '@/store/securityAreasStore'

import Map from './Map.vue'
import Locations from './Locations.vue'
import SecurityAreas from './SecurityAreas.vue'
import MainActionBar from '@/components/UI/MainActionBar.vue'

export default Vue.extend({
  name: 'Main',

  components: {
    MainActionBar,
    Map,
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
  },

  watch: {
    // FIXME: Not works
    getLocations(newValue: unknown, oldValue: unknown) {
      if (newValue !== undefined || newValue !== null) this.bottomNavigation.showBadge(1, newValue)
      return
    },
    // FIXME: Not works
    getAllSecurityAreas(newValue: unknown, oldValue: unknown) {
      if (newValue !== undefined || newValue !== null) this.bottomNavigation.showBadge(2, newValue)
      return
    },
  },

  mounted() {},

  methods: {
    onTabSelected() {
      if (this.bottomNavigation.selectedTabIndex !== 0) resetBottomSheet()
      return
    },
  },
})
</script>
