<template>
  <StackLayout class="Drawer">
    <DrawerHeader
      class="drawer-header"
      :text="userName"
    />
    <DrawerItem
      class="drawer-item"
      :text="$t('lang.components.drawerItem.locations')"
      @on-tap="onItemTap(Locations)"
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
  import { setViewName } from '@/composables/useNavigation'

  import DrawerHeader from '@/components/Drawer/DrawerHeader.vue'
  import DrawerItem from '@/components/Drawer/DrawerItem.vue'

  import Locations from '@/views/Main/Locations.vue'

  export default Vue.extend({
    name: 'DrawerContent',

    components: {
      DrawerHeader,
      DrawerItem,
      Locations
    },

    data() {
      return {
        userName: 'User_Name',
        Locations: Locations
      }
    },

    methods: {
      onItemTap(component): void {
        console.log(`DrawerItem::methods:onTap(): ${component}`)
        this.$navigateTo(component, {'ClearHistory': true})
        setVisibility('drawer', false)
      }
    }
  })
</script>

<style lang="scss" scoped>
 @import '../../app-variables';

.drawer{
  background-color: white;
}
.drawer-header {
  padding: 50 16 16 16;
  margin-bottom: 16;
  background-color:#007a70;
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
