import { LucideIcon } from "lucide-react";
import { To } from "react-router-dom";

export interface ISidebarList {
  heading: string;
  child?: ISidebarItem[];
}

export interface ISidebarItem {
  id: string;
  to: To;
  label: string;
  icon: LucideIcon;
  child?: {
    id: string;
    to: To;
    label: string;
  }[];
}

export interface ISidebarState {
  isSidebarOpen: boolean;
  changeSidebarOpen: () => void;
}
