import React from "react";

type InputType = "text" | "password" | "email";

type TextInputContextType = {
  value: string;
  disabled?: boolean;
  readOnly?: boolean;
  type?: InputType;
  name?: string;
  required?: boolean;
  focused?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  focusedColor?: string;
  _inputRef?: React.RefObject<HTMLInputElement | null>;
};

const initialState: TextInputContextType = {
  value: "",
  disabled: false,
  readOnly: false,
  type: "text",
  name: "",
  required: false,
  focused: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  focusedColor: "var(--gray400, #000)",
};

export const TextInputContext =
  React.createContext<TextInputContextType>(initialState);

export type TextInputProviderProps = React.PropsWithChildren<
  Partial<Omit<TextInputContextType, "">>
> & {
  className?: string;
};

export const TextInputProvider = (props: TextInputProviderProps) => {
  const [focused, setFocused] = React.useState(false);
  const _inputRef = React.useRef<HTMLInputElement>(null);

  const contextValue = React.useMemo(() => {
    return {
      ...initialState,
      ...props,
      focused,
      _inputRef,
      onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        props.onFocus?.call(null, e);
      },
      onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        props.onBlur?.call(null, e);
      },
    };
  }, [focused, props]);

  return (
    <TextInputContext.Provider value={contextValue}>
      {props.children}
    </TextInputContext.Provider>
  );
};
