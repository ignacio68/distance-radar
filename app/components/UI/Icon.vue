<template>
  <GridLayout
    class="Icon"
    rows="auto"
    columns="auto"
    :width="size"
    :height="size"
    horizontalAlignment="middle"
    verticalAlignment="middle"
    backgroundColor="transparent"
  >
    <Label
      ref="iconRipple"
      class="icon-ripple"
      col="0"
      row="0"
      :height="size"
      :width="size"
      borderRadius="50%"
      opacity="0"
      :backgroundColor="rippleColor"
    />
    <Image
      class="icon-image"
      col="0"
      row="0"
      :width="iconSize"
      :height="iconSize"
      backgroundColor="transparent"
      :src="name"
      :tintColor="iconColor"
      @tap="onTap"
    />
  </GridLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

import { EventData } from '@nativescript/core'
import { CoreTypes } from '@nativescript/core/ui/enums'

export default Vue.extend({
  name: 'Icon',
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: [String, Number],
      default: '48',
    },
    iconSize: {
      type: [String, Number],
      default: '24',
    },
    // iconBackgroundColor: {
    //   type: String,
    //   default: null,
    // },
    iconColor: {
      type: String,
      default: 'white',
    },
    rippleColor: {
      type: String,
      default: 'white',
    },
    rippleOpacity: {
      type: Number,
      default: 0.5,
    },
    rippleDuration: {
      type: Number,
      default: 300,
    },
    hasRipple: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    radioRipple(e: EventData): void {
      const iconRipple = this.$refs.iconRipple.nativeView
      iconRipple
        .animate({
          curve: CoreTypes.AnimationCurve.easeIn,
          duration: this.rippleDuration,
          opacity: this.rippleOpacity,
        })
        .then(() => {
          this.$emit('on-tap', e)
          iconRipple.animate({
            curve: CoreTypes.AnimationCurve.easeOut,
            duration: this.rippleDuration,
            opacity: 0.0,
          })
        })
    },

    onTap(e: EventData): void {
      this.radioRipple(e)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';
</style>
