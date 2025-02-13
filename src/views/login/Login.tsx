"use client";
import styles from "./Login.module.scss";
import cn from "classnames/bind";
import { useForm } from "react-hook-form";
import TextInput from "@/components/TextField/TextInput/TextInput";
import Button from "@/components/Button/Button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const cx = cn.bind(styles);

type loginResponse = {
  data: string;
};

type LoginFormType = {
  email: string;
  password: string;
};

const LoginView = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  // const fetchAdminData = async () => {
  //   try {
  //     const token = localStorage.getItem("accessToken");
  //     if (!token) {
  //       console.log(token);
  //       throw new Error("토큰이 없습니다. 다시 로그인해주세요.");
  //     }

  //     const response = await axios.get("http://localhost:4000/api/admin", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //       withCredentials: true,
  //     });

  //     console.log("관리자 데이터:", response.data);
  //   } catch (error) {
  //     console.error("관리자 리스트 가져오기 오류:", error);
  //     alert("관리자 리스트를 가져오는 중 오류가 발생했습니다.");
  //   }
  // };

  // const onSubmit = async (data: LoginFormType) => {
  //   try {
  //     const response = await axios.post<loginResponse>(
  //       "http://localhost:4000/api/auth/login",
  //       data,
  //       {
  //         withCredentials: true,
  //       }
  //     );

  //     const { data: token } = response.data;

  //     if (token) {
  //       localStorage.setItem("accessToken", token);
  //       localStorage.setItem("refreshToken", token);

  //       const decodedToken = JSON.parse(atob(token.split(".")[1]));
  //       const { id, role } = decodedToken;

  //       if (!id || !role) {
  //         throw new Error("잘못된 정보입니다. 다시 로그인해주세요.");
  //       }

  //       if (role === "admin") {
  //         router.push("/hospitalList");
  //       } else {
  //         router.push("");
  //       }

  //       await fetchAdminData();
  //       router.push("/hospitalList");
  //     }
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       console.error("서버 오류:", error.response.data);
  //       alert(
  //         error.response.data.message ||
  //           "아이디 또는 비밀번호가 일치하지 않습니다."
  //       );
  //     } else {
  //       console.error("로그인 오류:", error);
  //       alert("로그인 처리 중 오류가 발생했습니다.");
  //     }
  //   }
  // };

  const onSubmit = async (data: LoginFormType) => {
    try {
      const response = await axios.post<loginResponse>(
        // "http://localhost:4000/api/auth/login",
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        data,
        {
          withCredentials: true,
        }
      );

      const { data: token } = response.data;

      if (token) {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("refreshToken", token);

        // 토큰에서 userId와 role 추출
        const decodedToken = JSON.parse(atob(token.split(".")[1])); // JWT 디코딩
        const { id, role } = decodedToken;

        if (!id || !role) {
          throw new Error("잘못된 토큰입니다. 다시 로그인해주세요.");
        }

        if (role === "admin") {
          router.push("/hospitalList");
        } else {
          router.push(`/productList`);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("서버 오류:", error.response.data);
        alert(
          error.response.data.message ||
            "아이디 또는 비밀번호가 일치하지 않습니다."
        );
      } else {
        console.error("로그인 오류:", error);
        alert("로그인 처리 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className={cx("login_wrap")}>
      <h1 className={cx("tit")}>로그인</h1>
      <form className={cx("login_form")} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx("input_group")}>
          <TextInput
            label="아이디"
            {...register("email", {
              required: "아이디를 입력해주세요",
              minLength: {
                value: 4,
                message: "아이디는 4자 이상이어야 합니다",
              },
            })}
          />
          {errors.email && (
            <span className={cx("errorMessage")}>{errors.email?.message}</span>
          )}
        </div>

        <div className={cx("input_group")}>
          <TextInput
            label="비밀번호"
            type="password"
            {...register("password", {
              required: "비밀번호를 입력해주세요",
              minLength: {
                value: 6,
                message: "비밀번호는 6자 이상이어야 합니다",
              },
            })}
          />
          {errors.password && (
            <span className={cx("errorMessage")}>
              {errors.password?.message}
            </span>
          )}
          {/* <div className={cx("password_help")}>
                        <Link
                            href="/forgot-password"
                            className={cx("forgot_password")}
                        >
                            비밀번호를 잊으셨나요?
                        </Link>
                    </div> */}
        </div>

        <div className={cx("button_group")}>
          <Button
            type="submit"
            label="로그인"
            backgroundColor="#FFEA3C"
            borderColor="#BFC662"
            className={cx("login_button")}
          />
          <Link href="signup">
            <Button
              label="회원가입"
              backgroundColor="#FFFFFF"
              borderColor="#CCCCCC"
              className={cx("signup_button")}
            />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
