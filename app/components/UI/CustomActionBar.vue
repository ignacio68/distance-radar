<template>
  <GridLayout
    class="action-bar"
    verticalAlignment="middle"
    height="56"
    width="100%"
    columns="*, 48, 48"
  >
    <Label
      col="0"
      class="action-bar_title"
      verticalAlignment="middle"
      :text="$t('lang.components.actionBar.title')"
    />
    <!-- <Icon
      col="1"
      class="action-bar_visibility-button m-r-0"
      :name="visibilityIcon"
      @on-tap="onTap('tap-visibility')"
    /> -->
    <Icon
      col="1"
      class="action-bar_visibility-button m-r-0"
      :name="securityAreasVisibilityIcon"
      :rippleDuration="300"
      :rippleOpacity="0.2"
      @on-tap="onTapSecurityAreasVisibility"
    />
    <Icon
      col="2"
      class="action-bar_search-button m-r-0"
      :name="geocoderIcon"
      :rippleDuration="300"
      :rippleOpacity="0.2"
      @on-tap="onTapSearchLocations"
    />
  </GridLayout>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue'
  import { getVisibility, toggleVisibility } from '@/composables/useComponent'

  import Icon from '@/components/UI/Icon.vue'

  export default Vue.extend({
    name: 'CustomActionBar',
    components: {
      Icon,
    },

    data() {
      return {
        // TODO: Refactoring
        isVisibleSecurityArea: false,

        // geocoderEnabledIconColor: '#03dfcc',
        // geocoderDisabledIconColor: 'white',
        securityAreaVisibilityOnIcon: 'res://ic_visibility_white_24dp',
        securityAreaVisibilityOffIcon: 'res://ic_visibility_off_white_24dp',
        geocoderEnabledIcon: 'res://ic_location_searching_white_24dp',
        geocoderDisabledIcon: 'res://ic_location_disabled_white_24dp'
      }
    },

    computed: {
      // TODO: Refactoring
      isVisibleGeocoder() {
        return getVisibility('geocoder')
      },

      securityAreasVisibilityIcon(): string {
        return this.isVisibleSecurityArea
          ? this.securityAreaVisibilityOffIcon
          : this.securityAreaVisibilityOnIcon
      },

      // geocoderIconColor(): string {
      //   if(this.isVisibleGeocoder) return this.geocoderEnabledIconColor
      //   else return this.geocoderDisabledIconColor
      // },

      geocoderIcon(): string {
        return this.isVisibleGeocoder
          ? this.geocoderDisabledIcon
          : this.geocoderEnabledIcon
      }
    },

    methods: {
      // TODO: Refactoring
      onTapSecurityAreasVisibility() {
        console.log('onTapSecurityAreasVisibility()')
        this.isVisibleSecurityArea = !this.isVisibleSecurityArea
        this.$emit('on-tap-visibility', this.isVisibleSecurityArea)
      },

      onTapSearchLocations() {
        toggleVisibility('geocoder')
        console.log(`isVisibleGeocoder? ${this.isVisibleGeocoder}`)
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
    margin-left: 68;
    font-weight: 700;
    font-size: 20;
    background-color: $primary-variant;
    color: $onPrimary;
  }

  .action-bar_overflowMenu-button {
    margin-right: 4;
  }
</style>
