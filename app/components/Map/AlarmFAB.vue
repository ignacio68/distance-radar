<template>
  <MDFloatingActionButton
    ref="alarmFAB"
    row="1"
    col="0"
    class="alarm-fab"
    color="white"
    :rippleColor="rippleColor"
    :elevation="elevationFAB"
    src="res://ic_notifications_white_24dp"
    @tap="onTapAlarmFAB"
  />
</template>
<script lang="ts">
import Vue from 'vue'
import { Color } from '@nativescript/core'
import { Elevation } from '@/types/enums/elevations'

import { getAlarmsActivated } from '@/store/securityAreasStore'
// import { getAllAlarms } from '@/store/alarmsStore'
// import { fetchActiveRadars } from '@/api/securityAreas'

export default Vue.extend({
  name: 'AlarmFAB',

  data() {
    return {
      elevationFAB: Elevation.FAB_RESTING,
      rippleColor: null,
    }
  },
  computed: {
    alarmFAB() {
      return this.$refs.alarmFAB.nativeView
    },

    areAlarmsActivated(): boolean {
      return getAlarmsActivated().length > 0
    },
  },
  watch: {
    areAlarmsActivated: {
      // immediate: true,
      handler(newValue: boolean, oldValue: boolean) {
        newValue ? this.isEnabled : this.isNotEnabled
        // this.alarmFAB.backgroundColor = new Color(newValue ? '#dd251b' : '#ced7d8')
      },
    },
  },
  methods: {
    onTapAlarmFAB() {
      console.log(`Alarm button tapped!!`)
      this.$emit('on-tap-alarm-fab')
    },

    isEnabled() {
      this.alarmFAB.backgroundColor = new Color('#dd251b')
      this.rippleColor = 'white'
    },

    isNotEnabled() {
      this.alarmFAB.backgroundColor = new Color('#ced7d8')
      this.rippleColor = null
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.alarm-fab {
  background-color: $primary-light;
}
</style>
