"use client";

import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./ReservationCheck.module.scss";
import Button from "@/components/Button/Button";
import PhoneInput from "@/components/TextField/PhoneInput/Phone";
import axios from "axios";

const cx = cn.bind(styles);

type ReservationCheck = {
  _id: string;
  user_address: {
    zipcode: string;
    basic: string;
    detail: string;
  };
  user_name: string;
  user_tell: number;
  user_birth: string;
  user_email: string;
  memo?: string;
  user_gender: "male" | "female";
  reservation_date: Date;
  reservation_time: string;
  status: "pending" | "completed" | "canceled";
  hospitalId: {
    _id: string;
    hospitalName: string;
  };
};

const ReservationCheck = () => {
  const [phone, setPhone] = useState("");
  const [reservationData, setReservationData] = useState<
    ReservationCheck[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSearch = async () => {
    if (!phone) {
      alert("전화번호를 입력해주세요.");
      return;
    }

    setLoading(true);
    setErrorMessage("");
    setReservationData(null);

    try {
      const response = await axios.get(
        // "http://localhost:4000/api/order/detail",
        `${process.env.NEXT_PUBLIC_API_URL}/api/order/detail`,
        {
          params: { user_tell: phone },
          withCredentials: true,
        }
      );

      if (response.data.data.length === 0) {
        setErrorMessage("예약 내역이 없습니다.");
      } else {
        setReservationData(response.data.data);
      }
    } catch (error) {
      console.error("예약 조회 중 오류 발생:", error);
      setErrorMessage("예약 목록이 존재하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx("reservationCheckWrapper")}>
      <section className={cx("reservationListSection")}>
        <h1 className={cx("title")}>예약 조회</h1>
        <div className={cx("searchContainer")}>
          <PhoneInput value={phone} onChange={setPhone} />
          <Button
            label="예약 조회"
            onClick={handleSearch}
            backgroundColor="#FFEA3C"
            borderColor="#BFC662"
            disabled={loading}
          />
        </div>

        {errorMessage && <p className={cx("errorMessage")}>{errorMessage}</p>}

        {reservationData && (
          <div className={cx("reservationResult")}>
            <h2>예약 정보</h2>
            {reservationData.map((reservation, index) => (
              <div key={index}>
                <p>병원 : {reservation.hospitalId.hospitalName}</p>
                <p>이름 : {reservation.user_name}</p>
                <p>
                  연락처 :{" "}
                  {reservation.user_tell
                    .toString()
                    .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
                </p>
                <p>성별 : {reservation.user_gender}</p>
                <p>이메일 : {reservation.user_email}</p>
                <p>생년월일 : {reservation.user_birth}</p>
                <p>
                  예약 날짜 :{" "}
                  {new Date(reservation.reservation_date).toLocaleDateString()}
                </p>
                <p>예약 시간 : {reservation.reservation_time}</p>
                <p>메모 : {reservation.memo}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ReservationCheck;
