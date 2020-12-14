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
      :latitude="initialCoordinates.lat"
      :longitude="initialCoordinates.lng"
      :zoomLevel="15"
      :hideCompass="true"
      :disableRotation="true"
      :disableScroll="false"
      :disableZoom="false"
      :showUserLocation="true"
      @mapReady="onMapReady"
    />
    <GridLayout
      class="right-menu"
      rows="*, auto"
      columns="auto"
      row="0"
      col="1"
    >
    <!-- TODO: Add animation -->
      <LocationsList
        v-if="isVisibleLocationsList"
        id="LocationsList"
        class="pull-right m-r-16"
        width="100"
        labelHeight="48"
        verticalAlignment="top"
        row="0"
      />
    <!------------------------->
      <Geocoder
        v-if="isVisibleGeocoder"
        class="geocoder m-16"
        verticalAlignment="top"
        row="0"
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

  import { mapToken } from '@/setup/map'

  import { setCenter, addMarkers, flyTo } from '@/api/map'
  import { updateUserMarker } from '@/api/userMarker'

  import { getVisibility, setVisibility } from '@/composables/useComponent'

  import { getInitialLocation as initialLocation } from '@/store/userLocationStore'
  import { setMap, getMap as map } from '@/store/mapStore'
  import { numberOfLocations } from '@/store/locationsStore'

  import { Elevation } from '@/types/enums/elevations'
  import { LngLat } from '@/types/types'
  import { Location } from '@/types/types/geocoder'

  import { MapStyle } from '@nstudio/nativescript-mapbox'

  import '@/plugins/installMapbox'
  import '@/plugins/installFAB'
  import LocationsList from '@/components/Locations/LocationsList.vue'
  import Geocoder from '@/components/Geocoder/Geocoder.vue'

  export default Vue.extend({
    name: 'MapComponent',
    components: {
      LocationsList,
      Geocoder,
    },

    data() {
      return {
        mapToken: mapToken,
        customMapStyle: 'mapbox://styles/ignacio68/ckay3bxbr11qt1hquzxx1ohot',
        satelliteMapStyle: MapStyle.SATELLITE_STREETS,
        defaultMapStyle: MapStyle.TRAFFIC_DAY,
        isSatelliteMap: false,
        elevationFAB: Elevation.FAB_RESTING,
        initialCoordinates: {
          lat: initialLocation().lat,
          lng: initialLocation().lng
        },
      }
    },

    computed:{
      mapStyle(): Promise<string> {
        return this.customMapStyle ? this.customMapStyle : this.defaultMapStyle
      },

      isVisibleLocationsList(): boolean {
        return getVisibility('locationsList')
      },

      isVisibleGeocoder(): boolean {
        return getVisibility('geocoder')
      },
    },

    methods: {
      async onMapReady(args: any) {
        console.log('onMapReady()')
        await this.setMap(args)
        addMarkers()
        await this.setOnMapLongClickAction()
        await this.setCenter()
        // TODO: Change source name, add options
        // addSource('main')
        // this.showMarkers()
      },

      setMap(args: any){
        setMap(args.map)
      },

      setOnMapLongClickAction() {
        map().setOnMapLongClickListener(function (point: LngLat) {
          updateUserMarker(point)
          return true
        })
      },

      setCenter() {
        setCenter().then(() => {
          // if (!numberOfLocations) this.$emit('first-location-alert')
          if (!numberOfLocations()) this.$emit('first-location-alert')
        })
      },
      // onMapReady(args: any) {
      //   console.log('MAP READY!')
      //   setMap(args.map)
      //   this.$emit('on-map-ready', args)
      // },

      centerCamera() {
        console.log('centerCamera()')
        setCenter()
      },

      flyTo(location: LngLat) {
        console.log('flyTo()')
        flyTo(location)
      },

      updateCoordinates(location: Location): LngLat {
        const { latitude: lat, longitude: lng } = location
        const newCoordinates: LngLat = {
          lat: lat,
          lng: lng
        }
        return newCoordinates
      },

      onLocationSelected(location: [Location]){
        console.log(`onLocationSelected: ${JSON.stringify(location)}`)
        setVisibility('geocoder', false)
        const newCoordinates: LngLat = this.updateCoordinates(location)
        this.flyTo(newCoordinates)
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
