import { ReactNode } from 'react';

import { Sidebar } from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  hideNavbar?: boolean;
  showMenu?: boolean;
  centerY?: boolean;
  centerX?: boolean;
  className?: string;
}

export const Layout = (props: Readonly<Props>) => {
  const {
    children,
    hideNavbar,
    showMenu,
    centerY = false,
    centerX = false,
    className,
  } = props;

  return (
    <div className="bg-white h-screen w-full [&>*]:text-health-blue-dark flex flex-col bg-[url(/images/pattern.svg)] overflow-auto">
      {!hideNavbar && <Navbar showMenu={showMenu} />}
      <div
        className={cn(
          'container flex-grow flex flex-col relative',
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
  const {
    children,
    hideNavbar,
    showMenu,
    centerY = false,
    centerX = false,
    className,
  } = props;

  return (
    <div className="flex h-screen w-full [&>*]:text-health-blue-dark">
      <Sidebar />
      <div
        className={cn(
          'w-full flex-grow flex flex-col',
          centerY && 'justify-center',
          centerX && 'items-center'
        )}
        data-testid="content-container"
      >
        {!hideNavbar && <Navbar showMenu={showMenu} />}
        <div className="w-full h-full flex flex-col overflow-auto bg-gray-100 p-4">
          <div
            className={cn(
              'flex h-fit w-full flex-col rounded-lg bg-white p-4',
              className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
