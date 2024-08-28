import React, { useState, useMemo, useEffect } from "react";
import { Home } from "./components/pages/Home";
import { SideBar } from "./components/organisms/SideBar";
import { Typography } from "./components/atoms/Typography";
import { IconButton } from "./components/molecules/IconButton";
import "./App.css";

interface Folder {
  fullPath: string;
  name: string;
}

function App() {
  const [folder, setFolder] = useState<Folder>();
  const [files, setFiles] = useState<string[]>([]);
  const folderName = useMemo(() => folder?.name, [folder]);
  function getLastDirectory(fullPath: string) {
    return fullPath.split("/").pop();
  }
  useEffect(() => {
    const path = "/Users/michaelwilkins/Documents/GitHub/YuiMcCarthy";
    setFolder({
      fullPath: path,
      name: getLastDirectory(path) || "Path Not Found",
    });
  }, [setFolder]);
  useEffect(() => {
    setFiles([".gitignore", "README.md", "package.json", "tsconfig.json"]);
  }, [setFiles]);
  return (
    <div className="flex gap-0">
      <SideBar>
        <React.Fragment>
          {folderName && (
            <div className="border-b border-solid -mx-2 px-2">
              <Typography variant="p" color="secondary">
                {folderName}
              </Typography>
            </div>
          )}
        </React.Fragment>
        <ul className="-mx-2">
          {files.map((file, index) => (
            <li key={index} className="hover:bg-gray-100">
              <IconButton
                icon="file"
                fill="secondary"
                onClick={() => console.log(file)}
              >
                {file}
              </IconButton>
            </li>
          ))}
        </ul>
      </SideBar>
      <Home />
    </div>
  );
}

export default App;
