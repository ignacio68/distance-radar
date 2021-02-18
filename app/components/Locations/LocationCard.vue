<template>
  <StackLayout class="LocationCard">
    <GridLayout rows="auto, auto, auto">
      <GridLayout row="0" rows="*" columns="*, auto" class="m-l-8 m-r-8">
        <Label
          row="0"
          col="0"
          class="location-title pull-left"
          :text="item.id"
        />

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

      <GridLayout row="1" rows="auto, auto" class="location-coordinates m-l-8">
        <Label
          row="0"
          class="location-coordinates_title"
          :text="coordinatesTitle"
        />

        <StackLayout row="1" class="p-t-8 p-l-32">
          <Label class="location-coordinates-item" :text="item.lat" />
          <Label class="location-coordinates-item" :text="item.lng" />
        </StackLayout>
      </GridLayout>
    </GridLayout>
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import Icon from '@/components/UI/Icon.vue'

export default Vue.extend({
  name: 'LocationCard',

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
.location-title {
  font-size: $font-sz-l;
  font-weight: 700;
}

.location-coordinates_title {
  font-size: $font-sz-m;
  font-weight: 700;
}

.location-coordinates-item {
  font-size: $font-sz-m;
  font-weight: 400;
}
</style>
