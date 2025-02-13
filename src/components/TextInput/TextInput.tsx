"use client";
import React from "react";
import cn from "classnames/bind";
import styles from "./TextInput.module.scss";
import { IoCloseCircle } from "react-icons/io5";
import {
  TextInputContext,
  TextInputProvider,
  TextInputProviderProps,
} from "./TextInput.context";

const cx = cn.bind(styles);

type EraseProps = React.PropsWithChildren<{
  className?: string;
}>;

const Erase = (props: EraseProps) => {
  const { children, className } = props;
  const { onChange, _inputRef } = React.useContext(TextInputContext);

  const handleClick = () => {
    if (_inputRef?.current) {
      console.log(_inputRef.current);
      _inputRef.current.value = "";
    }

    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <button onClick={handleClick} className={cx("TextInputErase", className)}>
      {children ?? <IoCloseCircle name={"CancleFilled"} size={16} />}
    </button>
  );
};

type labelProps = React.PropsWithChildren<{
  className?: string;
  focuseColor?: string;
}>;

const Label = ({ className, children, focuseColor }: labelProps) => {
  const { focused } = React.useContext(TextInputContext);
  return (
    <span
      className={cx("TextInputLabel", className)}
      style={{
        color: focused ? focuseColor : undefined,
      }}
    >
      {children}
    </span>
  );
};

type InputProps = React.PropsWithChildren<React.HTMLProps<HTMLInputElement>> & {
  wrapperClassName?: string;
  placeholderColor?: string;
  focusedColor?: string;
  containedBackgroundColor?: string;
  disabledColor?: string;
};

const Input = (props: InputProps) => {
  const {
    children,
    wrapperClassName,
    placeholderColor,
    containedBackgroundColor,
    disabledColor,
    placeholder,
    ...rest
  } = props;
  const {
    readOnly,
    disabled,
    focused,
    name,
    onFocus,
    onBlur,
    focusedColor,
    _inputRef,
    onChange,
    type,
    value = "",
  } = React.useContext(TextInputContext);
  const [text, setText] = React.useState(value);

  React.useEffect(() => {
    if (_inputRef?.current) {
      _inputRef.current.style.cssText = `
        ${placeholderColor ? `--placeholder-color: ${placeholderColor};` : ""}
        ${focusedColor ? `--focused-color: ${focusedColor};` : ""}
        ${disabledColor ? `--disabled-color: ${disabledColor};` : ""}
      `;
    }
  }, [_inputRef, disabledColor, focusedColor, placeholderColor, value]);

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      props.onChange?.(e);
      onChange?.(e);
    },
    [onChange, props]
  );

  const isFocused =
    !(props.readOnly ?? readOnly) && !(props.disabled ?? disabled) && focused;

  return (
    <div
      className={cx("TextInputComponentWrapper", wrapperClassName, {
        focused: isFocused,
        disabled: props.disabled ?? disabled,
        readOnly: props.readOnly ?? readOnly,
      })}
      style={{
        backgroundColor: isFocused
          ? props.containedBackgroundColor ?? containedBackgroundColor
          : "",
        borderColor: isFocused ? props.focusedColor ?? focusedColor : "",
      }}
    >
      <input
        {...rest}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        className={cx("TextInputComponentInput")}
        name={props.name ?? name}
        id={props.id ?? props.name ?? name}
        onFocus={
          !(props.readOnly ?? readOnly) && !(props.disabled ?? disabled)
            ? props.onFocus ?? onFocus
            : undefined
        }
        onBlur={props.onFocus ?? onBlur}
        onChange={handleChange}
        value={text}
        ref={_inputRef}
        placeholder={props.placeholder ?? placeholder}
      />
      {children}
    </div>
  );
};

const Root = (props: TextInputProviderProps) => {
  const { name, className, children, ...rest } = props;
  return (
    <TextInputProvider {...rest}>
      <label htmlFor={name} className={cx("TextInputRoot", className)}>
        {children}
      </label>
    </TextInputProvider>
  );
};

interface ITextInput {
  Label: typeof Label;
  Input: typeof Input;
  Erase: typeof Erase;
  Root: typeof Root;
}

export default {
  Label,
  Input,
  Root,
  Erase,
} as ITextInput;
