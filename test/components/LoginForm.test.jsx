import React from 'react'
import ReactDOM from 'react-dom'
import expect from 'expect'
import $ from 'jQuery'
import TestUtils from 'react-addons-test-utils'

import LoginForm from 'LoginForm'

describe('LoginForm', () => {
  it('should exist', () => {
    expect(LoginForm).toExist();
  });

  describe('_handleSubmit', () => {
    it('should not call function on form submit with no data', () => {
      var form = TestUtils.renderIntoDocument(<LoginForm/>);
      var $el = $(ReactDOM.findDOMNode(form));
      var spy = expect.createSpy();

      TestUtils.Simulate.submit($el.find('form')[0]);

      expect(spy).toNotHaveBeenCalled();
    });
  });

  describe('render', () => {
    it('should show alert if error is true', () => {
      var form = TestUtils.renderIntoDocument(<LoginForm/>);
      var $el = $(ReactDOM.findDOMNode(form));
      form.setState({error:true});
      var $error = $el.find('div:contains(Invalid)');

      expect($error.length).toBe(1);
    });
  });
});
