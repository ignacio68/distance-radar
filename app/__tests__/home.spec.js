import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'

describe('Home.vue', () => {
  it('mounts and renders', () => {
    //   Act
    const wrapper = shallowMount(Home)

    //   Assert
    expect(wrapper.html()).toBeTruthy()
  })
})
