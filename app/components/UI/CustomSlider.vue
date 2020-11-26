<template>
  <GridLayout
    class="customSlider"
    columns="100,*"
    color="black"
  >
    <Label
      col="0"
      class="customSlider_name"
      :text="sliderName"
    />
    <GridLayout
      col="1"
      rows="auto, auto"
      columns="100, *, 100"
    >
      <MDSlider
        :value="value"
        col="0"
        row="0"
        colSpan="3"
        class="customSlider_slider"
        :minValue="minValue"
        :maxValue="maxValue"
        @valueChange="onValueChanged"
      />
      <Label
        col="0"
        row="1"
        class="customSlider_minValue"
        :text="minValue"
      />
      <Label
        col="2"
        row="1"
        class="customSlider_maxValue"
        :text="maxValue"
      />
    </GridLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import '@/plugins/installMDSlider'

export default Vue.extend({
  name: 'CustomSlider',
  props: {
    sliderName: {
      type: String,
      default: '',
    },
    minValue: {
      type: Number,
      default: 0,
    },
    maxValue: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // value: 0
    }
  },
  methods: {
    onValueChanged({value}) {
      this.$emit('on-value-changed', value)
      console.log(`CustomSlider::onValueChanged():value: ${value}`)
    }
  }
})
</script>

<style lang="scss" scoped>
  @import '../../app-variables.scss';

  .customSlider_name {
    padding {
      right: 8;
    }
    font-size: $font-sz-m;
  }
  .customSlider_minValue {
    padding {
      left: 24;
    }
    font-size: $font-sz-m;
    text-align: left;
  }
  .customSlider_maxValue {
    padding {
      right: 24;
    }
    font-size: $font-sz-m;
    text-align: right;
  }
</style>
