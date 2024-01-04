import { MinusIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ISidebarItem } from '@/components/sidebar/types';
import { useSidebarStore } from '@/components/sidebar';
import { cn } from '@/lib/utils';

export const SidebarItem = (props: ISidebarItem) => {
  const { child } = props;

  if (child) {
    return <SidebarChild {...props} />;
  } else {
    return <SidebarLink {...props} />;
  }
};

const SidebarChild = (props: ISidebarItem) => {
  const { label, icon: Icon, child } = props;
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);
  const location = useLocation();

  const isActive = child?.map((item) => item.to).includes(location.pathname);
  const [isOpen, setisOpen] = useState(isActive);

  if (isSidebarOpen) {
    return (
      <div className="flex flex-col gap-2">
        <div
          className={cn(
            'flex h-fit w-full items-center gap-5 p-3 duration-300 hover:bg-primary hover:text-primary-foreground',
            isSidebarOpen ? 'justify-start' : 'justify-center'
          )}
          onClick={() => setisOpen(!isOpen)}
        >
          <p className="text-2xl">
            <Icon />
          </p>
          {isSidebarOpen && (
            <>
              <p className="flex-grow text-sm font-medium tracking-wide">
                {label}
              </p>
              <p className="text-2xl">
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </p>
            </>
          )}
        </div>
        <div
          className={cn(
            'w-full gap-2 pl-3 duration-300',
            isOpen ? 'flex h-fit flex-col' : 'hidden h-0'
          )}
        >
          {child!.map((item) => (
            <SidebarLink {...item} icon={MinusIcon} key={item.id} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger
          className="flex h-fit w-full items-center p-3 duration-300 hover:bg-primary hover:text-primary-foreground"
          asChild
        >
          <div
            className={cn(
              'flex h-fit w-full items-center gap-5',
              isSidebarOpen ? 'justify-start' : 'justify-center'
            )}
          >
            <p className="text-2xl">
              <Icon />
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {child!.map((item) => (
            <DropdownMenuItem asChild key={item.id}>
              <Link className="text-sm font-medium tracking-wide" to={item.to}>
                {item.label}
              </Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
};

const SidebarLink = (props: ISidebarItem) => {
  const { to, label, icon: Icon } = props;
  const isSidebarOpen = useSidebarStore((state) => state.isSidebarOpen);

  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          'flex h-fit w-full items-center p-3 duration-300 hover:bg-primary hover:text-primary-foreground',
          isActive && 'bg-primary text-primary-foreground'
        )
      }
      to={to}
    >
      <div
        className={cn(
          'flex h-fit w-full items-center gap-5',
          isSidebarOpen ? 'justify-start' : 'justify-center'
        )}
      >
        <p className="text-2xl">
          <Icon />
        </p>
        {isSidebarOpen && (
          <p className="text-sm font-medium tracking-wide">{label}</p>
        )}
      </div>
    </NavLink>
  );
};
