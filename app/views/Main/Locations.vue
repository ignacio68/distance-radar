<template>
  <GridLayout class="Locations" rows="auto, *">
    <Label row="0" class="Locations-title m-x-16 p-t-8" :text="$t('lang.views.Locations.title')" />
    <StackLayout row="1" class="m-x-16 p-t-16">
      <Label
        v-if="locations.length === 0"
        class="Locations-empty m-x-16 m-t-32"
        :text="$t('lang.views.Locations.noLocation')"
      />
      <GridLayout v-else rows="*, auto">
        <!-- <ScrollView row="0" class="Locations-list m-x-16"> -->
        <ListView row="0" for="location in locations" @itemTap="onItemTap" class="Location-list">
          <v-template>
            <LocationCard
              :item="location"
              class="Locations-list_item m-y-4"
              :coordinatesTitle="$t('lang.components.locationCard.coordinatesTitle')"
              @on-tap="onConfirmDeleteLocation(location.id)"
            />
          </v-template>
        </ListView>
        <MDButton
          row="1"
          class="Locations-accept-button m-t-32 pull-right"
          width="144"
          @tap="onButtonTap"
          :text="$t('lang.views.Locations.acceptButton')"
        />
      </GridLayout>
    </StackLayout>
  </GridLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

import { confirmDeleteLocation } from '@/components/Dialogs/ConfirmDeleteLocation'
import { ConfirmOptions } from '@nativescript/core'

import { getAllLocations } from '@/store/locationsStore'

import { Location } from '@/api/types'

import Main from '@/views/Main/Main.vue'
import CommonActionBar from '@/components/UI/CommonActionBar.vue'
import LocationCard from '@/components/Locations/LocationCard.vue'

export default Vue.extend({
  name: 'Locations',

  components: {
    LocationCard,
    CommonActionBar,
    Main,
  },

  data() {
    return {
      Main: Main,
    }
  },

  computed: {
    locations(): Location[] {
      return getAllLocations()
    },
  },

  methods: {
    onConfirmDeleteLocation(id: string): void {
      const options: ConfirmOptions = {
        // title: `${this.$t('lang.dialogs.deleteLocation.title')}`,
        title: id,
        message: `${this.$t('lang.dialogs.deleteLocation.message')}`,
        okButtonText: `${this.$t('lang.dialogs.deleteLocation.okButton')}`,
        cancelButtonText: `${this.$t('lang.dialogs.deleteLocation.cancelButton')}`,
      }
      confirmDeleteLocation(options, id)
    },

    onButtonTap() {
      console.log('Locations::onButtonTap()')
      // this.$navigateTo(this.Main, { ClearHistory: true })
    },

    onItemTap() {
      console.log('Locations::onItemTap()')
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';
.Locations-title {
  font: {
    size: $font-sz-xl;
    weight: 700;
  }
  color: $primary-dark;
}

.Locations-empty {
  font-size: $font-sz-l;
  color: $primary-dark;
}

.Locations-list_item {
  background-color: $surface-light;
}
</style>
