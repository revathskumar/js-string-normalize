import { useEffect, useReducer } from "react";

const ACTION_TYPES = {
  UPDATE_PARAM: "UPDATE_PARAM",
} as const;

type ActionTypes = keyof typeof ACTION_TYPES;

export type FieldTypes = "str" | "layout";

type State = {
  [key in FieldTypes]: string;
};

type Action = {
  type: ActionTypes;
  key: FieldTypes;
  value: string;
};

export default function useParams() {
  const [params, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case ACTION_TYPES.UPDATE_PARAM:
          return { ...state, [action.key]: action.value };

        default:
          return state;
      }
    },
    { str: "", layout: "" }
  );

  const updateParams = (key: FieldTypes, value: string) =>
    dispatch({
      type: ACTION_TYPES.UPDATE_PARAM,
      key,
      value,
    });

  useEffect(() => {
    const fromUrlToState = (href: string) => {
      const url = new URL(href);
      const urlStr = url.searchParams.get("str");
      updateParams("str", urlStr || "");

      const urlLayout = url.searchParams.get("layout");

      updateParams("layout", urlLayout || "");
    };

    fromUrlToState(window.location.href);

    const onPop = (evt: PopStateEvent) => {
      fromUrlToState((evt.currentTarget as Window).location.href);
    };

    window.addEventListener("popstate", onPop);

    return () => window.removeEventListener("popstate", onPop);
  }, []);

  return {
    params,
    updateParams,
  };
}
