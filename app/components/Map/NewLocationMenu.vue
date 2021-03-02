<template>
  <StackLayout orientation="vertical" height="300">
    <Label
      class="menu_title"
      :text="$t('lang.components.newLocation.title')"
      height="32"
      borderColor="#00251e"
    />
    <GridLayout class="new-location-menu" rows="auto, auto, 64" columns="*">
      <TextForm
        ref="textForm"
        class="new-location-menu__id"
        row="0"
        :labelWidth="64"
        :labelText="$t('lang.components.newLocation.id')"
        returnKeyType="done"
        :maxLengthText="24"
        :isDismissedKeyboard="isDismissedKeyboard"
        :isResetTextField="isResetTextField"
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
          :isEnabled="isEnabledAddLocationButton"
          :text="$t('lang.components.newLocation.addButton')"
          @tap="onAddNewLocation"
        />
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { setVisibility, getVisibility } from '@/composables/useComponent'

import { newLocation } from '@/api/locations'

import { isLocationId } from '@/store/locationsStore'

import TextForm from '@/components/UI/TextForm.vue'

export default Vue.extend({
  name: 'NewLocationMenu',

  components: {
    TextForm,
  },

  props: {
    isCanceled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      locationValue: '',
      location: {
        id: null,
        group: null,
        color: null,
        selected: true,
        icon: 'res://ic_person_pin_pink_48dp',
      },
      idError: 0,
      isDismissedKeyboard: false,
      isResetTextField: false,
      isEnabledAddLocationButton: false,
    }
  },

  computed: {
    isVisibleNewLocationMenu(): boolean {
      console.log(
        `NewLocationMenu::computed:isVisibleNewLocationMenu() ${getVisibility('newLocationMenu')}`,
      )
      return getVisibility('newLocationMenu')
    },
  },

  watch: {
    isVisibleNewLocationMenu(newValue: boolean, oldValue: boolean) {
      console.log(`NewLocationMenu::watch:isVisibleNewLocationMenu(): ${newValue}`)
      if (newValue) {
        this.setResetTextField(false)
        this.setDismissedKeyboard(false)
      } else {
        this.setResetTextField(true)
      }
    },
  },

  mounted() {
    console.log('NewLocationMenu::mounted()')
    this.reset()
  },

  methods: {
    async reset() {
      this.location.id = null
      this.setIdError(0)
      this.setEnabledAddLocationButton(false)
      console.log(`NewLocationMenu::reset():isIdError: ${this.isIdError}`)
      // this.group = null
    },

    hideNewLocationMenu() {
      console.log('NewLocationMenu::hideNewLocationMenu()')
      setVisibility('newLocationMenu', false)
      this.reset().then(() => this.setDismissedKeyboard(true))
    },

    onReturnPress(textValue: string) {
      this.setId(textValue)
      this.setEnabledAddLocationButton(!this.isIdError())
    },

    onCancel() {
      this.reset()
      this.hideNewLocationMenu()
    },

    onAddNewLocation() {
      this.isIdError() ? console.log(`ID error is: ${this.idError}`) : this.newLocation()
    },

    newLocation() {
      newLocation(this.location)
      this.hideNewLocationMenu()
    },

    setId(id: string) {
      if (id === null || id === '') this.setIdError(1)
      else if (isLocationId(id)) this.setIdError(2)
      else {
        this.location.id = id
        this.setIdError(0)
        // this.$emit('enabled-fab', false)
      }
    },

    isIdError(): boolean {
      return Boolean(this.idError)
    },

    setIdError(value: number) {
      this.idError = value
      console.log(`NewLocationMenu::setIdError::error: ${this.idError}`)
    },

    setDismissedKeyboard(value: boolean) {
      this.isDismissedKeyboard = value
      console.log(`NewLocationMenu::isDismissedKeyboard: ${this.isDismissedKeyboard}`)
    },

    setResetTextField(value: boolean) {
      this.isResetTextField = value
      console.log(`NewLocationMenu::isResetTextField(): ${this.isResetTextField}`)
    },

    setEnabledAddLocationButton(value: boolean) {
      this.isEnabledAddLocationButton = value
    },
  },
})
</script>

<style scoped lang="scss">
@import '../../app-variables';

.menu_title {
  font-weight: 700;
  font-size: 16;
  color: $primary-dark;
  opacity: 0.8;
  border-bottom: 1, solid, rgba($primary, 0.1);
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
