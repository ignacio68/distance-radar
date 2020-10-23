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

  import { setInterval, clearInterval } from '@nativescript/core/timer'
  // import * as geocoding from 'nativescript-geocoding'

  import { searchLocations } from '@/services/geocodingService'

  import { Location } from '@/services/types'

  import CustomSearchBar from './CustomSearchBar.vue'
  import LocationItem from './LocationItem.vue'

  export default({
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

      setOldSearchedLocation(): void {
        this.oldSearchedLocation = this.searchedLocation
      },

      async fetchLocationsList() {
        console.log('fetchLocationsList()')
        let searchLocationsResult
        searchLocationsResult = await searchLocations(this.searchedLocation)
        if(searchLocationsResult.length > 0) this.locationsList = searchLocationsResult
      },

      resetSearchBar(): void {
        this.searchedLocation = ""
      },

      resetLocationList(): void {
        this.locationsList = []
      },

      loadSearch(): void {
        console.log('loadsearch()')
        const vm: any = this
        let search: number = setInterval(() => {
          if(vm.searchedLocation !== vm.oldSearchedLocation) {
            vm.setOldSearchedLocation()
            vm.fetchLocationsList()
            if (vm.searchedLocation.length < vm.minimumCharactersToSearch) clearInterval(search)
          }
        }, vm.interval)
      },

      onClear(): void {
        this.resetSearchBar()
        this.resetLocationList()
        this.$emit('on-hide-geocoder')
      },

      onTextChange(string): void {
        console.log(`onTextChange: ${string}`)
        this.searchedLocation = string
      },
      // onTextChange(e) {
      //   console.log(`onTextChange: ${e.value}`)
      //   this.$emit('on-text-change', e)
      // },

      onItemTap(args): void {
        this.$emit('on-location-selected', args.item)
        this.onClear()
      }
    }
  })
</script>

<style lang="scss" scoped>
  // @import '../../app-variables';
</style>