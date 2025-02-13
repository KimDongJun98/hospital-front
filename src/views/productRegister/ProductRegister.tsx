"use client";

import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./ProductRegister.module.scss";
import TextInput from "@/components/TextField/TextInput/TextInput";
import Button from "@/components/Button/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

type FormData = {
  productName: string;
  productDetail: string;
  productPrice: number;
  selective?: string[];
  hospital: string;
};

const ProductRegister = () => {
  const [formattedPrice, setFormattedPrice] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<FormData>();

  // const selectOptions = [
  //     "강남 세브란스병원 헬스체크업센터",
  //     "하나로의료재단 종합센터",
  //     "하나로의료재단 강남센터",
  //     "광동병원 통합웰니스센터",
  //     "군포 지샘병원 건강검진센터",
  //     "창원 서울패밀리병원 AI건강증진센터",
  // ];

  const inputSize = { width: "100%", height: "48px" };

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/\D/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/\D/g, "");
    const formatted = formatPrice(numericValue);
    setFormattedPrice(formatted);
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const priceWithoutCommas = String(formattedPrice).replace(/,/g, "");
      const hospital = data.hospital;
      const token = localStorage.getItem("accessToken");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
          body: JSON.stringify({
            name: data.productName,
            description: data.productDetail,
            price: Number(priceWithoutCommas),
            selective: data.selective,
            hospital: hospital,
          }),
        }
      );

      const textResponse = await response.text();
      console.log("서버 응답:", textResponse);

      if (response.ok) {
        const responseData = JSON.parse(textResponse);
        alert("상품 등록이 완료되었습니다.");
        console.log("상품 등록 성공:", responseData);
        reset();
        router.push("/productList");
      } else {
        console.error("API 에러:", textResponse);
        alert(`상품 등록 실패: ${textResponse}`);
      }
    } catch (error) {
      console.error("에러 발생:", error);
      alert("폼 제출 중 에러가 발생했습니다.");
    }
  };

  return (
    <div className={cx("productRegisterWrapper")}>
      <section className={cx("productRegisterSection")}>
        <h1 className={cx("productRegisterTitle")}>건강 검진 상품 등록</h1>
        <form
          className={cx("productRegisterContainer")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={cx("productRegisterInput")}>
            <TextInput
              label="상품 이름"
              {...inputSize}
              {...register("productName", {
                required: "상품 이름을 입력해주세요",
              })}
            />
            {errors.productName && (
              <span className={cx("errorMessage")}>
                {errors.productName?.message}
              </span>
            )}
          </div>
          <div className={cx("productRegisterInput")}>
            <TextInput
              label="상품 설명"
              {...inputSize}
              {...register("productDetail", {
                required: "상품 설명을 입력해주세요",
              })}
            />
            {errors.productDetail && (
              <span className={cx("errorMessage")}>
                {errors.productDetail?.message}
              </span>
            )}
          </div>
          <div className={cx("productRegisterInput")}>
            <TextInput
              label="상품 가격"
              type="text"
              value={formattedPrice}
              {...inputSize}
              {...register("productPrice", {
                required: "상품 가격을 입력해주세요",
                valueAsNumber: true,
              })}
              onChange={handlePriceChange}
            />
            {errors.productPrice && (
              <span className={cx("errorMessage")}>
                {errors.productPrice?.message}
              </span>
            )}
          </div>
          {/* <div className={cx("productSelectContainer")}>
            <p className={cx("productSelectTitle")}>선택 검사</p>
            <div className={cx("productSelect")}>
              {selectOptions.map((option, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    value={option}
                    {...register("selective", {
                      required: "항목을 선택해주세요",
                    })}
                  />
                  {option}
                </label>
              ))}
            </div>
            {errors.selective && (
              <span className={cx("errorMessage")}>
                {errors.selective?.message}
              </span>
            )}
          </div> */}
          <div className={cx("registerBtn")}>
            <Button
              label="등록하기"
              backgroundColor="#FFEA3C"
              borderColor="#BFC662"
              disabled={isSubmitting}
              type="submit"
            />
          </div>
        </form>
      </section>
    </div>
  );
};

export default ProductRegister;
