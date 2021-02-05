<template>
  <StackLayout class="color-list" orientation="horizontal" verticalAlignment="middle">
    <Label class="color-list_title" :text="title" :width="labelWidth" textWrap="true" />
    <StackLayout orientation="horizontal">
      <Label
        v-for="color in colors"
        :key="color.name"
        ref="colorItem"
        class="color-list_item"
        :backgroundColor="color.color"
        borderColor="#00251e"
        borderWidth="1"
        borderRadius="50%"
        @Tap="onTap(color)"
      />
    </StackLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { Color, Enums } from '@nativescript/core'

export default Vue.extend({
  name: 'ColorSelector',
  props: {
    labelWidth: {
      type: [String, Number],
      default: 80,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      colors: [
        { name: 'blue', color: '#31aec4' },
        { name: 'indigo', color: '#a191ff' },
        { name: 'violet', color: '#d17bff' },
        { name: 'orange', color: '#cc9633' },
        { name: 'red', color: '#ff765d' },
        { name: 'pink', color: '#ff6ea1' },
      ],
    }
  },
  methods: {
    onTap(color: { name: string; color: string }) {
      this.colorItemRipple
      this.$emit('on-selected-color', color.color)
      console.log(`color: ${color.name}`)
    },
    // FIXME: fix the color ripple animation, doesn't work
    colorItemRipple() {
      const colorItem = this.$refs.colorItem.nativeView
      const currentColor = colorItem.color
      const newColor = new Color(50, 0, 122, 122)
      colorItem
        .animate({
          curve: Enums.AnimationCurve.linear,
          duration: 500,
          color: newColor,
        })
        .then(() => {
          colorItem
            .animate({
              curve: colorItem.linear,
              duration: 500,
              color: currentColor,
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

.color-list_title {
  font-size: $font-sz-m;
  font-weight: 700;
  color: $primary-variant;
}

.color-list_item {
  margin-left: 12;
  width: 32;
  height: 32;
}
</style>
>
