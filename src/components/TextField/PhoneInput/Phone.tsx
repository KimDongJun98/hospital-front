// "use client";

// import React, { useState } from "react";
// import cn from "classnames/bind";
// import styles from "./Phone.module.scss";

// const cx = cn.bind(styles);

// type PhoneProps = {
//   options?: string[];
// };

// const Phone = ({
//   options = ["010", "011", "016", "017", "018", "019"],
// }: PhoneProps) => {
//   const [prefix, setPrefix] = useState(options[0]);
//   const [middle, setMiddle] = useState("");
//   const [last, setLast] = useState("");

//   const handleNumberChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     setter: React.Dispatch<React.SetStateAction<string>>,
//     maxLength: number
//   ) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     if (value.length <= maxLength) {
//       setter(value);
//     }
//   };

//   const formatPhoneNumber = (prefix: string, middle: string, last: string) => {
//     // 하이픈(-)을 포함한 전화번호 형식으로 변환
//     return `${prefix}-${middle}-${last}`;
//   };

//   return (
//     <div className={cx("inputWrapper")}>
//       <div className={cx("inputTitle")}>
//         휴대폰 번호 <span className={cx("requiredSymbol")}>*</span>
//       </div>
//       <div className={cx("inputNumber")}>
//         <select
//           value={prefix}
//           onChange={(e) => setPrefix(e.target.value)}
//           className={cx("dropDown")}
//         >
//           {options.map((opt) => (
//             <option key={opt} value={opt}>
//               {opt}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           value={middle}
//           onChange={(e) => handleNumberChange(e, setMiddle, 4)}
//           maxLength={4}
//           className={cx("phoneInput")}
//         />
//         <input
//           type="text"
//           value={last}
//           onChange={(e) => handleNumberChange(e, setLast, 4)}
//           maxLength={4}
//           className={cx("phoneInput")}
//         />
//       </div>
//     </div>
//   );
// };

// export default Phone;

"use client";

import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./Phone.module.scss";

const cx = cn.bind(styles);

type PhoneProps = {
  value: string; // value는 반드시 string이어야 합니다.
  onChange: (value: string) => void; // 전화번호 변경 시 호출되는 함수
};

const PhoneInput = ({ value, onChange }: PhoneProps) => {
  const [prefix, setPrefix] = useState(value.slice(0, 3) || "010");
  const [middle, setMiddle] = useState(value.slice(3, 7) || "");
  const [last, setLast] = useState(value.slice(7, 11) || "");
  // const [prefix, setPrefix] = useState(value.toString().slice(0, 3) || "010");
  // const [middle, setMiddle] = useState(value.toString().slice(3, 7) || "");
  // const [last, setLast] = useState(value.toString().slice(7, 11) || "");

  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    maxLength: number
  ) => {
    const newValue = e.target.value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (newValue.length <= maxLength) {
      setter(newValue);

      // 최신 상태값을 병합하여 전달
      const updatedValue =
        setter === setMiddle
          ? `${prefix}${newValue}${last}`
          : `${prefix}${middle}${newValue}`;
      onChange(updatedValue);
    }
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrefix = e.target.value;
    setPrefix(newPrefix);

    // 최신 상태값을 병합하여 전달
    onChange(`${newPrefix}${middle}${last}`);
  };

  return (
    <div className={cx("inputWrapper")}>
      <div className={cx("inputTitle")}>
        휴대폰 번호 <span className={cx("requiredSymbol")}>*</span>
      </div>
      <div className={cx("inputNumber")}>
        <select
          value={prefix}
          onChange={handlePrefixChange}
          className={cx("dropDown")}
        >
          <option value="010">010</option>
          <option value="011">011</option>
          <option value="016">016</option>
          <option value="017">017</option>
          <option value="018">018</option>
          <option value="019">019</option>
        </select>
        <input
          type="text"
          value={middle}
          onChange={(e) => handleNumberChange(e, setMiddle, 4)}
          maxLength={4}
          className={cx("phoneInput")}
        />
        <input
          type="text"
          value={last}
          onChange={(e) => handleNumberChange(e, setLast, 4)}
          maxLength={4}
          className={cx("phoneInput")}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
