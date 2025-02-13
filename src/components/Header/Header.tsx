import React from "react";
import Image from "next/image";
import cn from "classnames/bind";
import styles from "./Header.module.scss";
import headerLogo from "../../../public/images/easycare2.png";
import Link from "next/link";

const cx = cn.bind(styles);

const Header = () => {
  return (
    <div className={cx("HeaderWrapper")}>
      <div className={cx("HeaderInn")}>
        <Link href={"/productList"}>
          <p className={cx("imageBox")}>
            <Image
              src={headerLogo}
              alt="EasyCare Logo"
              className={cx("logoIcon")}
              width={217}
              height={50}
            />
          </p>
        </Link>

        <div className={cx("loginContainer")}>
          <Link href={"/login"}>
            <div className={cx("imageBox")}>
              <Image
                src="/images/login.png"
                alt="예약조회"
                className={cx("loginIcon")}
                width={32}
                height={32}
              />
              {/* <img
                src="/images/login.png"
                alt="예약조회"
                className={cx("loginIcon")}
              /> */}
              <span>관리자 로그인</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
