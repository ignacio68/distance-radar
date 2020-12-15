import Vue from 'nativescript-vue'

const view = Vue.observable({
  name: '',
})

export const getViewName = (): string => view.name

export const setViewName = (name: string): string => (view.name = name)
