import {
  LayoutDashboardIcon,
  UserRoundIcon,
  CalendarDaysIcon,
  CalendarClockIcon,
  FilesIcon,
  User2Icon,
} from "lucide-react";

import { ISidebarList } from "@/components/sidebar/types";
import { ISelect } from "./types/data";

export const sidebarList: Record<string, ISidebarList[]> = {
  suster: [
    {
      heading: "Main",
      child: [
        {
          id: "dashboard",
          label: "Dashboard",
          to: "/dashboard",
          icon: LayoutDashboardIcon,
        },
        {
          id: "schedules",
          label: "Jadwal",
          to: "/dashboard/schedules",
          icon: CalendarDaysIcon,
        },
        {
          id: "books",
          label: "Booking",
          to: "/dashboard/books",
          icon: CalendarClockIcon,
        },
      ],
    },
    {
      heading: "Other",
      child: [
        {
          id: "settings",
          label: "Settings",
          to: "/dashboard/settings",
          icon: User2Icon,
        },
      ],
    },
  ],
  dokter: [
    {
      heading: "Main",
      child: [
        {
          id: "dashboard",
          label: "Dashboard",
          to: "/dashboard",
          icon: LayoutDashboardIcon,
        },
        {
          id: "schedules",
          label: "Jadwal",
          to: "/dashboard/schedules",
          icon: CalendarDaysIcon,
        },
        {
          id: "books",
          label: "Booking",
          to: "/dashboard/books",
          icon: CalendarClockIcon,
        },
        {
          id: "questionnaires",
          label: "Kuesioner",
          to: "/dashboard/questionnaires",
          icon: FilesIcon,
        },
      ],
    },
    {
      heading: "Other",
      child: [
        {
          id: "settings",
          label: "Settings",
          to: "/dashboard/settings",
          icon: User2Icon,
        },
      ],
    },
  ],
  admin: [
    {
      heading: "Main",
      child: [
        {
          id: "dashboard",
          label: "Dashboard",
          to: "/dashboard",
          icon: LayoutDashboardIcon,
        },
        {
          id: "schedules",
          label: "Jadwal",
          to: "/dashboard/schedules",
          icon: CalendarDaysIcon,
        },
        {
          id: "patients",
          label: "Pasien",
          to: "/dashboard/patients",
          icon: UserRoundIcon,
        },
        {
          id: "questionnaires",
          label: "Kuesioner",
          to: "/dashboard/questionnaires",
          icon: FilesIcon,
        },
      ],
    },
    {
      heading: "Other",
      child: [
        {
          id: "settings",
          label: "Settings",
          to: "/dashboard/settings",
          icon: User2Icon,
        },
      ],
    },
  ],
  superadmin: [
    {
      heading: "Main",
      child: [
        {
          id: "dashboard",
          label: "Dashboard",
          to: "/dashboard",
          icon: LayoutDashboardIcon,
        },
        {
          id: "users",
          label: "Users",
          to: "/dashboard/users",
          icon: UserRoundIcon,
        },
        {
          id: "patients",
          label: "Pasien",
          to: "/dashboard/patients",
          icon: UserRoundIcon,
        },
        {
          id: "schedules",
          label: "Jadwal",
          to: "/dashboard/schedules",
          icon: CalendarDaysIcon,
        },
      ],
    },
    {
      heading: "Other",
      child: [
        {
          id: "settings",
          label: "Settings",
          to: "/dashboard/settings",
          icon: User2Icon,
        },
      ],
    },
  ],
};

export const roles: ISelect[] = [
  {
    label: "Suster",
    value: "suster",
  },
  {
    label: "Dokter",
    value: "dokter",
  },
  {
    label: "Admin",
    value: "admin",
  },
  {
    label: "Superadmin",
    value: "superadmin",
  },
];

export const forWho: ISelect[] = [
  {
    label: "Diri sendiri",
    value: "myself",
  },
  {
    label: "Partner",
    value: "partner",
  },
];

export const daysInWeek: ISelect[] = [
  {
    label: "Senin",
    value: "Senin",
  },
  {
    label: "Selasa",
    value: "Selasa",
  },
  {
    label: "Rabu",
    value: "Rabu",
  },
  {
    label: "Kamis",
    value: "Kamis",
  },
  {
    label: "Jumat",
    value: "Jumat",
  },
  {
    label: "Sabtu",
    value: "Sabtu",
  },
  {
    label: "Minggu",
    value: "Minggu",
  },
];

export const DAYS_OF_WEEK: string[] = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

export const GENDER = ["male", "female"] as const;
export const MARRIAGE_STATUS = ["married", "not_married", "divorce"] as const;
export type GENDER = "male" | "female";
export type MARRIAGE_STATUS = "married" | "not_married" | "divorce";
