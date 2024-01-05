import { create } from 'zustand';
import {
  LayoutDashboardIcon,
  UserRoundIcon,
  BookCopyIcon,
  BookTypeIcon,
  BookMarkedIcon,
  MailIcon,
  SettingsIcon,
} from 'lucide-react';

import { ISidebarList, ISidebarState } from '@/components/sidebar/types';
import { SidebarItem } from '@/components/sidebar/sidebar-item';
import { cn } from '@/lib/utils';

export const useSidebarStore = create<ISidebarState>()((set) => ({
  isSidebarOpen: true,
  changeSidebarOpen: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

const sidebarList: ISidebarList[] = [
  {
    heading: 'Main',
    child: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        to: '/',
        icon: LayoutDashboardIcon,
      },
      {
        id: 'patient',
        label: 'Patients',
        to: '/admin/list/pasien',
        icon: UserRoundIcon,
      },
      {
        id: 'user',
        label: 'Users',
        to: '/admin/list/user',
        icon: UserRoundIcon,
      },
    ],
  },
  {
    heading: 'Other',
    child: [
      {
        id: 'schedules',
        label: 'Schedules',
        to: '/my-class',
        icon: BookMarkedIcon,
      },
      {
        id: 'appointment',
        label: 'Appointment',
        to: '/email',
        icon: MailIcon,
      },
    ],
  },
];

export const Sidebar = () => {
  const { isSidebarOpen, changeSidebarOpen } = useSidebarStore(
    (state) => state
  );

  return (
    <>
      {isSidebarOpen && (
        <div
          className="absolute h-full w-full bg-black/50 md:invisible md:hidden"
          onClick={() => changeSidebarOpen()}
        />
      )}
      <div
        className={cn(
          'absolute flex h-full w-0 select-none flex-col overflow-y-auto bg-white duration-300 md:relative',
          isSidebarOpen ? 'w-72' : 'md:w-20'
        )}
      >
        <div className="flex h-24 w-full items-center justify-center px-4">
          <img
            className="h-full w-full object-contain"
            src="/klinik_sehat.svg"
            alt="logo alterra academy"
          />
        </div>
        <div className="flex w-full flex-grow flex-col">
          {sidebarList.map((list) => (
            <div
              className="flex h-fit w-full flex-col gap-2 p-3"
              key={list.heading}
            >
              <p
                className={cn(
                  'tracking-wide text-muted-foreground',
                  isSidebarOpen ? 'text-left' : 'text-center'
                )}
              >
                {isSidebarOpen ? list.heading : '-'}
              </p>
              {list.child?.map((item) => (
                <SidebarItem {...item} key={item.id} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};