import { atom } from "jotai";

export const localeAtom = atom<"zh" | "en" | "fr">("zh");
