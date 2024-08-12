import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';

const renderWithProviders = (ui, { ...renderOptions } = {}) => {
  return render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {ui}
      </PersistGate>
    </Provider>,
    renderOptions
  );
};

export default renderWithProviders;
