import React from "react";
import ReactDOM from 'react-dom';
import Button from '../Button';
import { render } from '@testing-library/react';

it("renders without crash", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Button></Button>, div);
})

it('render button correctly', () => {
  const { getByTestId } = render(<Button label="click me"></Button>);
  // expect(getByTestId('button').toHaveTextContent("click me")); // with // import "jest-dom/extend-expect";
  expect(getByTestId('button').textContent).toBe('click me')
})