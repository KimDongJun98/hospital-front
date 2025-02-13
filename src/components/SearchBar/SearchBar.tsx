"use client";

import React from "react";
import styles from "./SearchBar.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type SearchBarProps = {
    width?: string | number;
    height?: string | number;
    placeholder?: string;
};

const searchbar = (props: SearchBarProps) => {
    const { width, height, placeholder } = props;
    return (
        <div className={cx("searchBarWrapper")}>
            <input
                type="text"
                className={cx("searchInput")}
                style={{
                    width: typeof width === "number" ? `${width}px` : width,
                    height: typeof height === "number" ? `${height}px` : height,
                }}
                placeholder={placeholder}
            />
            <button className={cx("searchBtn")}>검색</button>
        </div>
    );
};

export default searchbar;
