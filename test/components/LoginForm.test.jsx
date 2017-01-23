import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import $ from 'jquery'
import TestUtils from 'react-addons-test-utils'

import LoginForm from 'LoginForm'

describe('LoginForm', () => {
  it('should exist', () => {
    expect(LoginForm).toExist();
  });

  describe('_handleSubmit', () => {
    it('should call function on form submit', () => {
      var spy = expect.createSpy();
      var form = TestUtils.renderIntoDocument(<LoginForm/>);
      var $el = $(ReactDOM.findDOMNode(form));

      form.refs.username.value = 'met2002';
      form.refs.password.value = 'test';
      TestUtils.Simulate.submit($el.find('form')[0]);

      expect(spy).toHaveBeenCalled();
    });
  });
});
