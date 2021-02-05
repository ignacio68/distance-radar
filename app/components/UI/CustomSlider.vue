<template>
  <GridLayout class="customSlider" columns="auto,*" :width="sliderWidth">
    <!-- <Icon
      col="0"
      class="customSlider_icon"
      :size="iconSize"
      :name="iconName"
      :iconColor="iconColor"
      :hasRipple="false"
    /> -->
    <StackLayout col="1">
      <Label class="customSlider_name" :text="sliderName" />
      <GridLayout columns="auto, *, auto" class="m-x-32 m-b-0">
        <Label col="0" color="black" class="customSlider_minValue" :text="minValue" />
        <StackLayout col="1" width="100%" color="red"></StackLayout>
        <Label col="2" class="customSlider_maxValue" :text="maxValue" />
      </GridLayout>
      <MDSlider
        :value="value"
        col="0"
        row="0"
        colSpan="3"
        class="customSlider_slider m-x-32 m-t-0"
        :minValue="minValue"
        :maxValue="maxValue"
        :thumbHollowAtStart="thumbHollowAtStart"
        :thumbColor="thumbColor"
        :rippleColor="rippleColor"
        :elevation="elevation"
        @valueChange="onValueChanged"
      />
    </StackLayout>
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import Icon from '@/components/UI/Icon.vue'

import '@/plugins/installMDSlider'

export default Vue.extend({
  name: 'CustomSlider',
  components: { Icon },
  props: {
    // Icon.$props,
    sliderWidth: {
      type: [String, Number],
      default: '100%',
    },

    iconName: {
      type: String,
      default: '',
    },
    iconSize: {
      type: [String, Number],
      default: '48',
    },
    iconColor: {
      type: String,
      default: 'black',
    },
    rippleColor: {
      type: String,
      required: false,
    },

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
    elevation: {
      type: [String, Number],
      default: '5',
    },
    thumbHollowAtStart: {
      type: Boolean,
      default: false,
      required: false,
    },
    thumbColor: {
      type: String,
      required: false,
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
    onValueChanged({ value }) {
      this.$emit('on-value-changed', value)
      console.log(`CustomSlider::onValueChanged():value: ${value}`)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables.scss';

.customSlider_name {
  padding {
    right: 8;
  }
  font-size: $font-sz-m;
  font-weight: 700;
  color: $primary-variant;
}
.customSlider_icon {
  vertical-align: bottom;
}
.customSlider_minValue {
  padding {
    left: 24;
  }
  font-size: $font-sz-s;
  text-align: left;
  color: $primary;
}
.customSlider_maxValue {
  padding {
    right: 24;
  }
  font-size: $font-sz-s;
  text-align: right;
  color: $primary;
}
</style>
