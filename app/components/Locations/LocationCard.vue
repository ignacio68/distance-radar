<template>
  <StackLayout>
    <GridLayout rows="auto, auto">
      <GridLayout
        row="0"
        rows="56"
        columns="*, auto"
      >
        <Label
          row="0"
          col="0"
          class="pull-left m-l-16"
          :text="item.id"
        />
        <Icon
          row="0"
          col="1"
          class="action-bar_back-button pull-right m-y-4 m-r-16"
          name="res://ic_delete_forever_black_24dp"
          :size="56"
          iconColor="#e2192a"
          rippleColor="#e2192a"
          :rippleDuration="300"
          :rippleOpacity="0.2"
          @on-tap="onTap"
        />
      </GridLayout>
      <StackLayout row="1">
        <Label :text="item.lat" />
        <Label :text="item.lng" />
      </StackLayout>
    </GridLayout>
  </StackLayout>
</template>
<script lang="ts">
  import Vue from 'nativescript-vue'

  import { confirmDeleteLocation } from '@/components/Dialogs/ConfirmDeleteLocation'

  import { ConfirmOptions } from '@nativescript/core'

  import Icon from '@/components/UI/Icon.vue'

  export default Vue.extend({
    name:"LocationCard",

    components: { Icon },

    props: {
      item: {
        type: Object,
        default: {}
      }
    },

    methods: {
      onTap() {
        this.$emit('on-tap')
      },
    }
  })
</script>
