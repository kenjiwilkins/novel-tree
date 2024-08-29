import React from "react";
import { useSetAtom } from "jotai";
import { Button } from "../atoms/Button";
import { folderAtom, filesAtom, fileOrderAtom } from "../../states/directory";

interface OpenDirectoryDialogResponse {
  files: string[];
  path: string;
}

export const Home: React.FC = () => {
  const setFolder = useSetAtom(folderAtom);
  const setFiles = useSetAtom(filesAtom);
  const setFileOrder = useSetAtom(fileOrderAtom);
  function getLastDirectory(fullPath: string) {
    return fullPath.split("/").pop();
  }
  function openDirectoryDialog() {
    window.ipcRenderer
      .invoke("open-directory-dialog")
      .then((result: OpenDirectoryDialogResponse) => {
        setFolder({
          id: result.path,
          fullPath: result.path,
          name: getLastDirectory(result.path) || result.path,
        });
        setFiles(
          result.files.map((file) => ({
            id: file,
            name: getLastDirectory(file) || file,
            fullPath: file,
            isEditing: false,
            isFocused: false,
            folderId: result.path,
          }))
        );
        setFileOrder(
          result.files.map((file, index) => ({
            fileId: file,
            order: index,
          }))
        );
      });
  }
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center h-screen">
        <button onClick={openDirectoryDialog} className="text-blue-500">
          Open Directory Dialog
        </button>
      </div>
    </React.Fragment>
  );
};
