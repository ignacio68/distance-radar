<template>
  <Page actionBarHidden="true">
    <StackLayout orientation="vertical">
      <Label
        class="menu_title"
        :text="$t('lang.components.newLocation.title')"
        height="32"
        borderColor="#00251e"
      />
      <GridLayout
        class="new-location-menu"
        rows="auto, 64"
        columns="*"
      >
        <TextForm
          ref="textForm"
          :value="location.id"
          row="0"
          class="new-location-menu__id"
          :labelWidth="64"
          :labelText="$t('lang.components.newLocation.id')"
          returnKeyType="done"
          :maxLengthText="24"
          :resetValue="resetValue"
          @on-text-change="setId"
          @on-return-press="enabledFab"
        />
        <Label
          v-if="hasIdError"
          row="1"
          class="new-location-menu_error"
          :text="$t('lang.components.newLocation.idError')"
        />
        <StackLayout
          row="4"
          class="new-location-menu_buttons"
          width="100%"
          orientation="horizontal"
          horizontalAlignment="right"
        >
          <MDButton
            class="new-location-menu_button_cancel"
            width="144"
            :text="$t('lang.components.newLocation.cancelButton')"
            borderColor="#007a70"
            borderWidth="1"
            @tap="onCancel"
          />
          <MDButton
            class="new-location-menu_button_add m-r-0"
            width="144"
            :text="$t('lang.components.newLocation.addButton')"
            @tap="onAddNewLocation"
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

import { hasId } from '@/store/locationsStore'
import { getCurrentUserLocation as userLocation } from '@/store/userLocationStore'

import TextForm from '@/components/UI/TextForm.vue'

export default Vue.extend({
  name: 'NewLocation',

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
      locationValue: '',
      location: {
        id: '',
        lat: '0',
        lng: '0',
        group: null,
        color: null,
        selected: true,
        icon: 'res://ic_person_pin_pink_48dp'
      },
      hasGroupError: false,
      hasIdError: false,
      resetValue: false
    }
  },

  computed: {
    userLocation,
  },

  methods: {
    reset() {
      this.location.id = ''
      this.resetValue = true
      // this.group = null
    },

    enabledFab() {
      this.$emit('enabled-fab', true)
    },

    hiddenSoftKeyboard() {
      setVisibility('textFieldSoftKeyboard', false)
      console.log(`hiddenSofKeyboard() text: ${this.location.id}`)
    },

    hideNewLocationMenu() {
      this.hiddenSoftKeyboard()
      this.reset()
      setVisibility('newLocationMenu', false)
      // this.$modal.close()
    },

    setId(id: string) {
      this.location.id = id
      console.log(`id: ${this.location.id}`)
      this.hasIdError = false
      this.$emit('enabled-fab', false)
    },

    setNewLocationCoordinates() {
      this.location.lat = userLocation().lat
      this.location.lng = userLocation().lng
    },

    isValidLocationID() {
      console.log('isValid()')
      const isValid = Promise.resolve(
        this.location.id ? console.log('There are not errors') : this.hasIdError = true
      )
      return isValid
    },

    // onRadiusChange(radius) {
    //   console.log('onRadiusChange()')
    //   this.$emit('on-radius-change', radius)
    // },

    onCancel() {
      console.log('onCancel()')
      this.hideNewLocationMenu()
      // this.$modal.close()
    },

    async onAddNewLocation() {
      console.log('onAdd()')
      this.setNewLocationCoordinates()
      await this.isValidLocationID().then(() => {
        console.log(`ID: ${this.location.id}`)
        console.log(`onAddNewLocation: ${JSON.stringify(this.location)}`)
        if (!this.hasError) this.$emit('add-new-location', this.location)
        else return
      })
      this.hideNewLocationMenu()
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
.new-location-menu_error {
  color: red;
}
.new-location-menu_button_cancel {
  color: $primary;
  background-color: white;
  text-align: center;
}
</style>
