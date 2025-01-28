import { useEffect, useState } from "react";
import "./App.css";
import FormCell from "./components/FormCell";
import FormRow from "./components/FormRow";
import useParams, { FieldTypes } from "./hooks/useParams";

export const NF = {
  NFC: "NFC",
  NFD: "NFD",
  NFKC: "NFKC",
  NFKD: "NFKD",
} as const;

export type NormalisationForm = (typeof NF)[keyof typeof NF];

function App() {
  const { params, updateParams } = useParams({ str: "", layout: "" });
  const [nStr, setNstr] = useState<{ [key in NormalisationForm]: string[] }>({
    NFC: [],
    NFD: [],
    NFKC: [],
    NFKD: [],
  });

  const urlPush = function (key: FieldTypes, value: string) {
    const url = new URL(window.location.href);

    url.searchParams.set(key, value);
    window.history.pushState({}, "", url);
  };

  const onStringInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    urlPush("str", value);
    updateParams("str", value);
  };

  const handleOptionsClick = (key: FieldTypes, value: string) => {
    urlPush(key, value);
    updateParams(key, value);
  };

  useEffect(() => {
    setNstr({
      NFC: params.str.normalize(NF.NFC).split(""),
      NFD: params.str.normalize(NF.NFD).split(""),
      NFKC: params.str.normalize(NF.NFKC).split(""),
      NFKD: params.str.normalize(NF.NFKD).split(""),
    });
  }, [params.str]);

  const cols = nStr.NFKD.length;

  return (
    <>
      <header>
        <h1 className="text-5xl lg:text-7xl">string.normalize()</h1>
      </header>
      <main className="flex flex-col gap-5 pt-5">
        <div>
          <label
            className="w-[100%] text-left lg:text-center block"
            htmlFor="string"
          >
            Text with diacritical marks
          </label>
          <input
            aria-label="Text with diacritical marks"
            placeholder="Text..."
            className="w-[100%] lg:w-[50%] text-3x lg:text-5xl rounded-md border-2 dark:border-white border-black"
            name="string"
            id="string"
            onInput={onStringInput}
            value={params.str}
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:justify-between lg:w-[50%] lg:m-auto">
          <div className="flex gap-5 items-center">
            <span className="">Example Input : </span>
            <button
              className="bg-slate-200 dark:bg-slate-800"
              onClick={() => handleOptionsClick("str", "©Ⓓñ")}
            >
              ©Ⓓñ
            </button>
            <button
              className="bg-slate-200 dark:bg-slate-800"
              onClick={() => handleOptionsClick("str", "öéﬀ")}
            >
              öéﬀ
            </button>
            <button
              className="bg-slate-200 dark:bg-slate-800"
              onClick={() => handleOptionsClick("str", "I ♥ Köln")}
            >
              I ♥ Köln
            </button>
          </div>
          <div className="flex gap-5 items-center">
            <span className="">Layout : </span>
            <button
              className="bg-slate-200 dark:bg-slate-800"
              onClick={() => handleOptionsClick("layout", "compact")}
            >
              Compact
            </button>
            <button
              className="bg-slate-200 dark:bg-slate-800"
              onClick={() => handleOptionsClick("layout", "")}
            >
              Wide
            </button>
          </div>
        </div>

        {Boolean(params.str.length) &&
          (params.layout === "compact" ? (
            <div className="flex flex-row lg:flex-col w-[98vw] overflow-x-scroll">
              <FormRow form={NF.NFC} formStr={nStr.NFC} cols={cols} />
              <FormRow
                form={NF.NFD}
                formStr={nStr.NFD}
                baseStr={nStr.NFC}
                cols={cols}
              />
              <FormRow form={NF.NFKC} formStr={nStr.NFKC} cols={cols} />
              <FormRow form={NF.NFKD} formStr={nStr.NFKD} cols={cols} />
            </div>
          ) : (
            <div className="flex flex-col gap-5 lg:gap-0">
              <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
                <FormCell
                  form={NF.NFC}
                  formStr={nStr.NFC}
                  className="lg:mb-20"
                />
                <div className="border-2"></div>
                <FormCell
                  form={NF.NFD}
                  formStr={nStr.NFD}
                  className="lg:mb-20"
                />
              </div>
              <div className="border-2"></div>
              <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
                <FormCell
                  form={NF.NFKC}
                  formStr={nStr.NFKC}
                  className="lg:mt-20"
                />
                <div className="border-2"></div>
                <FormCell
                  form={NF.NFKD}
                  formStr={nStr.NFKD}
                  className="lg:mt-20"
                />
              </div>
            </div>
          ))}
      </main>
      <footer className="pt-5">
        <div className="text-center">
          Related blog post on{" "}
          <a href="https://blog.revathskumar.com/2025/01/javascript-understanding-string-normalize.html">
            blog.revathskumar.com
          </a>
        </div>
        <div className="text-center">
          Made with <span className="text-red-600">{"\u2665"}</span> by{" "}
          <a href="https://blog.revathskumar.com">@revathskumar</a>
        </div>
        <div className="text-center">
          source code available on{" "}
          <a href="https://codeberg.org/0x52534B/js-string-normalize">
            Codeberg
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
