<template>
  <StackLayout orientation="vertical">
    <Label
      class="menu_title"
      :text="$t('lang.components.newArea.title')"
      height="32"
      borderColor="#00251e"
    />
    <GridLayout
      class="new-area-menu m-x-16 m-t-16"
      rows="auto, auto, 56, auto, 96"
      columns="*"
    >
      <CustomSlider
        class="radius-slider"
        row="0"
        iconName="res://ic_visibility_white_24dp"
        iconColor="#004842"
        :sliderName="$t('lang.components.newArea.distance')"
        :value="radius"
        :minValue="0"
        :maxValue="10"
        rippleColor="#007a70"
        @on-value-changed="onRadiusChanged"
      />
      <CustomSlider
        class="opacity-slider"
        row="1"
        iconName="res://ic_visibility_white_24dp"
        iconColor="#004842"
        :sliderName="$t('lang.components.newArea.opacity')"
        :value="opacity"
        :minValue="0"
        :maxValue="1"
        rippleColor="#007a70"
        @on-value-changed="onOpacityChanged"
      />
      <ColorSelector
        row="2"
        :labelWidth="64"
        :title="$t('lang.components.colorSelector.text')"
        @on-selected-color="onSetColor"
      />
      <ActivationMenu
        row="3"
        :activationText="$t('lang.components.activationMenu.activation')"
        :isChecked="checkedActivation"
        @on-checked-change="onActivationChanged"
        @on-alert-mode-selected="onAlertModeSelected"
      />
      <StackLayout
        row="4"
        class="new-marker-menu_buttons m-t-16"
        width="100%"
        orientation="horizontal"
        horizontalAlignment="right"
      >
        <MDButton
          class="new-area-menu_button_cancel"
          width="144"
          :text="$t('lang.components.newArea.cancelButton')"
          borderColor="#007a70"
          borderWidth="1"
          @tap="onCancel"
        />
        <MDButton
          class="new-area-menu_button_add m-r-0"
          width="144"
          :text="$t('lang.components.newArea.addButton')"
          @tap="onAddNewSecurityArea"
        />
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { setVisibility } from '@/composables/useComponent'

import { newSecurityArea, showSecurityArea } from '@/api/securityAreas'
import { fetchSelectedLocation } from '@/api/locations'

import { round } from '@/utils/maths'

import { hasId } from '@/store/securityAreasStore'

import { LayerVisibility } from '@/api/types'

import CustomSlider from '@/components/UI/CustomSlider.vue'
import ColorSelector from '@/components/UI/ColorSelector.vue'
import ActivationMenu from '@/components/UI/ActivationMenu.vue'

export default Vue.extend({
  name: 'NewSecurityAreaMenu',
  components: {
    CustomSlider,
    ColorSelector,
    ActivationMenu,
  },

  data() {
    return {
      radius: 5,
      opacity: 0.5,
      securityArea: {
        id: '',
        center: {
          lat: 0,
          lng: 0,
        },
        radius: 0.1,
        fillColor: '',
        fillOpacity: 0.5,
        group: null,
        visibility: 'visible',
        isActive: false,
        alertMode: 'EXIT',
      },
      idError: 0,
      checkedActivation: false,
    }
  },

  computed: {
    fetchCurrentLocation() {
      return fetchSelectedLocation()
    },
  },

  async mounted() {
    console.log('__NewSecurityAreaMenu.vue::mounted()')
    // this.onSetColor('#ff6ea1')
    this.reset()
  },

  beforeUpdate() {
    console.log('__NewSecurityAreaMenu::beforeUpdate()')
  },

  updated() {
    console.log('__NewSecurityAreaMenu::updated()')
  },

  beforeDestroy() {
    console.log('__NewSecurityAreaMenu::beforeDestroy()')
  },

  destroyed() {
    console.log('__NewSecurityAreaMenu::beforeDestroy()')
  },

  methods: {
    reset() {
      console.log('NewSecurityAreaMenu.vue::reset()')
      this.radius = 5
      this.opacity = 0.5
      this.onSetColor('#ff6ea1')
      this.checkedActivation = false
      this.setIdError(0)
    },

    hideNewSecurityAreaMenu() {
      // console.log('NewSecurityAreaMenu.vue::hideNewSecurityAreaMenu()')
      setVisibility('newSecurityAreaMenu', false)
      // this.reset()
    },

    onRadiusChanged(value: number) {
      console.log(`NewSecurityAreaMenu.vue::onRadiusChanged: ${value}`)
      this.securityArea.radius = round(value, 2)
    },

    onOpacityChanged(value: number) {
      console.log(`NewSecurityAreaMenu.vue::onOpacityChanged: ${value}`)
      this.securityArea.fillOpacity = round(value, 1)
    },

    onActivationChanged(value: boolean) {
      this.securityArea.isActive = value
    },

    onAlertModeSelected(value: string) {
      this.securityArea.alertMode = value
    },

    onSetColor(color: string) {
      this.securityArea.fillColor = color
    },

    setIdError(value: number) {
      this.idError = value
    },

    hasIdError() {
      !this.securityArea.id
        ? this.setIdError(1)
        : hasId(this.securityArea.id)
        ? this.setIdError(2)
        : this.setIdError(0)
    },

    async setIdAndCenter(): Promise<void> {
      // console.log('NewSecurityAreaMenu.vue::setIdAndCenter()')
      const options = fetchSelectedLocation()
      this.securityArea.id = options.id
      this.securityArea.center.lat = options.lat
      this.securityArea.center.lng = options.lng
    },

    async newSecurityArea(): Promise<void> {
      console.log(
        `NewSecurityAreaMenu.vue::newSecurityArea():securityArea: ${JSON.stringify(
          this.securityArea,
        )}`,
      )
      await this.setIdAndCenter()
      await newSecurityArea(this.securityArea)
      await this.hideNewSecurityAreaMenu()
      this.reset()
    },

    async onCancel() {
      // console.log('NewSecurityAreaMenu.vue::onCancel()')
      await this.hideNewSecurityAreaMenu()
      this.reset()
    },

    async onAddNewSecurityArea() {
      // console.log('NewSecurityAreaMenu.vue::onAddNewSecurityArea()')
      !this.idError
        ? this.newSecurityArea()
        : console.log(`ID error is: ${this.idError}`)
    },

    showSecurityArea(id: string, value: LayerVisibility) {
      showSecurityArea(id, value)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.menu_title {
  font-weight: 700;
  font-size: 16;
  color: $primary-dark;
  opacity: 0.8;
  border-bottom: 1, solid, rgba($primary, 0.1);
}
.new-area-menu_button_cancel {
  color: $primary;
  background-color: white;
  text-align: center;
}
.divider {
  background-color: $primary-light;
}
</style>
