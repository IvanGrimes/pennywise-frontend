import { Suspense, FunctionComponent } from 'react';
import { BrowserRouter } from 'react-router-dom';

export const withRouter = (Component: FunctionComponent) => {
  const WrappedComponent = () => (
    <BrowserRouter>
      <Suspense fallback="Loading...">
        <Component />
      </Suspense>
    </BrowserRouter>
  );

  return WrappedComponent;
};
