<template>
  <GridLayout columns="*, auto" rows="*, auto" class="map" horizontalAlignment="right">
    <MapBox
      ref="map"
      row="0"
      col="0"
      left="0"
      top="0"
      colSpan="2"
      rowSpan="2"
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
      @locationPermissionGranted="onLocationPermissionGranted"
      @locationPermissionDenied="onLocationPermissionDenied"
      @mapReady="onMapReady($event)"
    />
    <!-- <AlarmFAB
      row="1"
      col="0"
      horizontalAlignment="left"
      class="m-b-32 m-l-16"
      @on-tap-alarm-fab="onTapAlarmFAB"
    /> -->

    <GridLayout class="right-menu" rows="*, auto" columns="auto" row="0" col="1" rowSpan="2">
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
          class="fab map-style_fab m-r-16"
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
// import initDatabases from '@/setup/installDatabases'

import { mapToken, customMapStyle } from '@/setup/map'

import { setCenter, addMarkers, flyTo, setOnMapLongClickListener, setMapStyle } from '@/api/map'
import { updateUserMarker } from '@/api/userMarker'
import { getUserLocation } from '@/api/geolocation'
import { getVisibility, setVisibility } from '@/composables/useComponent'

import { getInitialLocation as initialLocation } from '@/store/userLocationStore'
import { setMap } from '@/store/mapStore'
import { hasLocations } from '@/store/locationsStore'

import { pipe } from '@/utils/functional'

import { Elevation, MapStyle } from '@/types'
import { LatLng, Map, GeocoderLocation } from '@/api/types'

import LocationsList from '@/components/Map/LocationsList.vue'
import Geocoder from '@/components/Geocoder/Geocoder.vue'
import AlarmFAB from './AlarmFAB.vue'

export default Vue.extend({
  name: 'MapWrapper',
  components: {
    LocationsList,
    Geocoder,
    AlarmFAB,
  },

  data() {
    return {
      mapToken: mapToken,
      customMapStyle: customMapStyle,
      satelliteMapStyle: MapStyle.SATELLITE_STREETS,
      defaultMapStyle: MapStyle.TRAFFIC_DAY,
      isSatelliteMap: false,
      elevationFAB: Elevation.FAB_RESTING,
      initialCoordinates: {
        lat: initialLocation().lat,
        lng: initialLocation().lng,
      },
    }
  },

  computed: {
    mapStyle(): string | MapStyle {
      return this.customMapStyle !== undefined ? this.customMapStyle : this.defaultMapStyle
    },

    isVisibleLocationsList(): boolean {
      return getVisibility('locationsList')
    },

    isVisibleGeocoder(): boolean {
      return getVisibility('geocoder')
    },
  },

  async mounted() {
    console.log('__MapWrapper.vue::mounted()')
    await getUserLocation()
  },

  methods: {
    onLocationPermissionGranted() {
      console.log('MapWrapper::onLocationPermissionGranted()')
    },

    onLocationPermissionDenied() {
      console.log('MapComponent::onLocationPermissionDenied()')
    },

    onMapReady(args: any) {
      console.log('MapComponent::onMapReady()')
      // initDatabases()
      pipe(this.setMap(args), addMarkers(), this.setOnMapLongClickAction(), this.setMapCenter())
    },

    setMap(args: any) {
      const map: Map = args.map
      console.log(`MapComponent::setMap()`)
      setMap(map)
    },

    setOnMapLongClickAction(): void {
      console.log(`MapComponent::setOnMapLongClickAction()`)
      setOnMapLongClickListener((point: LatLng) => {
        console.log(`MapComponent::setOnMapLongClickAction:point: ${JSON.stringify(point)}`)
        updateUserMarker(point)
        return true
      })
    },

    setMapCenter(): void {
      console.log('MapComponent::setMapCenter()')
      setCenter().then(() => {
        !hasLocations() && this.$emit('first-location-alert')
      })
    },

    centerCamera(): void {
      console.log('centerCamera()')
      setCenter()
    },

    flyTo(location: LatLng) {
      console.log('flyTo()')
      flyTo(location)
    },

    updateCoordinates(location: GeocoderLocation): LatLng {
      const { latitude: lat, longitude: lng } = location
      const newCoordinates: LatLng = {
        lat: lat,
        lng: lng,
      }
      return newCoordinates
    },

    onLocationSelected(location: GeocoderLocation) {
      console.log(`onLocationSelected: ${JSON.stringify(location)}`)
      setVisibility('geocoder', false)
      const newCoordinates: LatLng = this.updateCoordinates(location)
      this.flyTo(newCoordinates)
    },

    onTapAlarmFAB() {
      console.log(`deactivate alarm button tapped!!`)
    },

    changeMapStyle() {
      this.isSatelliteMap = !this.isSatelliteMap
      this.isSatelliteMap ? setMapStyle(this.satelliteMapStyle) : setMapStyle(this.mapStyle)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.right-menu {
  background-color: transparent;
}
.fab {
  background-color: $background;
  color: $secondary;
  horizontal-align: right;
}
.map-style_fab {
  margin-bottom: 192;
}
</style>
