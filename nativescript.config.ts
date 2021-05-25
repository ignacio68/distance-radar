import { NativeScriptConfig } from '@nativescript/core'

export default {
  id: 'com.distanceradar.app',
  // appPath: 'app', // Added
  main: 'app.ts',
  appResourcesPath: 'App_Resources',
  webpackConfigPath: 'webpack.config.js',
  android: {
    v8Flags: '--expose_gc',
    codeCache: true,
    markingMode: 'none',
    discardUncaughtJsExceptions: true,
  },
  // profiling: "timeline"
} as NativeScriptConfig
