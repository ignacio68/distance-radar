<template>
  <Page class="page" backgroundColor="white">
    <ActionBar
      title="ONLY FOR TESTING!!"
      class="action-bar"
    />
    <ScrollView>
      <StackLayout class="home-panel">
        <Button
          class="toggle-button"
          text="Toggle Component"
          @tap="onTap"
        />
        <StackLayout height="400">
          <component v-bind:is="component"></component>
        </StackLayout>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { getVisibility, setVisibility, toggleVisibility } from '@/composables/useComponent'

import ComponentTest1 from './ComponentTest1.vue'
import ComponentTest2 from './ComponentTest2.vue'
import NewLocation from '@/components/Map/NewLocation.vue'
import NewSecurityArea from '@/components/Map/NewSecurityArea.vue'

export default Vue.extend({
    name: 'HomeTest',
    components: {
      ComponentTest1,
      ComponentTest2,
      NewLocation,
      NewSecurityArea
    },
    data () {
        return {
          component: NewLocation,
        };
    },

    computed: {
      isVisibleNewLocationMenu(): boolean {
        console.log(`MapWrapper::computed:isVisibleNewLocationMenu() ${getVisibility('newLocationMenu')}`)
        return getVisibility('newLocationMenu')
      },

      isVisibleNewSecurityAreaMenu(): boolean {
        console.log(`MapWrapper::computed:isVisibleNewSecurityAreaMenu() ${getVisibility('newSecurityAreaMenu')}`)
        return getVisibility('newSecurityAreaMenu')
      },
    },

    watch: {
       isVisibleNewLocationMenu(newValue: boolean, oldValue: boolean) {
        console.log(`MapWrapper::watch:isVisibleNewLocationMenu(): ${newValue}`)
        if(newValue === true) {
          this.component = NewLocation
        }
        // newValue === true ? this.showBottomSheet() : this.hideBottomSheet()
      },

      isVisibleNewSecurityAreaMenu(newValue: boolean, oldValue: boolean) {
        console.log(`MapWrapper::watch:isVisibleNewSecurityAreaMenu(): ${newValue}`)
        if(newValue === true) {
          this.component = NewSecurityArea
        }
      }
    },

    methods: {
      onTap() {
        toggleVisibility('newLocationMenu')
        toggleVisibility('newSecurityAreaMenu')
      }
    }
})
</script>

<style lang="scss" scoped>
.home-panel {
    vertical-align: center;
    font-size: 20;
    margin: 15;
    color: black;
}

.description-label {
    margin: 15;
}
</style>

