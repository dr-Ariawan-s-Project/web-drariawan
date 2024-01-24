import { type StateCreator } from "zustand";
import Cookies from "js-cookie";

import { IUserPayload } from "../apis/auth/api";

export interface AuthStore {
  token: string;
  name: string;
  role: string;
  addAuth: (data: IUserPayload, remember: boolean) => void;
  resetAuth: () => void;
}

export const authStoreCreator: StateCreator<AuthStore> = (set) => ({
  token: Cookies.get("token") ?? sessionStorage.getItem("token") ?? "",
  name: Cookies.get("userName") ?? sessionStorage.getItem("userName") ?? "",
  role: Cookies.get("userRole") ?? sessionStorage.getItem("userRole") ?? "",
  addAuth: (data, remember) =>
    set(() => {
      if (remember) {
        Cookies.set("token", data.token, { expires: 1 });
        Cookies.set("userName", data.name, { expires: 1 });
        Cookies.set("userRole", data.role, { expires: 1 });
      } else {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("userName", data.name);
        sessionStorage.setItem("userRole", data.role);
      }

      return { token: data.token, name: data.name, role: data.role };
    }),
  resetAuth: () =>
    set(() => {
      Cookies.remove("token");
      Cookies.remove("userName");
      Cookies.remove("userRole");
      sessionStorage.clear();
      return { token: "", name: "", role: "" };
    }),
});
