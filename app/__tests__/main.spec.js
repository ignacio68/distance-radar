import { shallowMount } from '@vue/test-utils'
import Main from '@/views/Main/Main.vue'

describe('Home.vue', () => {
  it('mounts and renders', () => {
    //   Act
    const wrapper = shallowMount(Main)

    //   Assert
    expect(wrapper.html()).toBeTruthy()
  })
})
