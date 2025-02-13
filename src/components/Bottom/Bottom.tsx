"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./Bottom.module.scss";
import Image from "next/image";

const cx = cn.bind(styles);

const Bottom = () => {
  return (
    <div className={cx("bottomWrapper")}>
      <div className={cx("logoContainer")}>
        <Image
          src="/images/BottomLogo.png"
          alt=""
          className={cx("logoTitle")}
          width={212.17}
          height={50}
        />
        {/* <img src="/images/BottomLogo.png" alt="" className={cx("logoTitle")} /> */}
      </div>
      <div className={cx("snsContainer")}>
        <Image src="/images/kakaotalk.png" alt="" width={25} height={25} />
        <Image src="/images/insta.png" alt="" width={25} height={25} />
        <Image src="/images/facebook.png" alt="" width={25} height={25} />
        <Image src="/images/linkedin.png" alt="" width={25} height={25} />
        {/* <img src="/images/kakaotalk.png" alt="" /> */}
        {/* <img src="/images/insta.png" alt="" /> */}
        {/* <img src="/images/facebook.png" alt="" /> */}
        {/* <img src="/images/linkedin.png" alt="" /> */}
      </div>
    </div>
  );
};

export default Bottom;
