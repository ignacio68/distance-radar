<template>
  <StackLayout class="SecurityAreaCard">
    <GridLayout row="0" rows="*" columns="*, auto" class="m-l-8 m-r-8">
      <Label row="0" col="0" class="security-area-title pull-left" :text="item.id" />

      <Icon
        row="0"
        col="1"
        class="action-bar_back-button pull-right m-y-4"
        name="res://ic_delete_forever_black_24dp"
        :size="56"
        iconColor="#e2192a"
        rippleColor="#e2192a"
        :rippleDuration="300"
        :rippleOpacity="0.2"
        @on-tap="onTap"
      />
    </GridLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import Icon from '@/components/UI/Icon.vue'

export default Vue.extend({
  name: 'SecurityAreaCard',

  components: {
    Icon,
  },

  props: {
    item: {
      type: Object,
      default: {},
    },
    coordinatesTitle: {
      type: String,
      default: null,
    },
  },

  data() {
    return {}
  },

  methods: {
    onTap() {
      this.$emit('on-tap')
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

* {
  background-color: $surface-light;
  color: $primary-dark;
}
.security-area-title {
  font-size: $font-sz-l;
  font-weight: 700;
}

.security-area-coordinates_title {
  font-size: $font-sz-m;
  font-weight: 700;
}

.security-area-coordinates-item {
  font-size: $font-sz-m;
  font-weight: 400;
}
</style>
