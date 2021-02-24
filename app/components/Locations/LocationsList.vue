<template>
  <StackLayout
    orientation="vertical"
    :width="width"
    :height="listHeight"
    :androidElevation="listElevation"
  >
    <ListView for="location in locations">
      <v-template>
        <Label :height="labelHeight" :text="location.id" @tap="onItemTap(location)" />
      </v-template>
    </ListView>
  </StackLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'
import LocationCard from '@/components/Locations/LocationCard.vue'

import { setVisibility, getVisibility } from '@/composables/useComponent'

import { flyTo } from '@/api/map'

import { getAllLocations } from '@/store/locationsStore'

import { LatLng, Location } from '@/types/commons'
import { Elevation } from '@/types/enums/elevations'

export default Vue.extend({
  name: 'LocationsAdjust',

  props: {
    width: {
      type: [String, Number],
      default: 100,
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
      return items <= 3 ? this.labelHeight * items : this.labelHeight * 3
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
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

Label {
  font-size: $font-sz-m;
}
</style>
