<template>
  <StackLayout class="DrawerItem">
    <Label :text="text" @tap="$emit('on-tap')" />
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

export default Vue.extend({
  name: 'DrawerItem',

  props: {
    text: {
      type: String,
      default: '',
    },
  },
})
</script>

<style scoped lang="scss"></style>
