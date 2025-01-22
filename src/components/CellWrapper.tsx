import { Cell } from "./Cell";

const CellWrapper = ({
  char,
  renderUnicode,
  className,
  charClassName = "text-xl font-bold",
}: {
  char: string;
  renderUnicode?: (unicode: string) => React.ReactNode;
  className?: string;
  charClassName?: string;
}) => {
  const unicode = `U+${char
    .charCodeAt(0)
    .toString(16)
    .padStart(4, "0")
    .toUpperCase()}`;

  let hgClassname = "";

  if (char.charCodeAt(0) >= 768 && char.charCodeAt(0) <= 879) {
    hgClassname = "bg-slate-200 dark:bg-slate-800";
  }

  return (
    <div className={`${className} ${hgClassname}`}>
      <Cell className={charClassName}>{char}</Cell>
      {/* <Cell>{char.charCodeAt(0)}</Cell> */}
      <Cell>{renderUnicode ? renderUnicode(unicode) : ""}</Cell>
    </div>
  );
};

export default CellWrapper;
