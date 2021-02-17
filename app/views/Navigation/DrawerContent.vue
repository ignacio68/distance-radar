<template>
  <StackLayout class="Drawer">
    <DrawerHeader class="drawer-header" :text="userName" />
    <DrawerItem
      class="drawer-item"
      :text="$t('lang.components.drawerItem.configuration')"
      @on-tap="onItemTap(Configuration)"
    />
    <DrawerItem
      class="drawer-item"
      :text="$t('lang.components.drawerItem.following')"
    />
    <DrawerItem
      class="drawer-item"
      :text="$t('lang.components.drawerItem.followers')"
    />
  </StackLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { setVisibility } from '@/composables/useComponent'

import DrawerHeader from '@/components/Drawer/DrawerHeader.vue'
import DrawerItem from '@/components/Drawer/DrawerItem.vue'

import Configuration from '@/views/Drawer/Configuration.vue'

export default Vue.extend({
  name: 'DrawerContent',

  components: {
    DrawerHeader,
    DrawerItem,
    Configuration,
  },

  data() {
    return {
      userName: 'User_Name',
      Configuration: Configuration,
    }
  },

  methods: {
    onItemTap(component: unknown): void {
      console.log(`DrawerItem::methods:onTap(): ${component}`)
      this.$navigateTo(component, { ClearHistory: true })
      setVisibility('drawer', false)
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.drawer {
  background-color: white;
}
.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color: #007a70;
  color: #ffffff;
  font-size: 24;
}
.drawer-item {
  padding: 8 16;
  color: #334240;
  background-color: white;
  font-size: 16;
}
</style>
