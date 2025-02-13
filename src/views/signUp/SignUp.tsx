"use client";

import React, { useEffect, useState } from "react";
import styles from "./SignUp.module.scss";
import cn from "classnames/bind";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextField/TextInput/TextInput";
import Button from "@/components/Button/Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import DaumPostcode from "react-daum-postcode";

type AddressData = {
  zonecode: string;
  address: string;
  addressEnglish: string;
  roadAddress: string;
  jibunAddress: string;
};

type SignupFormType = {
  id: string;
  password: string;
  passwordCheck: string;
  name: string;
  email: string;
  hospital: {
    hospitalName: string;
    latitude?: string;
    longitude?: string;
    businessNumber: string;
    address: {
      zipcode: string;
      basic: string;
      detail: string;
    };
  };
};

const cx = cn.bind(styles);

const SignupView = () => {
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<SignupFormType>();

  const router = useRouter();
  const [businessNumber, setBusinessNumber] = useState("");
  const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    let formatted = input;

    if (input.length > 3 && input.length <= 7) {
      formatted = `${input.slice(0, 3)}-${input.slice(3)}`;
    } else if (input.length > 7) {
      formatted = `${input.slice(0, 3)}-${input.slice(3, 7)}-${input.slice(
        7,
        11
      )}`;
    }

    setBusinessNumber(formatted);
    setValue("hospital.businessNumber", formatted, {
      shouldValidate: true,
    });
  };

  const onSubmit = async (data: SignupFormType) => {
    if (!data.hospital.businessNumber) {
      clearErrors("hospital.businessNumber");
      return;
    }

    try {
      if (data.password !== data.passwordCheck) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }

      console.log("유효한 데이터:", data);

      const response = await axios.post(
        // "http://localhost:4000/api/admin",
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin`,
        {
          withCredentials: true,

          email: data.email,
          password: data.password,
          name: data.name,
          address: data.hospital.address,
          hospitalName: data.hospital.hospitalName,
          businessNumber: data.hospital.businessNumber,
          hospital: data.hospital,
        }
      );

      console.log("서버 응답:", response.data);
      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "회원가입에 실패했습니다.";
        console.error("회원가입 에러:", errorMessage);
        alert(errorMessage);
      } else {
        console.error("알 수 없는 에러:", error);
      }
    }
  };

  const openPostcode = () => {
    setIsPostcodeOpen(true);
  };

  const closePostcode = () => {
    setIsPostcodeOpen(false);
  };

  const handlePostcodeComplete = (data: AddressData) => {
    const { zonecode, address } = data;
    setValue("hospital.address.zipcode", zonecode);
    setValue("hospital.address.basic", address);
    closePostcode();
  };

  return (
    <div className={cx("signup_wrap")}>
      <h1 className={cx("tit")}>회원가입</h1>
      <form className={cx("signup_form")} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("form_row")}>
          <TextInput
            label="이메일"
            width="100%"
            height={40}
            {...register("email", {
              required: "이메일을 입력해주세요",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "유효한 이메일 형식이 아닙니다.",
              },
            })}
          />
          {errors.email && (
            <span className={cx("errorMessage")}>{errors.email.message}</span>
          )}
        </div>
        <div className={cx("form_row")}>
          <TextInput
            label="비밀번호"
            type="password"
            width="100%"
            height={40}
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 6자 이상이어야 합니다.",
              },
            })}
          />
          {errors.password && (
            <span className={cx("errorMessage")}>
              {errors.password.message}
            </span>
          )}
        </div>
        <div className={cx("form_row")}>
          <TextInput
            label="비밀번호 확인"
            type="password"
            width="100%"
            height={40}
            {...register("passwordCheck", {
              required: "비밀번호를 다시 입력해주세요",
            })}
          />
          {errors.passwordCheck && (
            <span className={cx("errorMessage")}>
              {errors.passwordCheck.message}
            </span>
          )}
        </div>
        <div className={cx("form_row")}>
          <TextInput
            label="이름"
            width="100%"
            height={40}
            {...register("name", {
              required: "이름을 입력해주세요",
            })}
          />
          {errors.name && (
            <span className={cx("errorMessage")}>{errors.name?.message}</span>
          )}
        </div>
        <div className={cx("address_section")}>
          <div className={cx("zipcode_group")}>
            <TextInput
              label="우편번호"
              placeholder="우편번호"
              {...register("hospital.address.zipcode", {
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
            {...register("hospital.address.basic", {
              required: "기본주소를 입력해주세요",
            })}
            width="100%"
          />
          <TextInput
            placeholder="상세주소"
            {...register("hospital.address.detail", {
              required: "상세주소를 입력해주세요",
            })}
            width="100%"
          />
          {(errors?.hospital?.address?.zipcode ||
            errors?.hospital?.address?.basic ||
            errors?.hospital?.address?.detail) && (
            <span className={cx("errorMessage")}>주소를 입력해주세요.</span>
          )}
        </div>
        <div className={cx("form_row")}>
          <TextInput
            label="병원 이름"
            width="100%"
            height={40}
            {...register("hospital.hospitalName", {
              required: "병원 이름을 입력해주세요",
            })}
          />
          {errors.hospital?.hospitalName && (
            <span className={cx("errorMessage")}>
              {errors.hospital.hospitalName.message}
            </span>
          )}
        </div>
        <div className={cx("phone")}>
          <TextInput
            label="전화번호"
            value={businessNumber}
            width="100%"
            height={40}
            {...register("hospital.businessNumber", {
              required: "전화번호를 입력해주세요",
            })}
            onChange={handlePhoneChange}
          />
          {errors.hospital?.businessNumber && (
            <span className={cx("errorMessage")}>
              {errors.hospital?.businessNumber.message}
            </span>
          )}
        </div>
        <div className={cx("submit_btn_wrap")}>
          <Button
            type="submit"
            label="가입하기"
            backgroundColor="#FFEA3C"
            borderColor="#BFC662"
            className={cx("submit_btn")}
          />
        </div>
      </form>

      {/* Daum Postcode 주소 검색 팝업 */}
      {isPostcodeOpen && (
        <div className={cx("overlay")}>
          <div className={cx("postcode_wrap")}>
            <DaumPostcode
              theme={themeObj}
              style={postCodeStyle}
              onComplete={handlePostcodeComplete}
            />
            <div className={cx("close_btn")}>
              <Button
                label="닫기"
                onClick={closePostcode}
                backgroundColor="#FFEA3C"
                borderColor="#BFC662"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupView;
