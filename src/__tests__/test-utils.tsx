import './matchMedia.mock';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { Toaster } from '@/components/ui/toaster';

const Providers = ({ children }: any) => {
  return (
    <BrowserRouter>
      {children}
      <Toaster />
    </BrowserRouter>
  );
};

const customRender = (component: any) => {
  return render(component, {
    wrapper: Providers,
  });
};

export * from '@testing-library/react';
export { customRender as render };
