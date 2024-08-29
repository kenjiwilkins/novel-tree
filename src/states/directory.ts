import { atomWithStorage } from "jotai/utils";

export interface Folder {
  id: string;
  fullPath: string;
  name: string;
}

export interface File {
  id: string;
  name: string;
  fullPath: string;
  isEditing: boolean;
  isFocused: boolean;
  folderId: string;
}

export interface FileOrder {
  fileId: string;
  order: number;
}

export interface EditorFileOrder extends FileOrder {}

export const fileOrderAtom = atomWithStorage<FileOrder[]>("fileOrder", []);

export const editorFileOrderAtom = atomWithStorage<EditorFileOrder[]>(
  "editorFileOrder",
  []
);

export const folderAtom = atomWithStorage<Folder | null>("folder", null);

export const filesAtom = atomWithStorage<File[]>("files", []);
