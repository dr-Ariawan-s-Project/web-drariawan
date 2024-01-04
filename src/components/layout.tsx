import { ReactNode } from 'react';
import clsx from 'clsx';

import Navbar from '@/components/navbar';
import { Sidebar } from '@/components/sidebar';
import useAuthStore from '@/utils/states/auth';

interface Props {
  children: ReactNode;
  hideNavbar?: boolean;
  centerY?: boolean;
  centerX?: boolean;
}

const Layout = (props: Readonly<Props>) => {
  const { children, hideNavbar, centerY = false, centerX = false } = props;
  const { role } = useAuthStore((state) => state);

  return (
    <div className="bg-white flex h-screen w-full [&>*]:text-health-blue-dark">
      {role !== 'patient' && <Sidebar />}
      <div
        className={clsx(
          'w-full mx-auto flex-grow flex flex-col',
          centerY && 'justify-center',
          centerX && 'items-center'
        )}
        data-testid="content-container"
      >
        {!hideNavbar && <Navbar />}
        <div className="w-full h-full flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
