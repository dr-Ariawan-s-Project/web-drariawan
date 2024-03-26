import { ISchedule, IScheduling } from "@/utils/apis/schedule/types";
import { Request } from "@/utils/types/api";
import { DAYS_OF_WEEK } from "@/utils/constants";

export const generatePagesToDisplay = (
  currentPage: number,
  totalPages: number
) => {
  const maxPagesToShow = 5;
  let pagesToDisplay: (number | string)[] = [currentPage];

  if (totalPages <= maxPagesToShow) {
    pagesToDisplay = [...Array(totalPages).keys()].map((page) => page + 1);
  } else if (currentPage <= 3) {
    pagesToDisplay = [1, 2, 3, 4, "...", totalPages];
  } else if (currentPage >= totalPages - 2) {
    pagesToDisplay = [
      1,
      "...",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  } else {
    pagesToDisplay = [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  }

  return pagesToDisplay;
};

export const buildQueryString = (params?: Request): string => {
  if (!params) {
    return "";
  }

  const queryParams: string[] = [];

  let key: keyof typeof params;
  for (key in params) {
    queryParams.push(`${key}=${params[key]}`);
  }

  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
};

export const formatScheduleByDay = (data: ISchedule[]) => {
  let result: IScheduling[] = [];

  for (const day of DAYS_OF_WEEK) {
    const temp: IScheduling = {
      day: day,
      datas: data
        .filter((schedule) => schedule.day === day)
        .sort((a, b) => a.time_start.localeCompare(b.time_start)),
    };

    result.push(temp);
  }

  return result;
};
