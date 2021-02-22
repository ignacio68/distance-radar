<template>
  <GridLayout class="SecurityAreas" rows="auto, *">
    <Label
      row="0"
      class="SecurityAreas-title m-x-16 p-t-8"
      :text="$t('lang.views.SecurityAreas.title')"
    />
    <StackLayout row="1" class="m-x-16 p-t-16">
      <Label
        v-if="securityAreas.length === 0"
        class="SecurityAreas-empty m-x-16 m-t-32"
        :text="$t('lang.views.SecurityAreas.noSecurityAreas')"
      />
      <GridLayout v-else rows="*, auto">
        <ListView
          row="0"
          for="securityArea in securityAreas"
          @itemTap="onItemTap"
          class="SecurityAreas-list"
        >
          <v-template>
            <Label class="SecurityAreas-list_item" :text="securityArea.id" />
            <!-- <LocationCard
              :item="location"
              class="SecurityAreas-list_item m-y-4"
              :coordinatesTitle="
                $t('lang.components.locationCard.coordinatesTitle')
              "
              @on-tap="onConfirmDeleteLocation(location.id)"
            /> -->
          </v-template>
        </ListView>
        <MDButton
          row="1"
          class="SecurityAreas-accept-button m-t-32 pull-right"
          width="144"
          @tap="onButtonTap"
          :text="$t('lang.views.SecurityAreas.acceptButton')"
        />
      </GridLayout>
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { getAllSecurityAreas } from '@/store/securityAreasStore'

import { SecurityArea } from '@/api/types'

export default Vue.extend({
  name: 'SecurityAreas',
  data() {
    return {}
  },

  computed: {
    securityAreas(): SecurityArea[] {
      return getAllSecurityAreas()
    },
  },

  methods: {
    onButtonTap() {
      console.log('Locations::onButtonTap()')
    },

    onItemTap() {
      console.log('Locations::onItemTap()')
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';
.SecurityAreas-title {
  font: {
    size: $font-sz-xl;
    weight: 700;
  }
  color: $primary-dark;
}

.SecurityAreas-empty {
  font-size: $font-sz-l;
  color: $primary-dark;
}

.SecurityAreas-list_item {
  background-color: $surface-light;
  font-size: $font-sz-m;
}
</style>
