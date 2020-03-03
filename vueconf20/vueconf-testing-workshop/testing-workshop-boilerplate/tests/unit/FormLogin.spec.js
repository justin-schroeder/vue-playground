import { mount } from '@vue/test-utils'
import FormLogin from '../../src/components/FormLogin'
import Vue from 'vue'

describe('FormLogin', () => {
  // Now mount the component and you have the wrapper
  const wrapper = mount(FormLogin, {
      propsData: {email: 'myemail@gmail.com'}
    }
  )

  it('sets email from prop', async () => {
    const email = 'myemail@gmail.com'
    wrapper.setProps({email});
    await Vue.nextTick();
    expect(wrapper.vm.$props.email).toBe(email);
    console.log(wrapper.vm.form);
    // console.log(wrapper.vm.$props.email);
    // console.log(wrapper.html())
    // expect(wrapper.html()).toContain('')
    //
  })

})