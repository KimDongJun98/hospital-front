"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./ReservationList.module.scss";
import Button from "@/components/Button/Button";
import axios from "axios";
// import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

type Reservation = {
  _id: string;
  hospitalId: {
    _id: string;
    hospitalName: string;
  };
  user_name: string;
  user_tell: number;
  user_birth: string;
  user_address: {
    zipcode: string;
    basic: string;
    detail: string;
  };
  user_email: string;
  memo?: string;
  total_price: number;
  productId: {
    _id: string;
    name: string;
  };
};

type ReservationResponse = {
  data: Reservation[];
};

const reservationRequest = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get<ReservationResponse>(
      // "http://localhost:4000/api/order",
      `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("예약 목록을 가져오는 중 오류 발생:", error);
    return [];
  }
};

const ReservationList = () => {
  const [reservations, setReservations] = React.useState<Reservation[]>([]);
  // const router = useRouter();

  const getReservations = async () => {
    try {
      const data = await reservationRequest();
      setReservations(data);
    } catch (error) {
      console.error("예약 목록을 가져오는 중 오류 발생:", error);
    }
  };

  React.useEffect(() => {
    getReservations();
  }, []);

  const handleMapClick = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    const naverMapUrl = `https://map.naver.com/v5/search/${encodedAddress}`;
    window.open(naverMapUrl, "_blank");
  };

  // const handleReservationClick = (reservationId: string) => {
  //   router.push(`/order?orderId=${reservationId}`);
  // };

  const handleCancelClick = async (orderId: string) => {
    if (!window.confirm("정말로 예약을 취소하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:4000/api/order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      alert("예약이 취소되었습니다.");
      setReservations((prevReservations) =>
        prevReservations.filter((order) => order._id !== orderId)
      );
    } catch (error) {
      console.error("예약 취소 중 오류 발생:", error);
      alert("예약 취소에 실패했습니다.");
    }
  };

  return (
    <div className={cx("reservationWrapper")}>
      <section className={cx("reservationSection")}>
        <h1 className={cx("reservationTitle")}>예약 리스트</h1>
        <div className={cx("reservationContainer")}>
          <div className={cx("listContainer")}>
            {reservations.map((order) => (
              <div key={order._id} className={cx("reservationInfo")}>
                <div>
                  <h1 className={cx("reservationHospital")}>
                    {order.hospitalId.hospitalName}
                  </h1>
                  <p className={cx("reservationDetail")}>
                    이름 : {order.user_name}
                  </p>
                  <p className={cx("reservationDetail")}>
                    전화번호 :{" "}
                    {order.user_tell
                      .toString()
                      .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")}
                  </p>
                  <p className={cx("reservationDetail")}>
                    우편번호 : {order.user_address.zipcode}
                  </p>
                  <p className={cx("reservationDetail")}>
                    주소 : {order.user_address.basic}{" "}
                    {order.user_address.detail}
                  </p>
                  <p className={cx("reservationDetail")}>메모 : {order.memo}</p>
                  <p className={cx("reservationDetail")}>
                    예약 상품 : {order.productId.name}
                  </p>
                  <p className={cx("reservationDetail")}>
                    합계 : {order.total_price.toLocaleString()}
                  </p>
                </div>

                <div className={cx("reservationBtn")}>
                  <Button
                    label="예약취소"
                    backgroundColor="#FFFCE5"
                    borderColor="#BFC662"
                    width="302px"
                    height="54px"
                    onClick={() => handleCancelClick(order._id)}
                  />
                  <Button
                    label="지도보기"
                    backgroundColor="#FFFFFF"
                    borderColor="#CCCCCC"
                    width="302px"
                    height="54px"
                    onClick={() =>
                      handleMapClick(order.hospitalId.hospitalName)
                    }
                  />
                  {/* <Button
                    label="예약하기"
                    backgroundColor="#FFFCE5"
                    borderColor="#BFC662"
                    width="302px"
                    height="54px"
                    onClick={() => handleReservationClick(order._id)}
                  /> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReservationList;
