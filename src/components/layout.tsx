import { ReactNode } from 'react';

import { Sidebar } from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  variant?: 'default' | 'admin';
  showMenu?: boolean;
  centerY?: boolean;
  centerX?: boolean;
  className?: string;
}

export const Layout = (props: Readonly<Props>) => {
  const {
    children,
    variant = 'default',
    showMenu,
    centerY = false,
    centerX = false,
    className,
  } = props;

  return (
    <div
      className={cn(
        'bg-white h-dvh w-full [&>*]:text-health-blue-dark flex bg-[url(/images/pattern.svg)]',
        variant === 'default' && 'overflow-auto'
      )}
    >
      {variant === 'admin' ? <Sidebar /> : null}
      <div className="w-full flex-grow flex flex-col">
        <Navbar showMenu={showMenu} />
        {variant === 'admin' ? (
          <div className="w-full flex-grow flex flex-col p-5 overflow-auto">
            <div
              className={cn(
                'flex h-fit w-full flex-col rounded-lg bg-white p-5 space-y-5',
                className
              )}
            >
              {children}
            </div>
          </div>
        ) : (
          <div
            className={cn(
              'container flex-grow flex flex-col relative',
              centerY && 'justify-center',
              centerX && 'items-center p-5',
              className
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export const AdminLayout = (props: Readonly<Props>) => {
  const {
    children,
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
        <Navbar showMenu={showMenu} />
        <div className="w-full h-full flex flex-col bg-gray-100 p-4">
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
