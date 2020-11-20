<template>
  <StackLayout>
    <Label
      class="h2 text"
      text="Component Fake 2"
      textWrap="true"
    />
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

export default Vue.extend({
  name: 'ComponentTest2',
  created() {
    console.log('ComponentTest2::created()')
  },
  mounted() {
    console.log('ComponentTest2::mounted()')
  },
  beforeUpdate() {
    console.log('ComponentTest2::beforeUpdate()')
  },
  updated() {
    console.log('ComponentTest2::updated()')
  },
  beforeDestroy() {
    console.log('ComponentTest2::beforeDestroy()')
  },
  destroyed() {
    console.log('ComponentTest2::destroyed()')
  },
})
</script>

<style lang="scss" scoped>
.text {
  color: red;
}
</style>