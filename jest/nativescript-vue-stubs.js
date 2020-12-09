import { config } from '@vue/test-utils'

const NSElements = [
  'ActionBar',
  'ActionItem',
  // 'CustomActionBar',
  // 'MapWrapper',
  // 'BottomAppBar',
  'ActivityIndicator',
  'Button',
  'Frame',
  'GridLayout',
  'Image',
  'Label',
  'ListView',
  'Page',
  'TextField',
  'ScrollView',
  'StackLayout',
]

NSElements.forEach((element) => (config.stubs[element] = true))

// 'MapBox', 'MDFloatingActionButton', 'MDButton', ''
