<template>
  <GridLayout
    class="action-bar"
    verticalAlignment="middle"
    height="56"
    width="100%"
    columns="48, *, 48, 48"
  >
    <Icon
      col="0"
      class="action-bar_menu-button"
      name="res://ic_menu_white_24dp"
      :rippleDuration="300"
      :rippleOpacity="0.2"
      @on-tap="onShowDrawer"
    />
    <Label
      col="1"
      class="action-bar_title"
      verticalAlignment="middle"
      :text="$t('lang.components.actionBar.title')"
    />
    <Icon
      col="2"
      class="action-bar_visibility-button m-r-0"
      :name="locationsListIcon"
      :rippleDuration="300"
      :rippleOpacity="0.2"
      @on-tap="onLocationsList"
    />
    <Icon
      col="3"
      class="action-bar_search-button m-r-0"
      :name="geocoderIcon"
      :rippleDuration="300"
      :rippleOpacity="0.2"
      @on-tap="onSearchLocations"
    />
  </GridLayout>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue'
  import { getVisibility, setVisibility, toggleVisibility } from '@/composables/useComponent'

  import Icon from '@/components/UI/Icon.vue'

  export default Vue.extend({
    name: 'MainActionBar',
    components: {
      Icon,
    },

    data() {
      return {
        locationsListEnabledIcon: 'res://ic_visibility_white_24dp',
        locationsListDisabledIcon: 'res://ic_visibility_off_white_24dp',
        geocoderEnabledIcon: 'res://ic_location_searching_white_24dp',
        geocoderDisabledIcon: 'res://ic_location_disabled_white_24dp'
      }
    },

    computed: {
      isVisibleGeocoder() {
        return getVisibility('geocoder')
      },

      isVisibleLocationsList() {
        return getVisibility('locationsList')
      },

      locationsListIcon(): string {
        return this.isVisibleLocationsList
          ? this.locationsListDisabledIcon
          : this.locationsListEnabledIcon
      },

      geocoderIcon(): string {
        return this.isVisibleGeocoder
          ? this.geocoderDisabledIcon
          : this.geocoderEnabledIcon
      }
    },

    methods: {
      onShowDrawer(): void {
        toggleVisibility('drawer')
      },

      onLocationsList(): void {
        toggleVisibility('locationsList')
        setVisibility('geocoder', false)
      },

      onSearchLocations(): void {
        toggleVisibility('geocoder')
        setVisibility('locationsList', false)
      },
    },
  })
</script>

<style lang="scss" scoped>
  @import '../../app-variables';

  .action-bar_menu-button {
    margin-left: 4;
  }

  .action-bar_title {
    margin-left: 20;
    font-weight: 700;
    font-size: $font-sz-l;
    background-color: $primary-variant;
    color: $onPrimary;
  }

  .action-bar_overflowMenu-button {
    margin-right: 4;
  }
</style>
