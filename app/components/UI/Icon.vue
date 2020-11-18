<template>
  <StackLayout
    class="Icon"
    :width="size"
    :height="size"
    horizontalAlignment="middle"
    verticalAlignment="middle"
    backgroundColor="transparent"
  >
    <GridLayout
      class="icon_wrapper"
      rows="auto"
      columns="auto"
      backgroundColor="transparent"
    >
      <Label
        ref="iconRipple"
        class="icon_ripple"
        col="0"
        row="0"
        height="48"
        width="48"
        borderRadius="50%"
        opacity="0"
        :color="rippleColor"
      />
      <Image
        class="icon_image"
        col="0"
        row="0"
        width="24"
        height="24"
        color="iconColor"
        :src="name"
        :tintColor="iconColor"
        @tap="onTap"
      />
    </GridLayout>
  </StackLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

// const AnimationCurve = require('tns-core-modules/ui/enums').AnimationCurve
import { AnimationCurve } from '@nativescript/core/ui/enums'

export default Vue.extend ({
  name: "Icon",
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: '48'
    },
    iconColor: {
      type: String,
      default: "white"
    },
    rippleColor: {
      type: String,
      default: "white"
    },
    rippleOpacity: {
      type: Number,
      default: 0.5
    },
    rippleDuration: {
      type: Number,
      default: 300
    }
  },
  methods: {
    onTap(e) {
      this.$emit('on-tap', e)
      this.radioRipple()
    },
    radioRipple() {
      const iconRipple = this.$refs.iconRipple.nativeView
      iconRipple
        .animate({
          curve: AnimationCurve.easeIn,
          duration: this.rippleDuration,
          opacity: this.rippleOpacity
        })
        .then(() => {
          iconRipple
            .animate({
              curve: AnimationCurve.easeIn,
              duration: this.rippleDuration,
              opacity: 0.0
            })
            .then(() => {})
        })
        .catch(() => {})
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.icon_ripple {
  background-color: $accent;
}
.icon_image {
  color: white;
}
</style>
