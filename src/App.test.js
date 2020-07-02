import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';

import {shallow,configure,render} from 'enzyme';
import Login from './Components/public-page/Login'

import Adapter from 'enzyme-adapter-react-16'

configure({adapter:new Adapter()});

describe('Test case for testing login', () => {
  let wrapper;
  test('username check',()=>
  {
    wrapper = shallow(<Login/>);
    
    wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: 'def@gmail.com'}});
    expect(wrapper.state('email')).toEqual('def@gmail.com');
  })
  it('password check',()=>{
    wrapper = shallow(<Login/>);
    wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '123456789'}});
    expect(wrapper.state('password')).toEqual('123456789');
    })
    
    it('login check with right data',()=>{

      wrapper = shallow(<Login/>);
      wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: 'def@gmail.com'}});  
      wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '123456789'}});
      wrapper.find('Button').simulate('click');
      
      expect(wrapper.state('isLogined')).toBe(true);
      
      })

      it('login check with wrong data',()=>{

        wrapper = shallow(<Login/>);
        
        wrapper.find('input[type="text"]').simulate('change', {target: {name: 'email', value: 'def@gmail.com'}});
        
        wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: '1234567890'}});
        
        wrapper.find('Button').simulate('click');
        
        expect(wrapper.state('isLogined')).toBe(false);
        
        })
});
