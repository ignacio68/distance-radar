<template>
  <Page>
  <StackLayout
    class="Locations"
    orientation="vertical"
  >
    <Label
        class="menu_title"
        :text="$t('lang.views.Locations.title')"
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
         <!-- <StackLayout
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
        </StackLayout> -->
  </StackLayout>
  </Page>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

import { setVisibility, getVisibility } from '@/composables/useComponent'

import { getLocations, updateLocationsStore } from '@/store/locationsStore'

import LocationCard from '@/components/Locations/LocationCard.vue'
import '@/plugins/installMDButton'

import Main from './Main.vue'

export default Vue.extend({
  name: 'Locations',

  components: { LocationCard },

  props: {
    isCanceled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      locations: getLocations()
    }
  },

  methods: {
    onItemTap() {
      console.log('Locations::onItemTap()')
    },

    onCancel() {
      console.log('Locations::onCancel()')
    },

    onClose() {
      console.log('Locations::onClose()')
    }
  }

})
</script>