"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./Body.module.scss";
import Fab from "../Fab/Fab";

const cx = cn.bind(styles);

const Body = () => {
    return (
        <>
            <div className={cx("layoutWrapper")}>
                <div className={cx("fabWrapper")}>
                    <Fab />
                </div>
            </div>
        </>
    );
};

export default Body;
