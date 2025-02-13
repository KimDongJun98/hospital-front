import React from "react";
import cn from "classnames/bind";
import styles from "./Button.module.scss";

const cx = cn.bind(styles);

type BtnProps = {
    label: string;
    type?: "button" | "submit" | "reset";
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    backgroundColor: "#FFEA3C" | "#FFFFFF" | "#FFFCE5";
    borderColor: "#BFC662" | "#CCCCCC";
    className?: string;
    disabled?: boolean;
    width?: string | number;
    height?: string | number;
};

const Button = (props: BtnProps) => {
    const {
        label,
        type = "button",
        onClick,
        backgroundColor,
        borderColor,
        className,
        disabled,
        width,
        height,
    } = props;

    const buttonStyle: React.CSSProperties = {
        backgroundColor,
        border: `1px solid ${borderColor}`,
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
    };

    return (
        <button
            type={type}
            className={cx("btn", className)}
            onClick={onClick}
            style={buttonStyle}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default Button;
