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
        rows="auto, auto, 64"
        columns="*"
      >
        <TextForm
          ref="textForm"
          class="new-location-menu__id"
          row="0"
          :labelWidth="64"
          :labelText="$t('lang.components.newLocation.id')"
          returnKeyType="done"
          :maxLengthText="24"
          :dismissKeyboard="dismissKeyboard"
          :resetTextField="resetTextField"
          @on-return-press="onReturnPress"
        />
        <Label
          v-if="idError"
          row="1"
          class="new-location-id_error"
          :text="$tc('lang.components.newLocation.idError', idError)"
        />
        <StackLayout
          row="2"
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
            :isEnabled="isEnabledAddButton"
            :text="$t('lang.components.newLocation.addButton')"
            @tap="onAddNewLocation"
          />
        </StackLayout>
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import '@/plugins/installMDAButton'

import { setVisibility } from '@/composables/useComponent'

import { newLocation } from '@/api/locations'
// import { hideSoftKeyboard } from '@/services/commonsService'
import { hasId } from '@/store/locationsStore'

import { Location } from '@/types/types'

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
        group: null,
        color: null,
        selected: true,
        icon: 'res://ic_person_pin_pink_48dp'
      },
      // hasGroupError: false,
      idError: '0',
      dismissKeyboard: false,
      resetTextField: false,
      isEnabledAddButton: false,
    }
  },

  async mounted() {
    await this.reset()
    this.dismissKeyboard = false
    this.resetTextField = false
  },

  methods: {
    async onReturnPress(textValue: string) {
      await this.setId(textValue)
      await this.hasIdError()
      this.isEnabledAddButton = true
    },

    reset() {
      this.setId(null)
      this.idError = 0
      this.isEnabledAddButton = false
      this.resetTextField = true
      // this.group = null
    },

    async hideNewLocationMenu() {
      await this.reset()
      this.dismissKeyboard = false
      this.resetTextField = false
      setVisibility('newLocationMenu', false)
    },

    setId(id: string) {
      this.location.id = id
      this.idError = 0
      console.log(`id: ${this.location.id}`)
      // this.$emit('enabled-fab', false)
    },

    hasIdError() {
      !this.location.id ?
        this.idError = 1
          : hasId(this.location.id) ?
          this.idError = 2
            : this.idError = 0
    },

    onCancel() {
      console.log('onCancel()')
      this.dismissKeyboard = true
      this.resetTextField = true
      this.hideNewLocationMenu()
    },

    async newLocation(values: Location) {
        console.log(`newLocation()`)
        await newLocation(values)
        await this.hideNewLocationMenu()
        this.reset()
      },

    async onAddNewLocation() {
      console.log('onAdd()')
      // await this.hasIdError()
      !this.idError ? this.newLocation(this.location) : console.log(`ID error is: ${this.idError}`)
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
.new-location-id_error {
  color: red;
  font-size: $font-sz-m;
}
.new-location-menu_button_cancel {
  color: $primary;
  background-color: white;
  text-align: center;
}
</style>
