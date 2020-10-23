<template>
  <Page actionBarHidden="true">
    <StackLayout orientation="vertical">
      <Label
        class="menu_title"
        :text="$t('lang.components.newMarker.title')"
        height="32"
        borderColor="#00251e"
      />
      <GridLayout
        class="new-marker-menu"
        rows="auto, 64"
        columns="*"
      >
        <TextForm
          ref="textForm"
          row="0"
          class="new-marker-menu__id"
          :labelWidth="64"
          :labelText="$t('lang.components.newMarker.id')"
          returnKeyType="done"
          :maxLengthText="24"
          @on-text-change="setId"
          @on-return-press="enabledFab"
        />
        <Label
          v-if="hasIdError"
          row="1"
          class="new-marker-menu_error"
          :text="$t('lang.components.newMarker.idError')"
        />
        <StackLayout
          row="4"
          class="new-marker-menu_buttons"
          width="100%"
          orientation="horizontal"
          horizontalAlignment="right"
        >
          <MDButton
            class="new-marker-menu_button_cancel"
            width="144"
            :text="$t('lang.components.newMarker.cancelButton')"
            borderColor="#007a70"
            borderWidth="1"
            @tap="onCancel"
          />
          <MDButton
            class="new-marker-menu_button_add m-r-0"
            width="144"
            :text="$t('lang.components.newMarker.addButton')"
            @tap="onAddNewMarker"
          />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'vue'
import '@/plugins/installMDAButton'

import { setVisibility } from '@/composables/useComponent'

import { getCurrentUserLocation as userLocation } from '@/store/userLocationStore'

import TextForm from '@/components/UI/TextForm.vue'

export default Vue.extend({
  name: 'NewMarker',
  components: {
    TextForm,
  },
  props: {
    isCanceled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      markerValue: '',

      marker: {
        id: null,
        coordinates: {
          lat: '0',
          lng: '0',
        },
        group: null,
        color: null,
      },
      hasGroupError: false,
      hasIdError: false,
    }
  },

  methods: {
    reset() {
      this.marker.id = null
      // this.group = null
    },

    enabledFab() {
      this.$emit('enabled-fab', true)
    },

    hiddenSoftKeyboard() {
      setVisibility('textFieldSoftKeyboard', false)
    },

    hideNewMarkerMenu() {
      this.hiddenSoftKeyboard()
      setVisibility('newMarkerMenu', false)
    },

    setId(id: string) {
      console.log(`id: ${id}`)
      this.marker.id = id
      this.hasIdError = false
      this.$emit('enabled-fab', false)
    },

    setNewMarkerCoordinates() {
      this.marker.coordinates = userLocation()
      // this.marker.coordinates.lat = userLocation().lat
      // this.marker.coordinates.lng = userLocation().lng
    },

    isValidMarkerID() {
      console.log('isValid()')
      const isValid = Promise.resolve(
        this.marker.id ? console.log('There are not errors') : this.hasIdError = true
      )
      return isValid
    },

    // onRadiusChange(radius) {
    //   console.log('onRadiusChange()')
    //   this.$emit('on-radius-change', radius)
    // },

    onCancel() {
      console.log('onCancel()')
      this.reset()
      this.hideNewMarkerMenu()
    },

    async onAddNewMarker() {
      console.log('onAdd()')
      this.setNewMarkerCoordinates()
      await this.isValidMarkerID().then(() => {
        this.hideNewMarkerMenu()
        if (this.hasError === null) this.$emit('add-new-marker', this.marker)
        else return
      })
    },
  },
})
</script>

<style scoped lang="scss">
@import '../../app-variables';

.menu_title {
 font-weight: 700;
 font-size: 16;
 color: $primary-variant;
 opacity: .8;
 border-bottom: 1, solid, rgba($primary, .1);
}
.new-marker-menu_error {
  color: red;
}
.new-marker-menu_button_cancel {
  color: $primary;
  background-color: white;
  text-align: center;
}
</style>
