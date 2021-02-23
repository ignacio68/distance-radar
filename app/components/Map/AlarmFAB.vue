<template>
  <MDFloatingActionButton
    ref="alarmFAB"
    row="1"
    col="0"
    class="alarm-fab"
    rippleColor="white"
    color="white"
    :elevation="elevationFAB"
    src="res://ic_notifications_white_24dp"
    @tap="onTapAlarmFAB"
  />
</template>
<script lang="ts">
import Vue from 'vue'
import { Color } from '@nativescript/core'
import { Elevation } from '@/types/enums/elevations'

import { getSecurityAreasActive } from '@/store/securityAreasStore'
// import { getAllAlarms } from '@/store/alarmsStore'
// import { fetchAlarmsActive } from '@/api/securityAreas'

import '@/plugins/installFAB'

export default Vue.extend({
  name: 'AlarmFAB',

  data() {
    return {
      elevationFAB: Elevation.FAB_RESTING,
    }
  },
  computed: {
    alarmFAB() {
      return this.$refs.alarmFAB.nativeView
    },

    isAlarmActive(): boolean {
      return getSecurityAreasActive().length > 0 ? true : false
    },
  },
  watch: {
    isAlarmActive: {
      // immediate: true,
      handler(newValue: boolean, oldValue: boolean) {
        this.alarmFAB.backgroundColor = new Color(newValue ? '#dd251b' : '#ced7d8')
      },
    },
  },
  methods: {
    onTapAlarmFAB() {
      console.log(`Alarm button tapped!!`)
      this.$emit('on-tap-alarm-fab')
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
