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

        <div className="grid grid-rows-1 grid-cols-1 gap-20">
          <FormCell key="NFC" form="NFC" formStr={nStr.NFC} />
          <FormCell key="NFD" form="NFD" formStr={nStr.NFD} />
          <FormCell key="NFKC" form="NFKC" formStr={nStr.NFKC} />
          <FormCell key="NFKD" form="NFKD" formStr={nStr.NFKD} />
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default App;
