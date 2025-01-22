import { NormalisationForm } from "./App";

type Props = {
  form: NormalisationForm;
  formStr: string[];
  baseStr?: string[];
  className?: string;
  cols: number;
};

type CellProps = {
  children: React.ReactNode;
  className?: string;
};

export const Cell: React.FC<CellProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-[100%] h-9 text-center ${className}`}>{children}</div>
  );
};

export const CellWrapper = ({
  char,
  unicode,
}: {
  char: string;
  unicode?: React.ReactNode;
}) => {
  return (
    <div className={`w-40 px-2 first:ml-auto last:mr-auto flex-grow-0`}>
      <Cell className="text-xl font-bold">{char}</Cell>
      {/* <Cell>{char.charCodeAt(0)}</Cell> */}
      <Cell>{unicode ? unicode : ""}</Cell>
    </div>
  );
};

const FormRow = ({ form, formStr = [], cols }: Props) => {
  console.log(
    "🚀 ~ file: FormCell.tsx:31 ~ char:",
    form,
    new Array(cols).length
  );
  if (!formStr.length) {
    return null;
  }
  return (
    <div
      className={`flex flex-col lg:flex-row divide-y-2 lg:divide-x-2 lg:divide-y-0 justify-start border-2 dark:border-white m-0 ml-auto mr-auto`}
      // 0.5 rem for padding
      style={{ width: `${cols * 10.5}rem` }}
    >
      <div className="w-40 flex-grow-0 left-0 sticky lg:border-x-2 dark:border-white bg-white dark:bg-[#242424]">
        <Cell className="text-xl ">{form}</Cell>
        <Cell className="">({formStr.length})</Cell>
      </div>
      {new Array(cols).fill(cols).map((_, index) => {
        const char = formStr[index];
        if (!char) {
          return <CellWrapper key={`${char}-${index}`} char={char} />;
        }
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
          <div
            key={`${char}-${index}`}
            className={`w-40 px-2 flex-grow-0 ${hgClassname}`}
          >
            <Cell className="text-xl font-bold">{char}</Cell>
            {/* <Cell>{char.charCodeAt(0)}</Cell> */}
            <Cell>
              <a
                target="_blank"
                href={`https://www.compart.com/en/unicode/${unicode}`}
              >
                {unicode}
              </a>
            </Cell>
          </div>
        );
      })}
    </div>
  );
};

export default FormRow;
