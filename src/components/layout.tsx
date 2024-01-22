import { Params, useMatches } from 'react-router-dom';
import { ReactNode } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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

interface IMatches {
  id: string;
  pathname: string;
  params: Params<string>;
  data: unknown;
  handle: unknown;
}

type HandleType = {
  crumb: string;
};

export const Layout = (props: Readonly<Props>) => {
  const {
    children,
    variant = 'default',
    centerY = false,
    centerX = false,
    className,
  } = props;
  let matches: IMatches[] = useMatches();

  let crumbs = matches
    .filter((match) =>
      Boolean(match.handle && (match.handle as HandleType).crumb)
    )
    .map((match) => {
      const crumb = (match.handle as HandleType).crumb;
      return crumb;
    });

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
              <CardHeader>
                <CardTitle>{crumbs[0]}</CardTitle>
              </CardHeader>
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
