<template>
  <StackLayout orientation="vertical">
    <Label
      class="menu_title"
      :text="$t('lang.components.LocationsAdjusts.title')"
      height="32"
      borderColor="#00251e"
    />
    <ScrollView>
      <ListView for="location in locations" @itemTap="onItemTap">
        <v-template>
          <LocationCard :item="location" />
        </v-template>
      </ListView>
    </ScrollView>
    <StackLayout
      row="2"
      class="locations-list-menu_buttons"
      width="100%"
      orientation="horizontal"
      horizontalAlignment="right"
    >
      <MDButton
        class="locations-list-menu_button_cancel"
        width="144"
        :text="$t('lang.components.newLocation.cancelButton')"
        borderColor="#007a70"
        borderWidth="1"
        @tap="onCancel"
      />
      <MDButton
        class="locations-list-menu_button_add m-r-0"
        width="144"
        :isEnabled="isEnabledAddButton"
        :text="$t('lang.components.newLocation.addButton')"
        @tap="onClose"
      />
    </StackLayout>
  </StackLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'
import LocationCard from '@/components/Locations/LocationCard.vue'
import '@/plugins/installMDButton'

import { setVisibility, getVisibility } from '@/composables/useComponent'

import {
  getAllLocations,
  updateLocation as updateLocationInStore,
} from '@/store/locationsStore'

export default Vue.extend({
  name: 'LocationsAdjusts',

  components: { LocationCard },

  props: {
    isCanceled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      locations: getAllLocations(),
    }
  },

  computed: {
    isVisibleLocationsList(): boolean {
      console.log(
        `LocationsList::computed:isVisibleLocationsList() ${getVisibility(
          'locationsList',
        )}`,
      )
      return getVisibility('locationsList')
    },
  },

  methods: {
    async hideLocationsListMenu() {
      console.log('LocationsListMenu::hideNewLocationMenu()')
      setVisibility('locationsList', false)
      // this.dismissKeyboard(true)
    },

    onItemTap() {
      console.log('LocationsListMenu::onItemTap()')
    },

    async onCancel() {
      // await this.reset()
      this.hideLocationsListMenu()
    },

    onClose() {
      this.hideLocationsListMenu()
    },
  },
})
</script>
