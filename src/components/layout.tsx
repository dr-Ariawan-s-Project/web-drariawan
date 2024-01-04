import { ReactNode } from 'react';
import clsx from 'clsx';

import Navbar from '@/components/navbar-v2';

interface Props {
  children: ReactNode;
  hideNavbar?: boolean;
  centerY?: boolean;
  centerX?: boolean;
}

const Layout = (props: Readonly<Props>) => {
  const { children, hideNavbar, centerY = false, centerX = false } = props;

  return (
    <div className="bg-white flex flex-col h-screen w-full [&>*]:text-health-blue-dark">
      {!hideNavbar && <Navbar />}
      <div
        className={clsx(
          'w-full mx-auto grow flex flex-col',
          centerY && 'justify-center',
          centerX && 'items-center'
        )}
        data-testid="content-container"
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
