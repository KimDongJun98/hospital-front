"use client";
import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header/Header";
import Bottom from "@/components/Bottom/Bottom";
import cn from "classnames/bind";
import styles from "@/layouts/Root.layout.module.scss";
import "../style/globals.css";
import Fab from "@/components/Fab/Fab";

const cx = cn.bind(styles);

export const metadata: Metadata = {
    title: "Hospital",
    description: "side project",
};

export default function RootLayout(props: React.PropsWithChildren) {
    const { children } = props;

    return (
        <html lang="ko">
            <body>
                <div className={cx("hospitalWrap")}>
                    <Header />
                    <div className={cx("hospitalInn")}>{children}</div>
                    <div className={cx("fablInn")}>
                        <Fab />
                    </div>
                    <Bottom />
                </div>
            </body>
        </html>
    );
}
