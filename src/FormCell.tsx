import { NormalisationForm } from "./App";

type Props = {
  form: NormalisationForm;
  formStr: string[];
  className?: string;
};

type CellProps = {
  children: React.ReactNode;
};

const Cell: React.FC<CellProps> = ({ children }) => {
  return <div className="w-[100%] h-9 text-center">{children}</div>;
};

const FormCell = ({ form, formStr = [], className }: Props) => {
  if (!formStr.length) {
    return null;
  }
  return (
    <div
      className={`flex flex-col gap-5 lg:gap-10 border-slate-400 border-2 border-radius-5 ${className}`}
    >
      <div className="text-center">
        <h2 className="text-2xl">{form}</h2>
      </div>
      <div className="text-center">Length : {formStr.length}</div>
      <div className="flex flex-row justify-start lg:justify-evenly divide-x-2 overflow-x-scroll sm:w-[100vw] lg:w-auto">
        {formStr.map((char, index) => {
          const unicode = `U+${char
            .charCodeAt(0)
            .toString(16)
            .padStart(4, "0")
            .toUpperCase()}`;

          return (
            <div key={`${char}-${index}`} className="w-20 px-2 lg:w-[100%]">
              <Cell>{char}</Cell>
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
    </div>
  );
};

export default FormCell;
