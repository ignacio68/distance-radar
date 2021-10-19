<template>
  <GridLayout columns="auto, auto" rows="auto, auto" class="activation-menu">
    <Label
      col="0"
      row="0"
      class="activation-menu_title"
      verticalAlignment="middle"
      :text="activationText"
      textWrap="true"
    />
    <Switch
      v-model="isSwitchEnabled"
      col="1"
      row="0"
      width="64"
      class="activation-menu_switch"
      :checked="isChecked"
      @checkedChange="onCheckedChange"
    />
    <StackLayout col="1" row="1" class="m-l-8">
      <RadioButton
        v-for="(alarmMode, index) in alertsMode"
        :key="index"
        class="alert-mode"
        :isEnabled="isRadioButtonEnabled"
        :text="$t(alarmMode.text)"
        :isChecked.sync="alarmMode.isSelected"
        @on-item-selected="onAlertModeSelected(alarmMode)"
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
        {
          text: 'lang.components.activationMenu.alarmMode[0]',
          mode: 'EXIT',
          isSelected: true,
        },
        {
          text: 'lang.components.activationMenu.alarmMode[1]',
          mode: 'ENTRANCE',
          isSelected: false,
        },
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
        this.alertsMode.map((alarmMode) => {
          if (alarmMode.text !== alertModeSelected.text) alarmMode.isSelected = false
        })
        this.$emit('on-alert-mode-selected', alertModeSelected.mode)
        console.log(
          `onAlertModeSelected::mode selected: ${alertModeSelected.mode} - ${alertModeSelected.isSelected}`,
        )
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
