import React from "react";
import { Button } from "../atoms/Button";

export const Home: React.FC = () => {
  // open dialog from icpRenderer
  function openDialog() {
    window.ipcRenderer.invoke("open-file-dialog").then((result) => {
      console.log(result);
    });
  }
  function openDirectoryDialog() {
    window.ipcRenderer.invoke("open-directory-dialog").then((result) => {
      console.log(result);
    });
  }
  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center h-screen">
        <button onClick={openDialog} className="text-blue-500">
          Open File Dialog
        </button>
        <button onClick={openDirectoryDialog} className="text-blue-500">
          Open Directory Dialog
        </button>
      </div>
    </React.Fragment>
  );
};
