"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./Fab.module.scss";
import Link from "next/link";
import Image from "next/image";
const cx = cn.bind(styles);

const Fab = () => {
  return (
    <div className={cx("fabWrapper")}>
      <Link href="productList">
        <div className={cx("fabButton")}>
          <Image
            src="/images/reservation.png"
            alt="검진예약"
            className={cx("reservation")}
            width={23}
            height={30}
          />
          {/* <img
            src="/images/reservation.png"
            alt="검진예약"
            className={cx("reservation")}
          /> */}
          <span>검진예약</span>
        </div>
      </Link>
      <Link href="reservationCheck">
        <div className={cx("fabButton")}>
          <Image
            src="/images/check.png"
            alt="예약조회"
            className={cx("check")}
            width={23}
            height={30}
          />
          {/* <img src="/images/check.png" alt="예약조회" className={cx("check")} /> */}
          <span>예약조회</span>
        </div>
      </Link>
      {/* <Link href="productRegister">
                <div className={cx("fabButton")}>
                    <img
                        src="/images/location.png"
                        alt="오시는길"
                        className={cx("location")}
                    />
                    <span>오시는길</span>
                </div>
            </Link> */}
    </div>
  );
};

export default Fab;
