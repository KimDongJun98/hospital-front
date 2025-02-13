"use client";

import React, { useState, useEffect } from "react";
import cn from "classnames/bind";
import styles from "./Reservation.module.scss";
import Calander from "@/components/Calander/Calander";
import Button from "@/components/Button/Button";
import TextInput from "@/components/TextField/TextInput/TextInput";
import BirthInput from "@/components/TextField/BirthInput/Birth";
import PhoneInput from "@/components/TextField/PhoneInput/Phone";
import EmailInput from "@/components/TextField/EmailInput/Email";
import Radio from "@/components/Radio/Radio";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
// import { useSearchParams } from "next/navigation";

const cx = cn.bind(styles);

const Reservation = () => {
  /** TextInput창 크기 */
  const inputSize = { width: "100%", height: "48px" };

  // const searchParams = useSearchParams();

  // const getProductDetails = () => {
  //   const productId = searchParams.get("productId");
  //   const hospitalName = searchParams.get("hospital");
  //   const productName = searchParams.get("productName");
  //   const productPrice = searchParams.get("productPrice");

  //   return {
  //     productId,
  //     hospitalName,
  //     productName,
  //     productPrice,
  //   };
  // };

  // const { productId, hospitalName, productName, productPrice } =
  //   getProductDetails();

  type FormData = {
    name: string;
    tell: string;
    birth: string | number;
    address: {
      zipcode: string;
      basic: string;
      detail: string;
    };
    gender: "male" | "female";
    email: string;
    reserveType: "combined" | "public";
    reservationDate: Date;
    reservationTime: string;
    memo?: string;
  };

  type AddressData = {
    zonecode: string;
    address: string;
    addressEnglish: string;
    roadAddress: string;
    jibunAddress: string;
  };

  type ReservationData = {
    productId: string;
    hospitalId: string;
    hospitalName: string;
    productName: string;
    productPrice: number;
  };

  const [reservationData, setReservationData] =
    useState<ReservationData | null>(null);

  useEffect(() => {
    const storedData = sessionStorage.getItem("reservationData");
    if (storedData) {
      setReservationData(JSON.parse(storedData)); // JSON 문자열을 객체로 변환
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { isSubmitting },
    clearErrors,
  } = useForm<FormData>();

  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (isPostcodeOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPostcodeOpen]);

  const themeObj = {
    bgColor: "#FFFCE3",
  };

  const postCodeStyle = {
    display: "block",
    top: "0%",
    width: "50vh",
    minHeight: "60vh",
    padding: "7px",
  };

  const openPostcode = () => {
    setIsPostcodeOpen(true);
  };

  const closePostcode = () => {
    setIsPostcodeOpen(false);
  };

  const handlePostcodeComplete = (data: AddressData) => {
    const { zonecode, address } = data;
    setValue("address.zipcode", zonecode);
    setValue("address.basic", address);
    closePostcode();
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            phone: data.tell,
            birth: data.birth,
            address: data.address,
            gender: data.gender,
            email: data.email,
            total_price: reservationData?.productPrice,
            memo: data.memo,
            date: data.reservationDate,
            time: data.reservationTime,
            productId: reservationData?.productId,
          }),
        }
      );

      if (response.ok) {
        alert("예약이 성공적으로 완료되었습니다.");
      } else {
        const errorData = await response.json();
        alert(`예약 실패: ${errorData.message}`);
      }
    } catch (error) {
      console.log(error);
      alert("서버와 통신 중 문제가 발생했습니다.");
    }
  };

  const handleRadioChange = (value: "public") => {
    setValue("reserveType", value);
    clearErrors("reserveType");
  };

  const handleGenderChange = (value: "male" | "female") => {
    setValue("gender", value);
    clearErrors("gender");
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setValue("reservationDate", date);
  };

  return (
    <div className={cx("reservationWrapper")}>
      <section className={cx("reservationSection")}>
        <h1 className={cx("reservationTitle")}>건강 검진 예약</h1>
        <form
          className={cx("reservationContainer")}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={cx("reservationForm")}>
            <div className={cx("calander")}>
              <Calander
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
              />
            </div>

            <div className={cx("reservationInfo")}>
              <h2 className={cx("reservationContent")}>예약 정보</h2>
              {/* <Suspense fallback={<div>Loading...</div>}> */}
              {/* <p className={cx("hospital")}>병원 : {hospitalName}</p>
                <p className={cx("product")}>예약 상품 : {productName}</p>
                <p className={cx("price")}>가격 : {productPrice}</p> */}
              <p className={cx("hospital")}>
                병원 : {reservationData?.hospitalName}
              </p>
              <p className={cx("product")}>
                예약 상품 : {reservationData?.productName}
              </p>
              <p className={cx("price")}>
                가격 : {reservationData?.productPrice}
              </p>
              {/* </Suspense> */}
              <h2 className={cx("reservationUser")}>예약자 정보</h2>
              <p className={cx("reservationDetail")}>
                검진 예약을 위한 최소한의 입력사항입니다.
                <br></br>
                예약 하시는 분의 정보를 입력해주세요.
              </p>
              <div className={cx("reservatioInput")}>
                <TextInput
                  label="예약자명"
                  {...register("name", { required: "이름을 입력해주세요" })}
                  {...inputSize}
                  requiredSymbol="*"
                />

                <div className={cx("radioContainer")}>
                  <p>
                    성별
                    <span className={cx("requiredSymbol")}>*</span>
                  </p>
                  <div className={cx("radioGroup")}>
                    <Radio
                      label="남성"
                      name="gender"
                      value="male"
                      checked={watch("gender") === "male"}
                      onChange={() => handleGenderChange("male")}
                    />
                    <Radio
                      label="여성"
                      name="gender"
                      value="female"
                      checked={watch("gender") === "female"}
                      onChange={() => handleGenderChange("female")}
                    />
                  </div>
                </div>

                <Controller
                  control={control}
                  name="birth"
                  defaultValue=""
                  render={({ field }) => (
                    <BirthInput
                      value={field.value}
                      onBirthChange={(birth) => field.onChange(birth)}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="email"
                  defaultValue=""
                  render={({ field }) => <EmailInput {...field} name="email" />}
                />

                <Controller
                  control={control}
                  name="tell"
                  render={({ field }) => (
                    <PhoneInput
                      value={field.value || ""}
                      onChange={(value) => field.onChange(value)}
                    />
                  )}
                />

                <div className={cx("address_section")}>
                  <div className={cx("zipcode_group")}>
                    <TextInput
                      label="주소"
                      requiredSymbol="*"
                      placeholder="우편번호"
                      {...register("address.zipcode", {
                        required: "우편번호를 입력해주세요",
                      })}
                      width="100%"
                    />
                    <Button
                      label="주소검색"
                      backgroundColor="#FFEA3C"
                      borderColor="#BFC662"
                      className={cx("search_btn")}
                      onClick={openPostcode}
                    />
                  </div>
                  <TextInput
                    placeholder="기본주소"
                    {...register("address.basic", {
                      required: "기본주소를 입력해주세요",
                    })}
                    width="100%"
                  />
                  <TextInput
                    placeholder="상세주소"
                    {...register("address.detail", {
                      required: "상세주소를 입력해주세요",
                    })}
                    width="100%"
                  />
                </div>

                <div className={cx("time_section")}>
                  <p>
                    예약 시간
                    <span className={cx("requiredSymbol")}>*</span>
                  </p>
                  <select
                    {...register("reservationTime", {
                      required: "예약 시간을 선택해주세요",
                    })}
                    className={cx("timePicker")}
                  >
                    <option value="">시간을 선택해주세요</option>
                    <option value="09:00">09:00</option>
                    <option value="10:00">10:00</option>
                    <option value="11:00">11:00</option>
                    <option value="13:00">13:00</option>
                    <option value="14:00">14:00</option>
                    <option value="15:00">15:00</option>
                    <option value="16:00">16:00</option>
                  </select>
                </div>

                <TextInput label="메모" {...inputSize} {...register("memo")} />
              </div>

              <div className={cx("checkupContainer")}>
                <h2 className={cx("checkupContent")}>검진 내용</h2>
                <div className={cx("radioContainer")}>
                  <p>
                    예약 구분
                    <span className={cx("requiredSymbol")}>*</span>
                  </p>
                  <Radio
                    label="건강검진"
                    name="type"
                    value="public"
                    checked={watch("reserveType") === "public"}
                    onChange={() => handleRadioChange("public")}
                  />
                </div>
              </div>

              <Button
                label="예약하기"
                type="submit"
                disabled={isSubmitting}
                backgroundColor="#FFEA3C"
                borderColor="#BFC662"
              />
            </div>
          </div>
        </form>
      </section>

      {isPostcodeOpen && (
        <div
          className={cx("postCodeWrapper")}
          onClick={closePostcode}
          style={postCodeStyle}
        >
          <DaumPostcode onComplete={handlePostcodeComplete} theme={themeObj} />
        </div>
      )}
    </div>
  );
};

export default Reservation;
