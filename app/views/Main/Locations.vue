<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
   <GridLayout
      class="Locations"
      rows="auto, *"
    >
      <CommonActionBar
        row="0"
        :title="$t('lang.views.Locations.title')"
        @on-tap="onBackNavigation"
      />
      <ScrollView
        row="1"
      >
        <ListView for="location in locations" @itemTap="onItemTap">
          <v-template>
            <LocationCard
              :item="location"
              @on-tap="onConfirmDeleteLocation(location.id)"
            />
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
    </GridLayout>
  </Page>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

import { confirmDeleteLocation } from '@/components/Dialogs/ConfirmDeleteLocation'
import { ConfirmOptions } from '@nativescript/core'

import { setVisibility, getVisibility } from '@/composables/useComponent'

import { getLocations, updateLocationsStore } from '@/store/locationsStore'

import CommonActionBar from '@/components/UI/CommonActionBar.vue'
import LocationCard from '@/components/Locations/LocationCard.vue'
import '@/plugins/installMDButton'

import Main from './Main.vue'

export default Vue.extend({
  name: 'Locations',

  components: {
    LocationCard,
    CommonActionBar,
    Main
    },

  props: {
    isCanceled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      locations: getLocations(),
      Main: Main,
    }
  },

  methods: {
    onBackNavigation() {
      console.log('Locations::onBackNavigation()')
      this.$navigateTo(Main, {'ClearHistory': true})
    },

    onConfirmDeleteLocation(id: string): void {
      const options: ConfirmOptions = {
        // title: `${this.$t('lang.dialogs.deleteLocation.title')}`,
        title: id,
        message: `${this.$t('lang.dialogs.deleteLocation.message')}`,
        okButtonText: `${this.$t('lang.dialogs.deleteLocation.okButton')}`,
        cancelButtonText: `${this.$t('lang.dialogs.deleteLocation.cancelButton')}`
      }
      confirmDeleteLocation(options, id)
    },

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