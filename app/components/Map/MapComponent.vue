<template>
  <GridLayout
    columns="*, auto"
    rows="*"
    class="map"
    horizontalAlignment="right"
  >
    <MapBox
      ref="map"
      row="0"
      col="0"
      colSpan="2"
      left="0"
      top="0"
      width="100%"
      height="100%"
      :accessToken="mapToken"
      :mapStyle="mapStyle"
      :latitude="userLatitude"
      :longitude="userLongitude"
      :zoomLevel="zoomLevel"
      :hideCompass="true"
      :disableRotation="true"
      :disableScroll="false"
      :disableZoom="false"
      :showUserLocation="true"
      @mapReady="onMapReady"
      @mapLongClickListener="onTap"
    />
    <GridLayout
      class="right-menu"
      rows="*, auto"
      columns="auto"
      row="0"
      col="1"
    >
      <StackLayout
        id="geocoder-wrapper"
        row="0"
        backgroundColor="transparent"
      >
        <Geocoder
          v-if="isVisibleGeocoder"
          class="geocoder m-16"
          :width="300"
          :borderRadius="16"
          :borderWidth="1"
          borderColor="#fc726c"
          searchBarFontColor="black"
          searchBarBackgroundColor="green"
          textFieldHintColor="gray"
          listViewBackgroundColor="white"
          textFieldBackgroundColor="ghostwhite"
          :itemFontSize="16"
          :maxLengthText="360"
          :hint="$t('lang.components.geocoder.hint')"
          @on-location-selected="onLocationSelected"
        />
      </StackLayout>
      <GridLayout
        id="buttons-wrapper"
        horizontalAlignment="right"
        row="1"
        rows="auto, auto"
        col="auto"
        backgroundColor="transparent"
      >
        <MDFloatingActionButton
          ref="locationFAB"
          row="0"
          class="fab location_fab m-b-32 m-r-16"
          rippleColor="white"
          :elevation="elevationFAB"
          src="res://ic_my_location_white_24dp"
          @tap="centerCamera"
        />

        <MDFloatingActionButton
          ref="mapStyle"
          row="2"
          class="fab map-style_fab m-r-16 "
          rippleColor="white"
          :elevation="elevationFAB"
          src="res://ic_map_white_24dp"
          @tap="changeMapStyle"
        />
      </GridLayout>
    </GridLayout>
  </GridLayout>
</template>

<script lang="ts">
  import Vue from 'nativescript-vue'

  import { setCenter, flyTo } from '@/api/map'

  import { getVisibility, setVisibility } from '@/composables/useComponent'

  import { setMap, getMap as map } from '@/store/mapStore'

  import { Elevation } from '@/types/enums/elevations'

  import { Location, Coordinates, GeocodingCoordinates } from '@/types/types'

  import '@/plugins/installFAB'
  import Geocoder from '@/components/Geocoder/Geocoder.vue'

  export default Vue.extend({
    name: 'MapComponent',
    components: {
      Geocoder,
    },
    props: {
      mapToken: {
        type: String,
        default: ""
      },
      zoomLevel: {
        type: Number,
        default: 15
      },
      userLatitude: {
        type: String,
        default: null
      },
      userLongitude: {
        type: String,
        default: null
      },
    },

    data() {
      return {
        customMapStyle: 'mapbox://styles/ignacio68/ckay3bxbr11qt1hquzxx1ohot',
        satelliteMapStyle: 'satellite_streets',
        defaultMapStyle: 'traffic_day',
        isSatelliteMap: false,
        elevationFAB: Elevation.FAB_RESTING,
      }
    },

    computed:{
      mapStyle(): Promise<string> {
        return this.customMapStyle ? this.customMapStyle : this.defaultMapStyle
      },

      isVisibleGeocoder(): boolean {
        return getVisibility('geocoder')
      },
    },

    methods: {
      onMapReady(args: any) {
        console.log('MAP READY!')
        setMap(args.map)
        this.$emit('on-map-ready', args)
      },

      onTap() {
        console.log('onTap()')
      },

      centerCamera() {
        console.log('centerCamera()')
        setCenter()
        this.$emit('on-set-center')
      },

      flyTo(location: Coordinates) {
        console.log('flyTo()')
        flyTo(location)
      },

      updateCoordinates(location: Location): Coordinates {
        const {latitude: lat, longitude: lng} = location
        const newCoordinates: Coordinates = {
          lat: lat,
          lng: lng
        }
        return newCoordinates
      },

      onLocationSelected(location: [Location]){
        console.log(`onLocationSelected: ${JSON.stringify(location)}`)
        setVisibility('geocoder', false)
        const updatedCoordinates: Coordinates = this.updateCoordinates(location)
        const options = {
          id: '_user',
          coordinates: updatedCoordinates
        }
        this.$emit('on-marker-updated', options)
        this.flyTo(updatedCoordinates)
      },

      changeMapStyle() {
        this.isSatelliteMap = !this.isSatelliteMap
        this.isSatelliteMap ? map().setMapStyle(this.satelliteMapStyle) : map().setMapStyle(this.mapStyle)
      },
    }
  })
</script>

<style lang="scss" scoped>
  @import '../../app-variables';

  .right-menu {
    background-color: transparent;
  }
  .fab{
    background-color: $background;
    color:$secondary;
    horizontal-align:  right;
  }
  .map-style_fab{
    margin-bottom: 192;
  }
</style>
