import { NormalisationForm } from "../App";
import CellWrapper from "./CellWrapper";

type Props = {
  form: NormalisationForm;
  formStr: string[];
  baseStr?: string[];
  className?: string;
  cols: number;
};

const FormRow = ({ form, formStr = [], cols }: Props) => {
  if (!formStr.length) {
    return null;
  }
  return (
    <div
      className={`flex flex-col lg:flex-row divide-y-2 lg:divide-x-2 lg:divide-y-0 justify-start border-2 dark:border-white m-0 ml-auto mr-auto`}
      // 0.5 rem for padding
      style={{ width: `${cols * 10.5}rem` }}
    >
      <CellWrapper
        char={form}
        charClassName="text-xl"
        renderUnicode={() => `(${formStr.length})`}
        className="w-40 flex-grow-0 left-0 sticky lg:border-x-2 dark:border-white bg-white dark:bg-[#242424]"
      />
      {new Array(cols).fill(cols).map((_, index) => {
        const char = formStr[index];
        if (!char) {
          return (
            <CellWrapper
              key={`${char}-${index}`}
              char=""
              className="w-40 px-2 first:ml-auto last:mr-auto flex-grow-0"
            />
          );
        }

        return (
          <CellWrapper
            key={`${char}-${index}`}
            char={char}
            className="w-40 px-2 flex-grow-0"
            renderUnicode={(unicode) => (
              <a
                target="_blank"
                href={`https://www.compart.com/en/unicode/${unicode}`}
              >
                {unicode}
              </a>
            )}
          />
        );
      })}
    </div>
  );
};

export default FormRow;
