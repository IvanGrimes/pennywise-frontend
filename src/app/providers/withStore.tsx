import { Provider } from 'react-redux';
import { ComponentType, useEffect } from 'react';
import { appInitEvent } from 'shared/model';
import { store } from '../store';

export const withStore = (Component: ComponentType) => {
  const WrappedComponent = () => {
    useEffect(() => {
      store.dispatch(appInitEvent());
    }, []);

    return (
      <Provider store={store}>
        <Component />
      </Provider>
    );
  };

  return WrappedComponent;
};
