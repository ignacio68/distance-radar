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
          :minValue="0"
          :maxValue="100"
          :value="radius"
          @on-index-changed="onRadiusChanged"
        />
        <CustomSlider
          class="opacity-slider"
          row="1"
          :sliderName="$t('lang.components.newArea.opacity')"
          :minValue="0"
          :maxValue="100"
          :value="opacity"
          @on-index-changed="onOpacityChanged"
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

import { hasId } from '@/store/securityAreasStore'

import { Color } from '@nativescript/core'

import { BasicPolygonOptions } from '@/types/types'

import CustomSlider from '@/components/UI/CustomSlider.vue'
import ColorSelector from '@/components/UI/ColorSelector.vue'

export default Vue.extend({
  name: 'NewSecurityArea',
  components: {
    CustomSlider,
    ColorSelector
  },
  data(){
    return {
      radius: 0,
      opacity: 0,
      securityArea: {
        id: '',
        center: {
          lat: 0,
          lng: 0,
        },
        radius: 1,
        color: '#31aec4',
        opacity: .5,
        group: null,
        isVisible: true,
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
    console.log('NewSecurityArea.vue::mounted()')
    await this.reset()
  },

  methods: {
    async reset() {
      console.log('NewSecurityArea.vue::reset()')
      //  TODO: to deploy
      this.securityArea.id = ''
      this.securityArea.center.lat = 0
      this.securityArea.center.lng = 0
      await this.setIdError(0)
    },

    hideNewSecurityAreaMenu() {
      console.log('NewSecurityArea.vue::hideNewSecurityAreaMenu()')
      setVisibility('newSecurityAreaMenu', false)
      this.reset()
    },

    onRadiusChanged(value) {
      console.log('NewSecurityArea.vue::onRadiusChanged()')
    },

    onOpacityChanged(value) {
      console.log('NewSecurityArea.vue::onOpacityChanged()')
    },

    setColor(color: any) {
      console.log(`NewSecurityArea.vue::color: ${color.name}`)
      this.securityArea.color = color.color
    },

    setOpacity(value: number) {
      this.securityArea = value / 10
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

    async setOptions() {
      console.log('NewSecurityArea.vue::setOptions()')
      const options = await fetchSelectedLocation()
      console.log(`NewSecurityArea.vue::options:  + ${JSON.stringify(options)}`)
      this.securityArea.id = options.id
      this.securityArea.center.lat = options.lat
      this.securityArea.center.lng = options.lng
    },

    async newSecurityArea() {
      console.log('NewSecurityArea.vue::newSecurityArea()')
      // const polygonOptions: BasicPolygonOptions = {
      //   fillColor: new Color(color),
      //   fillOpacity: this.fillOpacity / 10,
      // }
      await this.setOptions()
      console.log(`NewSecurityArea.vue::securityArea: ${JSON.stringify(this.securityArea)}`)
      await newSecurityArea(this.securityArea)
      await this.hideNewSecurityAreaMenu()
    },

    async onCancel() {
      console.log('NewSecurityArea.vue::onCancel()')
      await this.reset()
      this.hideNewSecurityAreaMenu()
    },

    async onAddNewSecurityArea() {
      console.log('NewSecurityArea.vue::onAddNewSecurityArea()')
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
