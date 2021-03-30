<template>
  <StackLayout class="CustomSlider">
    <GridLayout columns="auto, auto, auto">
      <Label class="CustomSlider__name p-t-16" col="0" :text="sliderName" />
      <TextField
        ref="textField"
        class="CustomSlider__textField p-l-32"
        col="1"
        :width="textFieldWidth"
        verticalAlignment="center"
        borderColor="white"
        :isEnabled="true"
        :editable="false"
        keyboardType="number"
        returnKeyType="done"
        :maxLength="4"
        :text="value"
      />
      <Label
        v-if="isVisibleUnitsLabel"
        class="CustomSlider__units p-t-16 m-l-0"
        col="2"
        :text="units"
      />
    </GridLayout>
    <GridLayout columns="auto, *, auto" class="m-x-32 m-b-0">
      <Label col="0" color="black" class="CustomSlider__minValue" :text="minValue" />
      <StackLayout col="1" width="100%" color="red"></StackLayout>
      <Label col="2" class="CustomSlider__maxValue" :text="maxValue" />
    </GridLayout>
    <MDSlider
      :value="value"
      col="0"
      row="0"
      colSpan="3"
      class="CustomSlider__slider m-x-32 m-t-0"
      :minValue="minValue"
      :maxValue="maxValue"
      :thumbHollowAtStart="thumbHollowAtStart"
      :thumbColor="thumbColor"
      :rippleColor="rippleColor"
      :elevation="elevation"
      @valueChange="onValueChanged"
    />
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

export default Vue.extend({
  name: 'CustomSlider',

  props: {
    sliderName: {
      type: String,
      default: '',
    },
    textFieldWidth: {
      type: [String, Number],
      default: '100%',
    },
    isVisibleUnitsLabel: {
      type: Boolean,
      default: true,
    },
    units: {
      type: String,
      default: '',
    },
    rippleColor: {
      type: String,
      required: false,
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 1,
    },
    elevation: {
      type: [String, Number],
      default: '5',
    },
    thumbHollowAtStart: {
      type: Boolean,
      default: false,
      required: false,
    },
    thumbColor: {
      type: String,
      required: false,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  methods: {
    onReturnPress() {
      this.$emit('on-return-press', this.textFieldValue)
    },

    onTextChange() {
      console.log(`TextForm::"value: ${this.textFieldValue}"`)
    },

    onValueChanged({ value }) {
      this.$emit('on-value-changed', value)
      console.log(`CustomSlider::onValueChanged():value: ${value}`)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables.scss';

.CustomSlider__name {
  padding {
    right: 8;
  }
  font-size: $font-sz-m;
  font-weight: 700;
  color: $primary-variant;
}
.CustomSlider__units {
  font-size: $font-sz-m;
  font-weight: 400;
  color: $primary-variant;
}
.CustomSlider__textField {
  border-radius: 4;
  background-color: rgba($primary, 0.08);
  &[text] {
    padding-left: 8;
    color: $primary-variant;
    vertical-align: center;
    font-size: $font-sz-m;
  }
}
.CustomSlider__minValue {
  padding {
    left: 24;
  }
  font-size: $font-sz-s;
  text-align: left;
  color: $primary;
}
.CustomSlider__maxValue {
  padding {
    right: 24;
  }
  font-size: $font-sz-s;
  text-align: right;
  color: $primary;
}
</style>
