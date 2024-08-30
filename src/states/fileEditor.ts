import { atom } from "jotai";
import { type File } from "./directory";

export interface EditorFile extends File {
  isEditing: boolean;
  isFocused: boolean;
  editorState: string;
}

interface EditorFileOrder {
  fileId: string;
  order: number;
}

export const editorFileOrderAtom = atom<EditorFileOrder[]>([]);

export const editorFilesAtom = atom<EditorFile[]>([]);
