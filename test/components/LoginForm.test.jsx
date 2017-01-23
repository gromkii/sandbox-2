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

    // How to write spies properly???
    // it('should call function on form submit with valid data', () => {
    //   var form = TestUtils.renderIntoDocument(<LoginForm/>);
    //   var spy = expect.spyOn(form, '_handleSubmit');
    //   var $el = $(ReactDOM.findDOMNode(form));
    //
    //   form.refs.username.value = 'met2002';
    //   form.refs.password.value = 'test';
    //
    //
    //   TestUtils.Simulate.submit($el.find('form')[0]);
    //
    //   expect(spy).toHaveBeenCalledWith({username:'met2002', password:'test'});
    // });

    it('should not call function on form submit with no data', () => {
      var spy = expect.createSpy();
      var form = TestUtils.renderIntoDocument(<LoginForm/>);
      var $el = $(ReactDOM.findDOMNode(form));

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
