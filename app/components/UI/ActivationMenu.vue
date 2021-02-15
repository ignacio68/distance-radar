<template>
  <GridLayout columns="auto, auto" rows="auto, auto" class="activation-menu">
    <Label
      col="0"
      row="0"
      class="activation-menu_title m-t-16"
      :text="activationText"
      textWrap="true"
    />
    <Switch
      col="1"
      row="0"
      width="64"
      class="activation-menu_switch"
      :checked="isChecked"
      v-model="isSwitchEnabled"
      @checkedChange="onCheckedChange"
    />
    <StackLayout col="1" row="1" class="m-l-8">
      <RadioButton
        v-for="(alertMode, index) in alertsMode"
        :key="index"
        class="alert-mode"
        :isEnabled="isRadioButtonEnabled"
        :text="$t(alertMode.text)"
        :isChecked.sync="alertMode.isSelected"
        @on-item-selected="onAlertModeSelected(alertMode)"
      />
    </StackLayout>
  </GridLayout>
</template>
<script lang="ts">
import Vue from 'nativescript-vue'
import RadioButton from '@/components/UI/RadioButton.vue'

export default Vue.extend({
  name: 'ActivationMenu',
  components: { RadioButton },
  props: {
    activationText: {
      type: String,
      default: '',
    },
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isSwitchEnabled: false,
      isRadioButtonEnabled: false,
      alertsMode: [
        { text: 'lang.components.activationMenu.alertMode[0]', mode: 'IN', isSelected: true },
        { text: 'lang.components.activationMenu.alertMode[1]', mode: 'OUT', isSelected: false },
      ],
    }
  },

  methods: {
    onCheckedChange(): void {
      this.$emit('on-checked-change', this.isSwitchEnabled)
      this.isRadioButtonEnabled = this.isSwitchEnabled
    },

    onAlertModeSelected(alertModeSelected: any): void {
      if (!alertModeSelected.isSelected) {
        alertModeSelected.isSelected = true
        this.alertsMode.map((alertMode) => {
          if (alertMode.text !== alertModeSelected.text) alertMode.isSelected = false
        })
        this.$emit('on-alert-mode-selected', alertModeSelected.mode)
      }
      return
    },
  },
})
</script>
<style lang="scss" scoped>
@import '../../app-variables';

.activation-menu_title {
  font-size: $font-sz-m;
  font-weight: 700;
  color: $primary-variant;
}
</style>
