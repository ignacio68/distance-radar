<template>
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
            :isEnabled="enabledAddButton"
            :text="$t('lang.components.newLocation.addButton')"
            @tap="onAddNewLocation"
          />
        </StackLayout>
      </GridLayout>
    </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import '@/plugins/installMDButton'

import { setVisibility, getVisibility } from '@/composables/useComponent'

import { newLocation } from '@/api/locations'

import { hasId } from '@/store/locationsStore'

import { Location } from '@/types/types'

import TextForm from '@/components/UI/TextForm.vue'

export default Vue.extend({
  name: 'NewLocationMenu',

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
      //GroupError: '0',
      idError: '0',
      dismissKeyboard: false,
      resetTextField: false,
      enabledAddButton: false,
    }
  },

  computed: {
    isVisibleNewLocationMenu(): boolean {
        console.log(`NewLocationMenu::computed:isVisibleNewLocationMenu() ${getVisibility('newLocationMenu')}`)
        return getVisibility('newLocationMenu')
    },
  },

  watch: {
    isVisibleNewLocationMenu(newValue: boolean, oldValue: boolean) {
        console.log(`NewLocationMenu::watch:isVisibleNewLocationMenu(): ${newValue}`)
        newValue ? this.isResetTextField(false) : this.isResetTextField(true)
        }
      },


  async mounted() {
    console.log('NewLocationMenu::mounted()')
    await this.reset()
    await this.isDismissKeyboard(false)
    // await this.isResetTextField(true)
  },

  methods: {
    isDismissKeyboard(value: boolean) {
      this.dismissKeyboard = value
      console.log(`NewLocationMenu::isDismissKeyboard: ${this.dismissKeyboard}`)
    },

    isResetTextField(value: boolean) {
      this.resetTextField = value
      console.log(`NewLocationMenu::isResetTextField(): ${this.resetTextField}`)
    },

    isEnabledAddButton(value: boolean) {
      this.enabledAddButton = value
    },

    setIdError(value: number) {
      this.idError = value
    },

    async reset() {
      console.log('NewLocationMenu::reset()')
      await this.setId(null)
      await this.setIdError(0)
      this.isEnabledAddButton(false)
      // this.group = null
    },

    async hideNewLocationMenu() {
      console.log('NewLocationMenu::hideNewLocationMenu()')
      setVisibility('newLocationMenu', false)
      await this.reset()
      await this.isIsmissKeyboard(true)
    },

    setId(id: string) {
      this.location.id = id
      this.setIdError(0)
      // this.$emit('enabled-fab', false)
    },

    hasIdError() {
      !this.location.id ?
        this.setIdError(1)
          : hasId(this.location.id) ?
          this.setIdError(2)
            : this.setIdError(0)
    },

    async newLocation() {
        await newLocation(this.location)
        this.hideNewLocationMenu()
      },

    async onReturnPress(textValue: string) {
      await this.setId(textValue)
      await this.hasIdError()
      this.isEnabledAddButton(true)
    },

    async onCancel() {
      await this.reset()
      this.hideNewLocationMenu()
    },

    async onAddNewLocation() {
      !this.idError ? await this.newLocation() : console.log(`ID error is: ${this.idError}`)

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
