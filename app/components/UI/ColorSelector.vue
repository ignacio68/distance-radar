<template>
  <StackLayout class="color-list" orientation="horizontal" verticalAlignment="middle">
    <Label class="color-list_title" :text="title" :width="labelWidth" textWrap="true" />
    <StackLayout orientation="horizontal">
      <MDRipple
        v-for="color in colors"
        :key="color.name"
        class="color-list_item"
        :backgroundColor="color.color"
        rippleColor="white"
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
      this.$emit('on-selected-color', color.color)
      console.log(`color: ${color.name}`)
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
