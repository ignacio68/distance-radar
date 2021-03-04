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
            <SecurityAreaCard
              :item="securityArea"
              class="SecurityAreas-list_item m-y-4"
              @on-tap="onConfirmDeleteSecurityArea(securityArea.id)"
            />
          </v-template>
        </ListView>
      </GridLayout>
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { confirmDeleteSecurityArea } from '@/components/Dialogs/ConfirmDeleteSecurityArea'
import { ConfirmOptions } from '@nativescript/core'

import { getAllSecurityAreas } from '@/store/securityAreasStore'

import { SecurityArea } from '@/api/types'

import SecurityAreaCard from '@/components/SecurityAreas/SecurityAreaCard.vue'

export default Vue.extend({
  name: 'SecurityAreas',

  components: {
    SecurityAreaCard,
  },

  data() {
    return {}
  },

  computed: {
    securityAreas(): SecurityArea[] {
      return getAllSecurityAreas()
    },
  },

  methods: {
    onConfirmDeleteSecurityArea(id: string): void {
      const options: ConfirmOptions = {
        // title: `${this.$t('lang.dialogs.deleteSecurityArea.title')}`,
        title: id,
        message: `${this.$t('lang.dialogs.deleteSecurityArea.message')}`,
        okButtonText: `${this.$t('lang.dialogs.deleteSecurityArea.okButton')}`,
        cancelButtonText: `${this.$t('lang.dialogs.deleteSecurityArea.cancelButton')}`,
      }
      confirmDeleteSecurityArea(options, id)
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
