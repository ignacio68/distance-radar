<template>
  <GridLayout
    class="TextForm"
    rows="*"
    columns="auto, auto"
  >
    <Label
      class="TextForm_label"
      col="0"
      :width="labelWidth"
      verticalAlignment="center"
      :text="labelText"
    />
    <TextField
      ref="textField"
      v-model="textFieldValue"
      class="TextForm_editable p-l-0 m-r-16"
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

import { getVisibility, setVisibility } from '@/composables/useComponent'

export default Vue.extend({
  name: "TextForm",
  props: {
    labelWidth: {
      type: [String, Number],
      default: 80
    },
    labelText: {
      type: String,
      default: ''
    },
    textFieldWidth: {
      type: [String, Number],
      default: "100%"
    },
    isEnabled: {
      type: Boolean,
      default: true
    },
    isEditable: {
      type: Boolean,
      default: true
    },
    keyboardType: {
      type: String,
      default: 'url',
      validator: function(value) {
        // The value must match one of these strings
        return (
          ['datetime', 'phone', 'number', 'url', 'email'].indexOf(value) !== -1
        )
      }
    },
    returnKeyType: {
      type: String,
      default: "done",
      validator: function(value) {
        // The value must match one of these strings
        return ['done', 'go', 'next', 'search', 'send'].indexOf(value) !== -1
      }
    },
    maxLengthText: {
      type: Number,
      default: 0
    },
    dismissKeyboard: {
      type: Boolean,
      default: false
    }
  },
  data(){
   return{
     textFieldValue: null,
   }
  },

  watch: {
    dismissKeyboard(newValue: boolean) {
      newValue ? this.reset() : console.log('The keyboard can be shown')
    }
  },

  mounted() {
    this.reset()
  },

  methods: {
    onReturnPress() {
      this.$emit('on-return-press', this.textFieldValue)
    },

    onTextChange() {
      console.log(`value: ${this.textFieldValue}`)
    },

    reset() {
      console.log('TextForm reset()')
      this.textFieldValue = null
      this.$refs.textField.nativeView.dismissSoftInput()
    },
  }
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.TextForm_label {
  color: $primary-dark;
  font-size: $font-sz-m;
}
.TextForm_editable {
  border-radius: 4;
  background-color: rgba($primary, .08);
  &[text] {
    padding-left: 8;
    color: $primary-variant;
    vertical-align: center;
    font-size: $font-sz-l;
  }
}
</style>