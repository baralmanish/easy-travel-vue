import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Notification from '../Notification.vue'

describe('Notification', () => {
  it('renders success', () => {
    const wrapper = mount(Notification, { props: { success: 'Success Message' } })
    expect(wrapper.text()).toContain('Success Message')
    expect(wrapper.html()).toContain('border-green-200')
  })

  it('renders error', () => {
    const wrapper = mount(Notification, { props: { error: 'Error Message' } })
    expect(wrapper.text()).toContain('Error Message')
    expect(wrapper.html()).toContain('border-red-200')
  })
})
