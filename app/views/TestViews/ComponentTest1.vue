<template>
  <StackLayout>
    <Label
      class="h2 text"
      text="Component Fake 1"
      textWrap="true"
    />
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

export default Vue.extend({
  name: 'ComponentTest1',
  created() {
    console.log('ComponentTest1::created()')
  },
  mounted() {
    console.log('ComponentTest1::mounted()')
  },
  beforeUpdate() {
    console.log('ComponentTest1::beforeUpdate()')
  },
  updated() {
    console.log('ComponentTest1::updated()')
  },
  beforeDestroy() {
    console.log('ComponentTest1::beforeDestroy()')
  },
  destroyed() {
    console.log('ComponentTest1::destroyed()')
  },
})
</script>

<style lang="scss" scoped>
.text {
  color: lime;
}
</style>