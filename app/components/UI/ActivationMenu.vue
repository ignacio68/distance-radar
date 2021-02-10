<template>
  <StackLayout class="activation-menu">
    <StackLayout orientation="horizontal">
      <Label class="activation-menu_title" :text="activationText" textWrap="true" />
      <Switch
        class="activation-menu_switch"
        :checked="checked"
        v-model="itemEnabled"
        @checkedChange="onCheckedChange"
      />
    </StackLayout>
    <!-- TODO: Implement options -->
    <GridLayout rows="*, *" columns="*, *"></GridLayout>
  </StackLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

export default Vue.extend({
  name: 'ActivationMenu',
  props: {
    activationText: {
      type: String,
      default: '',
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      itemEnabled: false,
    }
  },
  methods: {
    onCheckedChange(): void {
      console.log(`ActivationMenu::onCheckedChange: ${this.itemEnabled}`)
      this.$emit('on-checked-change', this.itemEnabled)
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.activation-menu_title {
  font-size: $font-sz-m;
  font-weight: 700;
  color: $primary-variant;
}
</style>
