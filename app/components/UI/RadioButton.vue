<template>
  <StackLayout
    ref="radioButtonWrap"
    class="radio-btn"
    :orientation="orientation"
    @tap="onTap"
  >
    <GridLayout class="radio-btn__radio" columns="auto" rows="auto">
      <Label
        ref="radioRipple"
        class="radio-btn__radio-ripple"
        col="0"
        row="0"
        :height="radioRippleSize"
        :width="radioRippleSize"
        borderRadius="50%"
        borderWidth="6"
        :borderColor="unCheckedColor"
        backgroundColor="transparent"
        opacity="0"
      />
      <Label
        ref="radioOuter"
        class="radio-btn__radio-outer"
        col="0"
        row="0"
        :height="radioSize"
        :width="radioSize"
        borderRadius="50%"
        borderWidth="2"
        :borderColor="unCheckedColor"
        backgroundColor="transparent"
      />
      <Label
        ref="radioInner"
        class="radio-btn__radio-inner"
        col="0"
        row="0"
        borderRadius="50%"
        :height="radioInnerSize"
        :width="radioInnerSize"
        :backgroundColor="unCheckedColor"
        opacity="0"
      />
    </GridLayout>
    <Label
      ref="radioText"
      class="radio-btn__label p-x-8"
      :text="text"
      :fontSize="fontSize"
      :color="textColor"
      textWrap="true"
      verticalAlignment="middle"
    />
  </StackLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

import { Color } from '@nativescript/core'
import { isColor } from '@/utils/commons'
import { AnimationCurve } from '@nativescript/core/ui/enums'

export default Vue.extend({
  name: 'RadioButton',
  props: {
    orientation: {
      type: String,
      default: 'horizontal',
      validator: (prop) => ['horizontal', 'vertical'].includes(prop),
    },
    text: {
      type: String,
      default: null,
    },
    isEnabled: {
      type: Boolean,
      default: false,
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
    disabledColor: {
      type: String,
      default: '#ebebeb',
      validator: (color) => isColor(color),
    },
    checkedColor: {
      type: String,
      default: 'orange',
      validator: (color) => isColor(color),
    },
    unCheckedColor: {
      type: String,
      default: 'teal',
      validator: (color) => isColor(color),
    },
    textColor: {
      type: String,
      default: '#2c2c2c',
      validator: (color) => isColor(color),
    },
    fontSize: {
      type: String,
      default: '16',
    },
    radioSize: {
      type: Number,
      default: 24,
    },
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      lastColor: this.unCheckedColor,
    }
  },

  computed: {
    radioRippleSize() {
      return this.radioSize + 12
    },

    radioInnerSize() {
      return this.radioSize - 12
    },

    radioRipple() {
      return this.$refs.radioRipple.nativeView
    },

    radioOuter() {
      return this.$refs.radioOuter.nativeView
    },

    radioInner() {
      return this.$refs.radioInner.nativeView
    },

    radioText() {
      return this.$refs.radioText.nativeView
    },
  },

  watch: {
    isChecked: {
      immediate: true,
      handler(newValue: boolean, oldValue: boolean) {
        console.log(`isChecked is: ${this.isChecked}`)
        this.$nextTick(() =>
          newValue
            ? this.setCheckedColor(this.checkedColor, 1)
            : this.setCheckedColor(this.unCheckedColor, 0),
        )
      },
    },
    isEnabled: {
      immediate: true,
      handler(newValue: boolean, oldValue: boolean) {
        console.log(`isEnabled is: ${this.isEnabled}`)
        this.$nextTick(() =>
          newValue
            ? this.setEnabledColor(this.lastColor, this.textColor)
            : this.setEnabledColor(this.disabledColor, this.disabledColor),
        )
      },
    },
  },

  mounted() {
    console.log(`RadioButton::mounted::isEnabled: ${this.isEnabled}`)
    if (this.enabled) {
      if (this.isChecked) this.setCheckedColor(this.checkedColor, 1)
      else this.setCheckedColor(this.unCheckedColor, 0)
    } else this.setEnabledColor(this.disabledColor, this.disabledColor)
  },

  methods: {
    setEnabledColor(color: string, textColor: string) {
      this.changeColor(color)
      this.radioText.color = new Color(textColor)
    },

    setCheckedColor(color: string, opacity: number) {
      this.changeColor(color)
      this.radioInner.opacity = opacity
      this.lastColor = color
    },

    changeColor(color: string) {
      this.radioRipple.borderColor = new Color(color)
      this.radioOuter.borderColor = new Color(color)
      this.radioInner.backgroundColor = new Color(color)
    },

    onRadioRipple() {
      this.radioRipple
        .animate(this.animationOptions(AnimationCurve.linear, 100, 0.4))
        .then(() => {
          this.radioRipple
            .animate(this.animationOptions(AnimationCurve.linear, 100, 0.0))
            .then(() => {})
        })
        .catch(() => {})
    },

    animationOptions(curve: any, duration: number, opacity: number) {
      const options = {
        curve,
        duration,
        opacity,
      }
      return options
    },

    onTap() {
      if (this.isEnabled) {
        console.log('You have tapped the radio button')
        this.onRadioRipple()
        this.$emit('on-item-selected')
      }
      return
    },
  },
})
</script>

<style lang="scss" scoped>
.radio-btn {
  &__radio {
    &-outer {
    }
    &-inner {
    }
    &-ripple {
    }
  }
  &__label {
  }
}
</style>
