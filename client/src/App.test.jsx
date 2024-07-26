import React from 'react'; 
import App from './App';
import { render, act } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';

describe('App rendering', () => {
  test('app renders successfully', async () => {
    let app;
    await act(async () => {
      app = render(<App />);
    });
    const elementList = app.container.querySelectorAll('div');
    expect(elementList).toHaveLength(4);
  });
});
