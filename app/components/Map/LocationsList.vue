<template>
  <StackLayout
    orientation="vertical"
    horizontalAlignment="left"
    :width="width"
    :height="listHeight"
    :androidElevation="listElevation"
  >
    <StackLayout v-if="locations.length >= 2">
      <Label
        class="font-weight-bold p-l-8"
        :text="$t('lang.components.locationsList.allLocations')"
        @tap="onAllLocationsTap"
      />
      <StackLayout class="hr m-x-8"></StackLayout>
    </StackLayout>
    <ListView for="location in locations">
      <v-template>
        <Label class="p-l-8" :height="labelHeight" :text="location.id" @tap="onItemTap(location)" />
      </v-template>
    </ListView>
  </StackLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

import { setVisibility, getVisibility } from '@/composables/useComponent'

import { flyTo, setViewport } from '@/api/map'

import { getAllLocations } from '@/store/locationsStore'

import { LatLng, Location, Elevation } from '@/types'

export default Vue.extend({
  name: 'LocationsList',

  props: {
    width: {
      type: [String, Number],
      default: 200,
    },
    labelHeight: {
      type: [String, Number],
      default: 48,
    },
  },

  data() {
    return {
      listElevation: Elevation.MENU,
    }
  },

  computed: {
    isVisibleLocationsList(): boolean {
      console.log(
        `LocationsList::computed:isVisibleLocationsList() ${getVisibility('locationsList')}`,
      )
      return getVisibility('locationsList')
    },

    locations(): Location[] {
      return getAllLocations()
    },

    listHeight(): number {
      const items: number = this.locations.length
      return items <= 3 ? this.labelHeight * (items + 1) : this.labelHeight * 4
    },
  },

  methods: {
    hideLocationsListMenu(): void {
      console.log('LocationsListMenu::hideNewLocationMenu()')
      setVisibility('locationsList', false)
    },

    onItemTap(args: Location): void {
      const coordinates: LatLng = {
        lat: args.lat,
        lng: args.lng,
      }
      flyTo(coordinates)
      this.hideLocationsListMenu()
    },

    onAllLocationsTap(): void {
      console.log('LocationsListMenu::onAllLocationsTap()')
      setViewport()
      this.hideLocationsListMenu()
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

Label {
  font-size: $font-sz-m;
}
</style>
