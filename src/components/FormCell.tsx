import { NormalisationForm } from "../App";
import CellWrapper from "./CellWrapper";

type Props = {
  form: NormalisationForm;
  formStr: string[];
  className?: string;
};

const FormCell = ({ form, formStr = [], className }: Props) => {
  if (!formStr.length) {
    return null;
  }
  return (
    <div
      className={`flex flex-col gap-5 lg:gap-10 border-slate-400 border-2 border-radius-5 lg:w-[40vw] lg:mx-auto ${className}`}
    >
      <div className="text-center">
        <h2 className="text-2xl">{form}</h2>
      </div>
      <div className="text-center">Length : {formStr.length}</div>
      <div className="flex flex-row justify-start divide-x-2 overflow-x-scroll ">
        {formStr.map((char, index) => {
          return (
            <CellWrapper
              key={`${char}-${index}`}
              char={char}
              className={`w-20 px-2 lg:w-[100%] first:ml-auto last:mr-auto`}
              renderUnicode={(unicode: string) => (
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
    </div>
  );
};

export default FormCell;
