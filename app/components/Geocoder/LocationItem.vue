<template>
  <GridLayout
    class="item-wrapper"
    rows="28, 36"
    height="64"
    fontSize="16"
    :backgroundColor="listItemBackgroundColor"
  >
    <Label
      class="item-title"
      row="0"
      :fontSize="itemFontSize"
      :color="itemTitleFontColor"
      :text="itemTitle(item)"
      :backgroundColor="listItemBackgroundColor"
    />
    <Label
      class="item-text"
      row="1"
      :fontSize="itemFontSize"
      :color="itemTextFontColor"
      :text="resultText(item)"
      :backgroundColor="listItemBackgroundColor"
    />
  </GridLayout>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue'

  import { formattedLocation } from '@/api/geocoder'
  // import { getShortLocationString } from '@/utils/text'

  export default Vue.extend({
    name: "LocationItem",

    props: {
      item: {
        type: Object,
        default: () => {}
      },
      listItemBackgroundColor: {
        type: String,
        default: "transparent"
      },
      itemFontSize: {
        type: [String, Number],
        default:"16"
      },
      itemTitleFontColor: {
        type: String,
        default: "black"
      },
      itemTextFontColor: {
        type: String,
        default: "black"
      }
    },

    data() {
      return {

      }
    },

    methods: {
      itemTitle(item): string {
        return item.subThoroughfare ? item.thoroughfare : item.name
      },
      resultText(item): string {
        return formattedLocation(item)
      }
    }
  })
</script>

<style lang="scss" scoped>
  .item-title {
    font-weight: bold;
    padding-bottom: 4;
    padding-left: 16;
  }
  .item-text {
    padding: {
      bottom: 8;
      left: 16;
      right: 16;
    }
  }
</style>