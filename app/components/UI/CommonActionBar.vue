<template>
   <GridLayout
    class="action-bar"
    verticalAlignment="middle"
    height="56"
    width="100%"
    columns="48, *"
  >
    <Icon
      col="0"
      class="action-bar_back-button"
      name="res://ic_arrow_back_white_24dp"
      :rippleDuration="300"
      :rippleOpacity="0.2"
      @on-tap="onTap"
    />
    <Label
      col="1"
      class="action-bar_title"
      verticalAlignment="middle"
      :text="title"
    />
   </GridLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'

import Icon from './Icon.vue'

export default Vue.extend({
  name: 'CommonActionBar',

  components: { Icon },

  props: {
    title: {
      type: String,
      default: '',
    }
  },

  methods: {
    onTap() {
      this.$emit('on-tap')
    }
  }
})
</script>
<style lang="scss" scoped>
   @import '../../app-variables';

  .action-bar_back-button {
    margin-left: 4;
  }

  .action-bar_title {
    margin-left: 20;
    font-weight: 700;
    font-size: $font-sz-l;
    background-color: $primary-variant;
    color: $onPrimary;
  }

</style>