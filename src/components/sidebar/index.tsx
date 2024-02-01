import { create } from "zustand";

import { SidebarItem } from "@/components/sidebar/sidebar-item";
import { ISidebarState } from "@/components/sidebar/types";

import { sidebarList } from "@/utils/constants";
import { useAuthStore } from "@/utils/states";
import { cn } from "@/lib/utils";

export const useSidebarStore = create<ISidebarState>()((set) => ({
  isSidebarOpen: true,
  changeSidebarOpen: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export const Sidebar = () => {
  const role = useAuthStore((state) => state.role);
  const { isSidebarOpen, changeSidebarOpen } = useSidebarStore(
    (state) => state
  );

  return (
    <>
      {isSidebarOpen && (
        <div
          className="absolute h-full w-full bg-black/50 md:invisible md:hidden z-50"
          onClick={() => changeSidebarOpen()}
        />
      )}
      <div
        data-testid="sidebar"
        className={cn(
          "absolute flex h-full select-none flex-col overflow-y-auto bg-white duration-300 md:relative z-50 border-r border-border/40",
          isSidebarOpen ? "w-72" : "w-0 md:w-20"
        )}
      >
        <div className="flex h-24 w-full items-center justify-center p-4">
          <img
            className="h-full w-full object-contain"
            src="/images/logo-blue.svg"
            alt="logo"
          />
          {isSidebarOpen ? (
            <p className="text-2xl font-bold text-center">Eterna Medica</p>
          ) : null}
        </div>
        <div className="flex w-full flex-grow flex-col">
          {sidebarList[role].map((list) => (
            <div
              data-testid={`sidebar-${list.heading}`}
              className="flex h-fit w-full flex-col gap-2 p-3"
              key={list.heading}
            >
              <p
                className={cn(
                  "tracking-wide text-muted-foreground",
                  isSidebarOpen ? "text-left" : "text-center"
                )}
              >
                {isSidebarOpen ? list.heading : "-"}
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
