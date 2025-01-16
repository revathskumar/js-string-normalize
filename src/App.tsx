import { useEffect, useState } from "react";
import "./App.css";
import FormCell from "./FormCell";

export const NF = {
  NFC: "NFC",
  NFD: "NFD",
  NFKC: "NFKC",
  NFKD: "NFKD",
} as const;

export type NormalisationForm = keyof typeof NF;

function App() {
  const [str, setStr] = useState("");
  const [nStr, setNstr] = useState<{ [key in NormalisationForm]: string[] }>({
    NFC: [],
    NFD: [],
    NFKC: [],
    NFKD: [],
  });

  const onPop = (evt: PopStateEvent) => {
    const url = new URL((evt.currentTarget as Window).location.href);
    const urlStr = url.searchParams.get("str");
    if (urlStr) {
      setStr(urlStr);
    }
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const urlStr = url.searchParams.get("str");
    if (urlStr) {
      setStr(urlStr);
    }

    window.addEventListener("popstate", onPop);

    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const onStringInput = (e: React.FormEvent<HTMLInputElement>) => {
    const url = new URL(window.location.href);

    url.searchParams.set("str", e.currentTarget.value);
    window.history.pushState({}, "", url);
    setStr(e.currentTarget.value);
  };

  useEffect(() => {
    setNstr({
      NFC: str.normalize("NFC").split(""),
      NFD: str.normalize("NFD").split(""),
      NFKC: str.normalize("NFKC").split(""),
      NFKD: str.normalize("NFKD").split(""),
    });
  }, [str]);

  return (
    <>
      <header>
        <h1 className="text-5xl lg:text-7xl">string.normalize()</h1>
      </header>
      <main className="flex flex-col gap-5 pt-5">
        <fieldset>
          <input
            className="w-[100%] lg:w-[50%] text-3x lg:text-5xl rounded-md border-2 dark:border-white border-black"
            name="string"
            id="string"
            onInput={onStringInput}
            value={str}
          />
        </fieldset>

        <div className="flex flex-col lg:py-10 gap-5 lg:gap-0">
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
            <FormCell
              key="NFC"
              form="NFC"
              formStr={nStr.NFC}
              className="lg:mb-20"
            />
            <div className="border-2"></div>
            <FormCell
              key="NFD"
              form="NFD"
              formStr={nStr.NFD}
              className="lg:mb-20"
            />
          </div>
          <div className="border-2"></div>
          <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
            <FormCell
              key="NFKC"
              form="NFKC"
              formStr={nStr.NFKC}
              className="lg:mt-20"
            />
            <div className="border-2"></div>
            <FormCell
              key="NFKD"
              form="NFKD"
              formStr={nStr.NFKD}
              className="lg:mt-20"
            />
          </div>
        </div>
      </main>
      <footer>
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
