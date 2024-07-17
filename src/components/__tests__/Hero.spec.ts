import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Hero from '../Home/Hero.vue'

describe('Home Hero', () => {
  it('renders success', () => {
    const wrapper = mount(Hero, {
      props: { title: 'Easy Travel', subtitle: 'Discover the real value of travel' }
    })
    expect(wrapper.classes()).toContain('hero-section')
  })

  it('renders correct title and subtitle', () => {
    const wrapper = mount(Hero, {
      props: { title: 'Easy Travel', subtitle: 'Discover the real value of travel' }
    })
    expect(wrapper.get('h1').text()).toContain('Easy Travel')
    expect(wrapper.get('p').text()).toContain('Discover the real value of travel')
  })
})
