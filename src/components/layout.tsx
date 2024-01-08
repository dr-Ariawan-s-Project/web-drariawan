import { ReactNode } from 'react';

import { Sidebar } from '@/components/sidebar';
import Navbar from '@/components/navbar';
import useAuthStore from '@/utils/states/auth';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  hideNavbar?: boolean;
  centerY?: boolean;
  centerX?: boolean;
  className?: string;
}

export const Layout = (props: Readonly<Props>) => {
  const {
    children,
    hideNavbar,
    centerY = false,
    centerX = false,
    className,
  } = props;

  return (
    <div className="bg-white h-screen w-full [&>*]:text-health-blue-dark flex flex-col">
      {!hideNavbar && <Navbar />}
      <div
        className={cn(
          'w-full mx-auto flex-grow flex flex-col',
          centerY && 'justify-center',
          centerX && 'items-center p-5',
          className
        )}
        data-testid="content-container"
      >
        {children}
      </div>
    </div>
  );
};

export const AdminLayout = (props: Readonly<Props>) => {
  const { children, hideNavbar, centerY = false, centerX = false } = props;
  const { role } = useAuthStore((state) => state);

  return (
    <div className="bg-white flex h-screen w-full [&>*]:text-health-blue-dark">
      {role !== 'patient' && <Sidebar />}
      <div
        className={cn(
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
