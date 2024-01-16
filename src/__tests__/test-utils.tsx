import './matchMedia.mock';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

const Providers = ({ children }: any) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const customRender = (component: any) => {
  return render(component, {
    wrapper: Providers,
  });
};

export * from '@testing-library/react';
export { customRender as render };
