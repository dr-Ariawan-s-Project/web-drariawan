import { ReactNode } from 'react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Sidebar } from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { cn } from '@/lib/utils';

interface Props {
  children: ReactNode;
  variant?: 'default' | 'admin';
  centerY?: boolean;
  centerX?: boolean;
  className?: string;
}

export const Layout = (props: Readonly<Props>) => {
  const {
    children,
    variant = 'default',
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
      <div className="grow h-full flex flex-col">
        <Navbar showMenu={variant === 'admin'} />
        {variant === 'admin' ? (
          <div className="w-full flex-grow flex flex-col p-5 overflow-auto">
            <Card>
              <CardHeader></CardHeader>
              <CardContent className="space-y-5">{children}</CardContent>
            </Card>
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
