import { atom } from "jotai";

interface Page {
  id: string;
  title: string;
  state?: string;
}

interface PageState {
  [key: string]: Page;
}

export const pages: PageState = {
  home: {
    id: "home",
    title: "Home",
  },
  fileEditor: {
    id: "fileEditor",
    title: "File Editor",
  },
};

export const selectedPageAtom = atom<Page | null>(null);
selectedPageAtom.onMount = (setAtom) => {
  setAtom(pages["home"]);
};
