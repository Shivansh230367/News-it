import { atom } from "recoil";

export const tokenAtom = atom({
  key: "tokenAtom",
  default: localStorage.getItem("token") || "",
  effects: [
    ({ onSet }) => {
      onSet((newToken) => {
        if (newToken) localStorage.setItem("token", newToken);
        else localStorage.removeItem("token");
      });
    },
  ],
});