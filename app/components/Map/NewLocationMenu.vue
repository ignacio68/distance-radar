<template>
  <StackLayout class="bottom-sheet" orientation="vertical" height="500">
    <Label class="bottom-sheet__menu-title" :text="$t('lang.components.newLocation.title')" />
    <GridLayout class="bottom-sheet__content" rows="auto, 32, 64, *" columns="*">
      <TextForm
        ref="textForm"
        class="p-t-16"
        row="0"
        :labelWidth="64"
        :labelText="$t('lang.components.newLocation.id')"
        returnKeyType="done"
        :maxLengthText="24"
        :isDismissedKeyboard="isDismissedKeyboard"
        :isResetTextField="isResetTextField"
        @on-return-press="onReturnPress"
      />
      <StackLayout row="1" height>
        <Label
          v-if="idError"
          class="text-error"
          :text="$tc('lang.components.newLocation.idError', idError)"
        />
      </StackLayout>
      <StackLayout row="2" width="100%" orientation="horizontal" horizontalAlignment="right">
        <MDButton
          class="button-cancel"
          width="144"
          :text="$t('lang.components.newLocation.cancelButton')"
          @tap="onCancel"
        />
        <MDButton
          class="m-r-0"
          width="144"
          :isEnabled="isEnabledAddLocationButton"
          :text="$t('lang.components.newLocation.addButton')"
          @tap="onAddNewLocation"
        />
      </StackLayout>
      <StackLayout row="3"></StackLayout>
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
    onAddNewLocation() {
      this.isIdError() ? console.log(`ID error is: ${this.idError}`) : this.newLocation()
    },

    newLocation() {
      newLocation(this.location)
      this.hideNewLocationMenu()
    },

    onReturnPress(textValue: string) {
      this.setId(textValue)
      this.setEnabledAddLocationButton(!this.isIdError())
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

    onCancel() {
      this.reset()
      this.hideNewLocationMenu()
    },

    reset() {
      this.location.id = null
      this.setIdError(0)
      this.setEnabledAddLocationButton(false)
      console.log(`NewLocationMenu::reset():isIdError: ${this.isIdError}`)
      // this.group = null
    },

    hideNewLocationMenu() {
      console.log('NewLocationMenu::hideNewLocationMenu()')
      setVisibility('newLocationMenu', false)
      // this.reset()
      this.setDismissedKeyboard(true)
      this.$closeBottomSheet()
    },
  },
})
</script>
<style lang="scss" scoped>
.text-error {
  padding-left: 80;
}
</style>
