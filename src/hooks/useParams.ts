import { useEffect, useReducer } from "react";

const ACTION_TYPES = {
  UPDATE_PARAM: "UPDATE_PARAM",
} as const;

type ActionTypes = (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES];

const FIELDS = {
  STR: "str",
  LAYOUT: "layout",
} as const;


export type FieldTypes = (typeof FIELDS)[keyof typeof FIELDS];

type State = {
  [key in FieldTypes]: string;
};

type Action = {
  type: ActionTypes;
  key: FieldTypes;
  value: string;
};

export default function useParams(initState: State) {
  const [params, dispatch] = useReducer((state: State, action: Action) => {
    switch (action.type) {
      case ACTION_TYPES.UPDATE_PARAM:
        return { ...state, [action.key]: action.value };

      default:
        return state;
    }
  }, initState);

  const updateParams = (key: FieldTypes, value: string) =>
    dispatch({
      type: ACTION_TYPES.UPDATE_PARAM,
      key,
      value,
    });

  useEffect(() => {
    const fromUrlToState = (href: string) => {
      const url = new URL(href);
      Object.values(FIELDS).map(field => {
        const urlField = url.searchParams.get(field);
        updateParams(field, urlField || "");
      });
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
