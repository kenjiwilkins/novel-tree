import classNames from "classnames";
import { EditorFile } from "../../states/fileEditor";
import { Typography } from "../atoms/Typography";

export function FileTabItem({ file }: { file: EditorFile }) {
  return (
    <div className="flex gap-2 items-center">
      <div
        className={classNames(
          "min-w-28 flex items-center justify-center border-x border-solid h-full",
          file.isFocused ? "bg-gray-300" : "bg-gray-200"
        )}
      />
      <Typography variant="p" color="secondary" ellipsis>
        {file.name}
      </Typography>
    </div>
  );
}
