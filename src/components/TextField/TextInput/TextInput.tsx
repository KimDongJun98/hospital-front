"use client";

import React, { forwardRef } from "react";
import cn from "classnames/bind";
import styles from "./TextInput.module.scss";

const cx = cn.bind(styles);

type TextInputProps = {
    label?: string;
    type?: "text" | "password" | "email" | "number";
    placeholder?: string;
    requiredSymbol?: React.ReactNode;
    width?: string | number;
    height?: string | number;
    error?: string;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "width" | "height">;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const {
        label,
        type = "text",
        placeholder,
        requiredSymbol,
        width,
        height,
        error,
        readOnly,
        inputRef,
        disabled,
        onChange,
        onBlur,
        ...rest
    } = props;

    return (
        <div className={cx("inputWrapper")}>
            <div className={cx("inputTitle")}>
                {label}
                {requiredSymbol && (
                    <span className={cx("requiredSymbol")}>
                        {requiredSymbol}
                    </span>
                )}
            </div>
            <input
                ref={ref || inputRef}
                type={type}
                className={cx("inputContent", { error: !!error, disabled })}
                placeholder={placeholder}
                disabled={disabled}
                style={{
                    width: typeof width === "number" ? `${width}px` : width,
                    height: typeof height === "number" ? `${height}px` : height,
                    backgroundColor: readOnly ? "#D9D9D9" : "#FFFFFF",
                }}
                readOnly={readOnly}
                onChange={onChange}
                onBlur={onBlur}
                {...rest}
            />
            {error && <p className={cx("errorMessage")}>{error}</p>}
        </div>
    );
});

TextInput.displayName = "TextInput";

export default TextInput;
