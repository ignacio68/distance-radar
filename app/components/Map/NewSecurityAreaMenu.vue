<template>
    <StackLayout orientation="vertical">
      <Label
        class="menu_title"
        :text="$t('lang.components.newArea.title')"
        height="32"
        borderColor="#00251e"
      />
      <GridLayout
        class="new-area-menu"
        rows="auto, auto, 48, 64"
        columns="*"
      >
        <CustomSlider
          class="radius-slider"
          row="0"
          :sliderName="$t('lang.components.newArea.distance')"
          :value="radius"
          :minValue="0"
          :maxValue="100"
          @on-value-changed="onRadiusChanged"
        />
        <CustomSlider
          class="opacity-slider"
          row="1"
          :sliderName="$t('lang.components.newArea.opacity')"
          :value="opacity"
          :minValue="0"
          :maxValue="1"
          @on-value-changed="onOpacityChanged"
        />
        <ColorSelector
          row="2"
          :labelWidth="64"
          @on-selected-color="setColor"
        />
        <StackLayout
          row="3"
          class="new-marker-menu_buttons"
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
      </Gridlayout>
    </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { setVisibility, getVisibility } from '@/composables/useComponent'

import { newSecurityArea, showSecurityArea } from '@/api/securityAreas'
import { fetchSelectedLocation } from '@/api/locations'
import { startTrackingUserLocation } from '@/api/geolocation'

import { hasId } from '@/store/securityAreasStore'

import { Color } from '@nativescript/core'

import { BasicPolygonOptions } from '@/types/types'

import CustomSlider from '@/components/UI/CustomSlider.vue'
import ColorSelector from '@/components/UI/ColorSelector.vue'

export default Vue.extend({
  name: 'NewSecurityAreaMenu',
  components: {
    CustomSlider,
    ColorSelector
  },
  data(){
    return {
      radius: 50,
      opacity: 0.5,
      securityArea: {
        id: '',
        center: {
          lat: 0,
          lng: 0,
        },
        radius: .1,
        fillColor: '',
        fillOpacity: .5,
        group: null,
        isVisible: true,
        isActive: true,
      },
      idError: 0,
    }
  },

  computed: {
    fetchCurrentLocation() {
      return fetchSelectedLocation()
    }
  },

  watch: {
    // fetchCurrentLocation(newValue: Location) {
    //   {
    //     this.securityArea.id = this.fetchCurrentLocation.id
    //     this.securityArea.center.lat = this.fetchCurrentLocation.lat
    //     this.securityArea.center.lng = this.fetchCurrentLocation.lng
    //   }
    // }
  },

  async mounted() {
    console.log('NewSecurityAreaMenu.vue::mounted()')
    this.setColor('#ff6ea1')
    // await this.reset()
  },

  methods: {
    reset() {
      console.log('NewSecurityAreaMenu.vue::reset()')
      // this.securityArea.id = ''
      // this.securityArea.center.lat = 0
      // this.securityArea.center.lng = 0
      this.setIdError(0)
    },

    hideNewSecurityAreaMenu() {
      // console.log('NewSecurityAreaMenu.vue::hideNewSecurityAreaMenu()')
      setVisibility('newSecurityAreaMenu', false)
      // this.reset()
    },

    onRadiusChanged(value) {
      console.log(`NewSecurityAreaMenu.vue::onRadiusChanged(): ${value}`)
      this.securityArea.radius = value
    },

    onOpacityChanged(value) {
      console.log(`NewSecurityAreaMenu.vue::onOpacityChanged(): ${value}`)
      this.securityArea.fillOpacity = value
    },

    setColor(color: string) {
      // console.log(`NewSecurityAreaMenu.vue::color: ${color.name}`)
      this.securityArea.fillColor = new Color(color)
      console.log(`NewSecurityAreaMenu.vue::color: ${this.securityArea.fillColor}`)
    },

    setRadius(value: number) {
      this.securityArea.radius = value
    },

    setOpacity(value: number) {
      console.log('NewSecurityAreaMenu.vue::setRadius()')
      this.securityArea.fillOpacity  = value / 10
    },

    setIdError(value: number) {
      this.idError = value
    },

    hasIdError() {
      !this.securityArea.id ?
        this.setIdError(1)
          : hasId(this.securityArea.id) ?
          this.setIdError(2)
            : this.setIdError(0)
    },

    async setOptions(): Promise<void> {
      // console.log('NewSecurityAreaMenu.vue::setOptions()')
      const options = await fetchSelectedLocation()
      // console.log(`NewSecurityAreaMenu.vue::options:  + ${JSON.stringify(options)}`)
      this.securityArea.id = options.id
      this.securityArea.center.lat = options.lat
      this.securityArea.center.lng = options.lng
    },

    async newSecurityArea(): Promise<void>{
      await this.setOptions()
      await newSecurityArea(this.securityArea)
      console.log(`NewSecurityAreaMenu.vue::newSecurityArea():securityArea: ${JSON.stringify(this.securityArea)}`)
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
      !this.idError ? this.newSecurityArea() : console.log(`ID error is: ${this.idError}`)
    },

    showSecurityArea(id: string, value:boolean) {
      showSecurityArea(id, value)
    },
  }
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.menu_title {
 font-weight: 700;
 font-size: 16;
 color: $primary-variant;
 opacity: .8;
 border-bottom: 1, solid, rgba($primary, .1);
}
.new-area-menu_button_cancel {
  color: $primary;
  background-color: white;
  text-align: center;
}
</style>
