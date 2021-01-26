<template>
  <GridLayout
    id="Geocoder"
    rows="auto, auto"
    :width="width"
    backgroundColor="white"
    :borderWidth="borderWidth"
    :borderColor="borderColor"
    :borderRadius="borderRadius"
  >
    <CustomSearchBar
      row="0"
      :iconColor="iconColor"
      :textColor="searchBarFontColor"
      :textFontSize="16"
      :hint="hint"
      :isListViewVisible="isListViewVisible"
      @on-text-change="onTextChange"
      @on-clear="onClear"
    />
    <ListView
      id="geocoder-list"
      ref="locations-list"
      row="1"
      :borderRadius="borderRadius"
      backgroundColor="transparent"
      :height="listViewHeight"
      :separatorColor="listViewBackgroundColor"
      for="location in locationsList"
      @itemTap="onItemTap"
    >
      <v-template>
        <LocationItem
          class="locations-list-item"
          :item="location"
          listItemBackgroundColor="transparent"
          :itemFontSize="itemFontSize"
          :itemTitleFontColor="itemTitleFontColor"
          :itemTextFontColor="itemTextFontColor"
          :borderRadius="borderRadius"
        />
      </v-template>
    </ListView>
  </GridLayout>
</template>

<script script lang="ts">
  import Vue from 'nativescript-vue'

  // import { setInterval, clearInterval } from '@nativescript/core/timer'
  import { Utils } from '@nativescript/core'

  import { getLocations } from '@/api/geocoder'

  import CustomSearchBar from './CustomSearchBar.vue'
  import LocationItem from './LocationItem.vue'

  export default Vue.extend({
    name: "Geocoder",

    components: {
      CustomSearchBar,
      LocationItem,
    },

    props: {
      borderRadius: {
        type: [String, Number],
        default: 16
      },
      borderWidth: {
        type: [String, Number],
        default: 1
      },
      borderColor: {
        type: String,
        default: "black"
      },
      width: {
        type: [String, Number],
        default: 200
      },
      hint: {
        type: String,
        default: "Search..."
      },
      searchbarBackGroundColor: {
        type: String,
        default: "white"
      },
      searchBarFontColor: {
        type: String,
        default: "black"
      },
      textFieldHintColor: {
        type: String,
        default: "black"
      },
      textFieldBackgroundColor: {
        type: String,
        default: "ghostwhite"
      },
      iconColor: {
        type: String,
        default: "black"
      },
      minimumCharactersToSearch: {
        type: Number,
        default: 3
      },
      interval: {
        type: Number,
        default: 1000
      },
      listViewBackgroundColor: {
        type:String,
        default: "white"
      },
      itemFontSize: {
        type: Number,
        default: 16
      },
      itemTitleFontColor: {
        type: String,
        default: "black"
      },
      itemTextFontColor: {
        type: String,
        default: "black"
      },
    },

    data(){
      return {
        searchedLocation: '',
        oldSearchedLocation: '',
        locationsList: [],
      }
    },

    computed: {
      listViewHeight() {
        return !!this.locationsList && this.locationsList.length > 0 ? (( this.locationsList.length * 64 ) + this.borderRadius ) : 0
      },

      isListViewVisible() {
        return this.listViewHeight ? true : false
      },
    },

    watch: {
      searchedLocation(): void {
        if (this.searchedLocation.length >= this.minimumCharactersToSearch)
        {
          this.loadSearch()
          console.log(`locationsList: ${JSON.stringify(this.locationsList)}`)
        }
      },
    },

    mounted() {
      this.resetLocationList()
    },

    methods: {

      setOldSearchedLocation() {
        this.oldSearchedLocation = this.searchedLocation
      },

      async fetchLocationsList() {
        console.log('fetchLocationsList()')
        const searchLocationsResult: any = await getLocations(this.searchedLocation)
        if(searchLocationsResult.length > 0) this.locationsList = searchLocationsResult
      },

      resetSearchBar() {
        this.searchedLocation = ""
      },

      resetLocationList() {
        this.locationsList = []
      },

      loadSearch() {
        console.log('loadsearch()')
        const vm: any = this // TODO: Add true type
        const search = Utils.setInterval(() => {
          if(vm.searchedLocation !== vm.oldSearchedLocation) {
            vm.setOldSearchedLocation()
            vm.fetchLocationsList()
            if (vm.searchedLocation.length < vm.minimumCharactersToSearch) Utils.clearInterval(search)
          }
        }, vm.interval)
      },

      onClear() {
        this.resetSearchBar()
        this.resetLocationList()
        this.$emit('on-hide-geocoder')
      },

      onTextChange(string: string) {
        console.log(`onTextChange: ${string}`)
        this.searchedLocation = string
      },
      // onTextChange(e) {
      //   console.log(`onTextChange: ${e.value}`)
      //   this.$emit('on-text-change', e)
      // },

      onItemTap(args) { // TODO: Add true type
        this.$emit('on-location-selected', args.item)
        this.onClear()
      }
    }
  })
</script>

<style lang="scss" scoped>
  // @import '../../app-variables';
</style>