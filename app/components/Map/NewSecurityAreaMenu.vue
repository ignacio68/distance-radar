<template>
  <StackLayout class="bottom-sheet" orientation="vertical">
    <Label class="bottom-sheet__menu-title" :text="$t('lang.components.newArea.title')" />
    <GridLayout class="bottom-sheet__content" rows="auto, auto, 56, auto, 64" columns="*">
      <CustomSlider
        class="p-t-16"
        row="0"
        iconName="res://ic_visibility_white_24dp"
        iconColor="#004842"
        :sliderName="$t('lang.components.newArea.distance')"
        :textFieldWidth="56"
        units="km"
        :value="securityArea.radius"
        :minValue="radiusMinValue"
        :maxValue="radiusMaxValue"
        rippleColor="#007a70"
        @on-value-changed="setRadius"
      />
      <CustomSlider
        row="1"
        iconName="res://ic_visibility_white_24dp"
        iconColor="#004842"
        :sliderName="$t('lang.components.newArea.opacity')"
        :textFieldWidth="56"
        :isVisibleUnitsLabel="false"
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
        @on-checked-change="isActivated"
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
          class="button-cancel"
          width="144"
          :text="$t('lang.components.newArea.cancelButton')"
          @tap="onCancel"
        />
        <MDButton
          class="m-r-0"
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
        owner: '',
        center: {
          lat: 0,
          lng: 0,
        },
        radius: 5,
        fillColor: '#ff765d',
        fillOpacity: 0.5,
        group: '',
        visibility: 'visible',
        isActivated: false,
        alarmMode: 'EXIT',
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
      this.securityArea.owner = id
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

    isActivated(value: boolean) {
      this.securityArea.isActivated = value
    },

    setAlertMode(value: string) {
      this.securityArea.alarmMode = value
    },

    setColor(color: string) {
      this.securityArea.fillColor = color
    },

    onCancel() {
      this.reset()
      this.hideNewSecurityAreaMenu()
    },

    reset() {
      this.securityArea.owner = ''
      this.securityArea.center = { lat: 0, lon: 0 }
      this.securityArea.radius = this.radius
      this.securityArea.fillOpacity = this.opacity
      this.securityArea.fillColor = '#ff765d'
      this.securityArea.visibility = 'visible'
      this.securityArea.isActivated = false
      this.securityArea.alarmMode = 'EXIT'
      this.checkedActivation = false
    },

    hideNewSecurityAreaMenu() {
      console.log('NewSecurityAreaMenu.vue::hideNewSecurityAreaMenu()')
      setVisibility('newSecurityAreaMenu', false)
      this.$closeBottomSheet()
      // this.reset()
    },
  },
})
</script>
