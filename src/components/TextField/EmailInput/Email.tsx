// "use client";

// import React, { useState } from "react";
// import cn from "classnames/bind";
// import styles from "./Email.module.scss";

// const cx = cn.bind(styles);

// type EmailProps = {
//   domains?: string[];
//   name: string;
// };

// const Email = ({
//   domains = ["gmail.com", "naver.com", "daum.net", "yahoo.com", "직접 입력"],
// }: EmailProps) => {
//   const [localPart, setLocalPart] = useState("");
//   const [domain, setDomain] = useState(domains[0]);
//   const [customDomain, setCustomDomain] = useState("");

//   const handleLocalPartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLocalPart(e.target.value);
//   };

//   const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setDomain(e.target.value);
//     if (e.target.value !== "직접 입력") {
//       setCustomDomain("");
//     }
//   };

//   const handleCustomDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCustomDomain(e.target.value);
//   };

//   return (
//     <div className={cx("inputWrapper")}>
//       <div className={cx("inputTitle")}>
//         이메일 <span className={cx("requiredSymbol")}>*</span>
//       </div>
//       <div className={cx("inputEmail")}>
//         <input
//           type="text"
//           value={localPart}
//           onChange={handleLocalPartChange}
//           className={cx("emailInput")}
//           placeholder="이메일 아이디"
//         />
//         <span className={cx("atSymbol")}>@</span>
//         {domain === "직접 입력" ? (
//           <input
//             type="text"
//             value={customDomain}
//             onChange={handleCustomDomainChange}
//             className={cx("emailInput")}
//             placeholder="도메인 입력"
//           />
//         ) : (
//           <select
//             value={domain}
//             onChange={handleDomainChange}
//             className={cx("dropDown")}
//           >
//             {domains.map((opt) => (
//               <option key={opt} value={opt}>
//                 {opt}
//               </option>
//             ))}
//           </select>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Email;

"use client";
import React, { useState } from "react";
import cn from "classnames/bind";
import styles from "./Email.module.scss";

const cx = cn.bind(styles);

type EmailProps = {
  value: string; // react-hook-form의 value를 받기 위해 추가
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void; // 수정된 타입
  domains?: string[];
  name: string;
};

const Email = ({
  value,
  onChange,
  domains = ["gmail.com", "naver.com", "daum.net", "yahoo.com", "직접 입력"],
}: EmailProps) => {
  const [localPart, setLocalPart] = useState(value);
  const [domain, setDomain] = useState(domains[0]);
  const [customDomain, setCustomDomain] = useState("");

  const handleLocalPartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPart(e.target.value);
    const email = `${e.target.value}@${
      domain === "직접 입력" ? customDomain : domain
    }`;
    onChange({
      target: { name: "email", value: email },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDomain = e.target.value;
    setDomain(newDomain);
    if (newDomain !== "직접 입력") {
      setCustomDomain(""); // 도메인이 "직접 입력"이 아닌 경우, 커스텀 도메인 초기화
    }
    const email = `${localPart}@${
      newDomain === "직접 입력" ? customDomain : newDomain
    }`;
    onChange({
      target: { name: "email", value: email },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleCustomDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDomain(e.target.value);
    const email = `${localPart}@${e.target.value}`;
    onChange({
      target: { name: "email", value: email },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={cx("inputWrapper")}>
      <div className={cx("inputTitle")}>
        이메일 <span className={cx("requiredSymbol")}>*</span>
      </div>
      <div className={cx("inputEmail")}>
        <input
          type="text"
          value={localPart}
          onChange={handleLocalPartChange}
          className={cx("emailInput")}
          placeholder="이메일 아이디"
        />
        <span className={cx("atSymbol")}>@</span>
        {domain === "직접 입력" ? (
          <input
            type="text"
            value={customDomain}
            onChange={handleCustomDomainChange}
            className={cx("emailInput")}
            placeholder="도메인 입력"
          />
        ) : (
          <select
            value={domain}
            onChange={handleDomainChange}
            className={cx("dropDown")}
          >
            {domains.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default Email;
