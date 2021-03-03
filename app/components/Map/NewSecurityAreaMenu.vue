<template>
  <StackLayout orientation="vertical" @loaded="onLoaded">
    <Label
      class="menu_title"
      :text="$t('lang.components.newArea.title')"
      height="32"
      borderColor="#00251e"
    />
    <GridLayout class="new-area-menu m-x-16 m-t-16" rows="auto, auto, 56, auto, 96" columns="*">
      <CustomSlider
        class="radius-slider"
        row="0"
        iconName="res://ic_visibility_white_24dp"
        iconColor="#004842"
        :sliderName="$t('lang.components.newArea.distance')"
        :value="securityArea.radius"
        :minValue="radiusMinValue"
        :maxValue="radiusMaxValue"
        rippleColor="#007a70"
        @on-value-changed="setRadius"
      />
      <CustomSlider
        class="opacity-slider"
        row="1"
        iconName="res://ic_visibility_white_24dp"
        iconColor="#004842"
        :sliderName="$t('lang.components.newArea.opacity')"
        :value="securityArea.fillOpacity"
        :minValue="opacityMinValue"
        :maxValue="opacityMaxValue"
        rippleColor="#007a70"
        @on-value-changed="setOpacity"
      />
      <ColorSelector
        row="2"
        :labelWidth="64"
        :title="$t('lang.components.colorSelector.text')"
        @on-selected-color="setColor"
      />
      <ActivationMenu
        row="3"
        :activationText="$t('lang.components.activationMenu.activation')"
        :isChecked="checkedActivation"
        @on-checked-change="isActivate"
        @on-alert-mode-selected="setAlertMode"
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

import { newSecurityArea } from '@/api/securityAreas'

import { round } from '@/utils/maths'

import { getSelectedLocation } from '@/store/locationsStore'

import { Location } from '@/api/types'

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
      radiusMinValue: 0,
      radiusMaxValue: 10,
      opacityMinValue: 0,
      opacityMaxValue: 1,
      securityArea: {
        id: '',
        center: {
          lat: 0,
          lng: 0,
        },
        radius: 5,
        fillColor: '#ff765d',
        fillOpacity: 0.5,
        group: null,
        visibility: 'visible',
        isActive: false,
        alertMode: 'EXIT',
      },
      checkedActivation: false,
    }
  },

  computed: {
    currentSelectedLocation(): Location {
      return getSelectedLocation()
    },

    radius(): number {
      return (this.radiusMaxValue - this.radiusMinValue) / 2
    },

    opacity(): number {
      return (this.opacityMaxValue - this.opacityMinValue) / 2
    },
  },

  mounted() {
    console.log('__NewSecurityAreaMenu.vue::mounted()')
    this.reset()
  },

  methods: {
    onLoaded() {
      console.log(`NewSecurityAreaMenu.vue::onLoaded()`)
      this.reset()
    },

    onAddNewSecurityArea(): void {
      this.setIdAndCenter()
        .then(() => {
          newSecurityArea(this.securityArea)
        })
        .then(() => {
          console.log(
            `NewSecurityAreaMenu.vue::addNewSecurityArea():securityArea: ${JSON.stringify(
              this.securityArea,
            )}`,
          )
          this.hideNewSecurityAreaMenu()
        })
    },

    async setIdAndCenter(): Promise<void> {
      const { id, lat, lng } = this.currentSelectedLocation
      this.securityArea.id = id
      this.securityArea.center.lat = lat
      this.securityArea.center.lng = lng
    },

    setRadius(value: number) {
      console.log(`NewSecurityAreaMenu.vue::setRadius: ${value}`)
      this.securityArea.radius = round(value, 2)
    },

    setOpacity(value: number) {
      console.log(`NewSecurityAreaMenu.vue::setOpacity: ${value}`)
      this.securityArea.fillOpacity = round(value, 1)
    },

    isActivate(value: boolean) {
      this.securityArea.isActive = value
    },

    setAlertMode(value: string) {
      this.securityArea.alertMode = value
    },

    setColor(color: string) {
      this.securityArea.fillColor = color
    },

    onCancel() {
      this.reset()
      this.hideNewSecurityAreaMenu()
    },

    reset() {
      ;(this.securityArea.id = null),
        (this.securityArea.center = { lat: 0, lon: 0 }),
        (this.securityArea.radius = this.radius),
        (this.securityArea.fillOpacity = this.opacity),
        (this.securityArea.fillColor = '#ff765d')
      this.securityArea.visibility = 'visible'
      this.securityArea.isActive = false
      this.securityArea.alertMode = 'EXIT'
      this.checkedActivation = false
      console.log(
        `NewSecurityAreaMenu.vue::reset()::Security Area: ${JSON.stringify(this.securityArea)}`,
      )
    },

    hideNewSecurityAreaMenu() {
      console.log('NewSecurityAreaMenu.vue::hideNewSecurityAreaMenu()')
      setVisibility('newSecurityAreaMenu', false)
      this.reset()
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
