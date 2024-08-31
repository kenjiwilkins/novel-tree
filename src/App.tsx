import React, { useEffect, useMemo } from "react";
import { atom, useAtomValue, useSetAtom, useAtom } from "jotai";
import classNames from "classnames";
import { selectedPageAtom, pages } from "./states/pages";
import { folderAtom, filesAtom, File } from "./states/directory";
import { editorFileOrderAtom, editorFilesAtom } from "./states/fileEditor";
import { Home } from "./components/pages/Home";
import { FileEditor } from "./components/pages/FileEditor";
import { SideBar } from "./components/organisms/SideBar";
import { Typography } from "./components/atoms/Typography";
import { IconButton } from "./components/molecules/IconButton";
import "./App.css";

function App() {
  const selectedPage = useAtomValue(selectedPageAtom);
  const folder = useAtomValue(folderAtom);
  const [files, setFiles] = useAtom(filesAtom);
  const folderName = useMemo(() => folder?.name, [folder]);
  const [editorFiles, setEditorFiles] = useAtom(editorFilesAtom);
  const [editorFileOrder, setEditorFileOrder] = useAtom(editorFileOrderAtom);

  const onClickFile = (file: File) => {
    // whther deitorFilesAtom and order has this file
    const hasFile = editorFiles.some((f) => f.id === file.id);
    const hasOrder = editorFileOrder.some((f) => f.fileId === file.id);
    if (!hasFile || !hasOrder) {
      const currentFilesUnfocused = editorFiles.map((f) => ({
        ...f,
        isFocused: false,
      }));
      setEditorFiles([
        ...currentFilesUnfocused,
        {
          ...file,
          isEditing: false,
          isFocused: true,
          editorState: "",
        },
      ]);
      setEditorFileOrder([
        ...editorFileOrder,
        {
          fileId: file.id,
          order: editorFileOrder.length,
        },
      ]);
    }
    if (hasFile && !file.isFocused) {
      setEditorFiles(
        editorFiles.map((f) => {
          if (f.id === file.id) {
            return {
              ...f,
              isFocused: true,
            };
          } else {
            return {
              ...f,
              isFocused: false,
            };
          }
        })
      );
    }
    setFiles(
      files.map((f) => {
        if (f.id === file.id) {
          return {
            ...f,
            isFocused: true,
          };
        } else {
          return {
            ...f,
            isFocused: false,
          };
        }
      })
    );
  };

  const updateSelectedPageAtom = atom(
    (get) => get(selectedPageAtom),
    (get, set, _arg) => {
      const folder = get(folderAtom);
      if (folder) {
        set(selectedPageAtom, pages.fileEditor);
      }
    }
  );
  const setUpdateSelectedPage = useSetAtom(updateSelectedPageAtom);
  useEffect(() => {
    setUpdateSelectedPage(undefined);
  }, [updateSelectedPageAtom]);

  return (
    <div className="flex gap-0 w-screen h-screen overflow-hidden">
      <SideBar>
        <React.Fragment>
          <div className="border-b border-solid -mx-2 px-2">
            <Typography variant="p" color="secondary" ellipsis>
              {folderName || "Untitled"}
            </Typography>
          </div>
        </React.Fragment>
        <ul className="-mx-2 max-w-fit ">
          {files.map((file, index) => (
            <li
              key={index}
              className={classNames(
                "hover:bg-gray-100 w-full",
                file.isFocused && "bg-gray-200"
              )}
            >
              <IconButton
                icon="file"
                fill="secondary"
                onClick={() => onClickFile(file)}
              >
                {file.name}
              </IconButton>
            </li>
          ))}
        </ul>
      </SideBar>
      <div className="flex-1 max-w-full">
        {selectedPage === pages.home && <Home />}
        {selectedPage === pages.fileEditor && <FileEditor />}
      </div>
    </div>
  );
}

export default App;
