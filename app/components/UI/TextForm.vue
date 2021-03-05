<template>
  <GridLayout class="TextForm" rows="*" columns="auto, auto">
    <Label
      class="TextForm__label"
      col="0"
      :width="labelWidth"
      verticalAlignment="center"
      :text="labelText"
    />
    <TextField
      ref="textField"
      v-model="textFieldValue"
      class="TextForm__editable p-l-0 m-r-16"
      col="1"
      :width="textFieldWidth"
      verticalAlignment="center"
      borderColor="white"
      :isEnabled="isEnabled"
      :editable="isEditable"
      :keyboardType="keyboardType"
      :returnKeyType="returnKeyType"
      :maxLength="maxLengthText"
      :text="textFieldValue"
      @returnPress="onReturnPress"
      @textChange="onTextChange"
    />
  </GridLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

import { setVisibility } from '@/composables/useComponent'

export default Vue.extend({
  name: 'TextForm',
  props: {
    labelWidth: {
      type: [String, Number],
      default: 80,
    },
    labelText: {
      type: String,
      default: '',
    },
    textFieldWidth: {
      type: [String, Number],
      default: '100%',
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
    isEditable: {
      type: Boolean,
      default: true,
    },
    keyboardType: {
      type: String,
      default: 'url',
      validator: function (value) {
        // The value must match one of these strings
        return ['datetime', 'phone', 'number', 'url', 'email'].indexOf(value) !== -1
      },
    },
    returnKeyType: {
      type: String,
      default: 'done',
      validator: function (value) {
        // The value must match one of these strings
        return ['done', 'go', 'next', 'search', 'send'].indexOf(value) !== -1
      },
    },
    maxLengthText: {
      type: Number,
      default: 0,
    },
    isDismissedKeyboard: {
      type: Boolean,
      default: false,
    },
    isResetTextField: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      textFieldValue: null,
    }
  },

  computed: {},

  watch: {
    isDismissedKeyboard(newValue: boolean) {
      newValue ? this.reset() : console.log('TextForm::"The keyboard can be shown"')
    },

    isResetTextField(newValue: boolean, oldValue: boolean) {
      console.log(`TextForm::isResetTextField: ${this.isResetTextField}`)
      newValue ? (this.textFieldValue = null) : console.log('TextForm::"The TextField is empty"')
    },
  },

  mounted() {
    this.reset()
  },

  methods: {
    onReturnPress() {
      this.$emit('on-return-press', this.textFieldValue)
    },

    onTextChange() {
      console.log(`TextForm::"value: ${this.textFieldValue}"`)
    },

    reset() {
      console.log('TextForm::"TextForm reset()"')
      this.textFieldValue = null
      this.$refs.textField.nativeView.dismissSoftInput()
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.TextForm__label {
  font: {
    size: $font-sz-m;
    weight: 700;
  }
  color: $primary-variant;
}
.TextForm__editable {
  border-radius: 4;
  background-color: rgba($primary, 0.08);
  &[text] {
    padding-left: 8;
    color: $primary-variant;
    vertical-align: center;
    font-size: $font-sz-l;
  }
}
</style>
