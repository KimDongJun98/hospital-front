"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./ReservationCard.module.scss";
import Image from "next/image";

const cx = cn.bind(styles);

type ReservationCardProps = {
  label: string;
  imageSrc: string;
  imageAlt: string;
};

const ReservationCard = (props: ReservationCardProps) => {
  const { label, imageSrc, imageAlt } = props;
  return (
    <button className={cx("reservationCardWrapper")}>
      <div className={cx("cardTitle")}>{label}</div>
      <Image
        src={imageSrc}
        alt={imageAlt}
        className={cx("cardImg")}
        width={76}
        height={76}
      />
      {/* <img src={imageSrc} alt={imageAlt} className={cx("cardImg")} /> */}
    </button>
  );
};

export default ReservationCard;
