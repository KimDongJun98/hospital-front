"use client";

import React from "react";
import cn from "classnames/bind";
import styles from "./hospitalList.module.scss";
// import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

import Button from "@/components/Button/Button";

const cx = cn.bind(styles);

type Hospital = {
  _id: string;
  hospitalName: string;
  email: string;
  role: "hospital" | "admin";
  products: {
    _id: string;
    name: string;
    price: number;
  }[];
  orders: {
    _id: string;
    user_name: string;
    user_tell: string;
  }[];
  selective?: string[];
};

type hospitalResponse = {
  data: Hospital[];
};

// type ModalData = {
//   type: "products" | "orders";
//   date: string[];
// };

const hospitalRequest = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const response = await axios.get<hospitalResponse>(
      // "http://localhost:4000/api/admin",
      `${process.env.NEXT_PUBLIC_API_URL}/api/admin`,
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
    console.error("병원 목록을 가져오는 중 오류 발생:", error);
    return [];
  }
};

// const fetchHospitalData = async (url: string, hospitalId: string) => {
//   const token = localStorage.getItem("accessToken");
//   try {
//     const response = await axios.get(`${url}/${hospitalId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("데이터를 가져오는 중 오류 발생:", error);
//     return [];
//   }
// };

const HospitalView = () => {
  const [hospitals, setHospitals] = React.useState<Hospital[]>([]);
  // const [isModalOpen, setIsModalOpen] = React.useState(false);
  // const [modalData, setModalData] = React.useState<ModalData | null>(null);
  const router = useRouter();

  const getHospitals = async () => {
    try {
      const data = await hospitalRequest();
      setHospitals(data);
    } catch (error) {
      console.error("병원 목록을 가져오는 중 오류 발생:", error);
    }
  };
  // const getHospitals = async () => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) {
  //     alert("로그인이 필요합니다.");
  //     router.push("/login");
  //     return;
  //   }

  //   try {
  //     const response = await axios.get("http://localhost:4000/api/admin", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     setHospitals(response.data.data);
  //   } catch (error) {
  //     console.error("병원 목록을 가져오는 중 오류 발생:", error);
  //   }
  // };

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/login"); // 로그인 페이지로 리다이렉트
    } else {
      getHospitals(); // 병원 데이터 가져오기
      console.log();
    }
    getHospitals();
  }, [router]);

  // const handleProductClick = async (hospitalId: string) => {
  //   const products = await fetchHospitalData("/api/product", hospitalId);
  //   setModalData({ type: "products", data: products });
  //   setIsModalOpen(true);
  // };

  // const handleOrderClick = async (hospitalId: string) => {
  //   const orders = await fetchHospitalData("/api/order", hospitalId);
  //   setModalData({ type: "orders", data: orders });
  //   setIsModalOpen(true);
  // };

  // const closeModal = () => {
  //   setIsModalOpen(false);
  //   setModalData(null);
  // };

  const handleProductClick = () => {
    router.push(`/productList`);
  };

  const handleReservationClick = () => {
    router.push(`/reservationList`);
  };

  return (
    <div className={cx("hospitalListWrapper")}>
      <section className={cx("hospitalListSection")}>
        <h1 className={cx("hospitalListTitle")}>관리자 리스트</h1>
        <div className={cx("hospitalListContainer")}>
          <div className={cx("listContainer")}>
            {hospitals.map((hospital) => (
              <div key={hospital._id} className={cx("hospital")}>
                <div className={cx("hospitalInfo")}>
                  <h1 className={cx("hospitalName")}>
                    {hospital.hospitalName}
                  </h1>
                  <p className={cx("hospitalDetail")}>권한 - {hospital.role}</p>

                  <div className={cx("productList")}>
                    <p className={cx("productName")}>상품 목록</p>
                    {hospital.products.map((product) => (
                      <div key={product._id}>
                        <p className={cx("productDetail")}>
                          상품 이름 - {product.name}
                        </p>
                        <p className={cx("productDetail")}>
                          상품 가격 - {product.price.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* {hospital.orders.map((order) => (
                    <p key={order._id}>{order.user_name}</p>
                    ))} */}
                </div>
              </div>
            ))}
          </div>
          <div className={cx("hospitalBtn")}>
            <Button
              label="전체 상품 보기"
              backgroundColor="#FFFCE5"
              borderColor="#BFC662"
              width="302px"
              height="54px"
              onClick={handleProductClick}
            />
            <Button
              label="전체 예약 현황"
              backgroundColor="#FFFCE5"
              borderColor="#BFC662"
              width="302px"
              height="54px"
              onClick={handleReservationClick}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HospitalView;
