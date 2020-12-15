<template>
  <StackLayout>
    <Label :text="item.id" />
  </StackLayout>
</template>
<script lang="ts">
  import Vue from 'nativescript-vue'
  export default {
    name:"LocationsCard",

    props: {
      item: {
        type: Object,
        default: {}
      }
    }
  }
</script>
