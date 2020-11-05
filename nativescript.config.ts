import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'com.distanceradar.app',
  appPath: 'app', // Added
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none',
  },
  // profiling: "timeline"
} as NativeScriptConfig