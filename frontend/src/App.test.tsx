import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// setup file
import { shallow } from 'enzyme';
// import { configure, shallow } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// configure({ adapter: new Adapter() });

describe("Counter Testing", () => {

  let wrapper: any;
  beforeEach(() => {
    wrapper = shallow(<App />);
    //  const wrapper = shallow(<App />); // it will render the component App, not the sub component inside like Layout for example
  })

  test('renders learn react link', () => {
    // console.log("debug : WRAPPER ==>  ", wrapper);
    expect(wrapper.find("h1").text()).toContain("conversion rate : $ USD - € EUR");
    // const { getByText } = render(<App />);// you load the component < App />
    // const linkElement = getByText("conversion rate : $ USD - € EUR");// you said that the document contains this string
    // expect(linkElement).toBeInTheDocument(); // you are checking that string exists great ! OK
  });

  // test rendering a button
  test('implement a button with a text', () => {
    expect(wrapper.find("#increment-btn").text()).toBe('+ Increment');
  })

  test('implement a button with a text', () => {
    expect(wrapper.find("#decrement-btn").text()).toBe('- Decrement');
  })

  test('check the initial state value of a div ', () => {
    expect(wrapper.find("#counter-value").text()).toBe("0");
  })

  test('it will render the click and increment the value', () => {
    wrapper.find("#increment-btn").simulate("click");// simulating th click on the button
    expect(wrapper.find("#counter-value").text()).toBe("1");
  })

  // test('it will render the click increment and decrement the value', () => {
  //   wrapper.find("#increment-btn").simulate("click");// simulating th click on the button
  //   expect(wrapper.find("#counter-value").text()).toBe("1");
  //   wrapper.find("#decrement-btn").simulate("click");// simulating th click on the button
  //   expect(wrapper.find("#counter-value").text()).toBe("0");
  // })

  test("it will counter let the counter to 0 when decrement and it's < 0", () => {
    wrapper.find("#decrement-btn").simulate("click");
    expect(wrapper.find("#counter-value").text()).toBe("0");
  })

})  
