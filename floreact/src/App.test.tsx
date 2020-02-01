import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders passed without exceptions', () => {
  render(<App />);
  expect(0).toBe(0);
});
