<template>
  <StackLayout
    class="DrawerHeader"
    width="100%"
    horizontalAlignment="center"
  >
    <Label
      class="nt-drawer__header-brand"
      :text="text"
    />
  </StackLayout>
</template>

<script lang="ts">
  export default {
    name:"DrawerHeader",

    props: {
      text: {
        type: String,
        default: null,
      }
    }
  }
</script>

<style scoped lang="scss">
</style>