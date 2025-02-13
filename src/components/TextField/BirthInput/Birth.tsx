"use client";

import React, { useEffect, useState } from "react";
import cn from "classnames/bind";
import styles from "./Birth.module.scss";

const cx = cn.bind(styles);

interface BirthProps {
  value?: string | number;
  onBirthChange: (birth: string) => void;
}

const Birth: React.FC<BirthProps> = ({ value = "", onBirthChange }) => {
  const [year, setYear] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [day, setDay] = useState<string>("");

  // 현재 연도 계산
  const currentYear = new Date().getFullYear();

  // 연도, 월, 일 선택
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, index) => currentYear - index
  );
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  // 선택한 월에 따라 일 변경
  const getDaysInMonth = (month: number) => {
    return new Date(currentYear, month, 0).getDate();
  };

  // useEffect(() => {
  //   if (month) {
  //     const daysInMonth = getDaysInMonth(Number(month));
  //     if (Number(day) > daysInMonth) {
  //       setDay("");
  //     }
  //   }
  // }, [month]);

  // useEffect(() => {
  //   if (month && Number(day)) {
  //     const daysInMonth = getDaysInMonth(Number(month));
  //     if (Number(day) > daysInMonth) {
  //       setDay("");
  //     }
  //   }
  // }, [month, day]);

  useEffect(() => {
    // value 초기화
    if (value) {
      // const [y, m, d] = value.split("-"); // 'YYYY-MM-DD' 형식
      setYear(year || "");
      setMonth(month || "");
      setDay(day || "");
    }
  }, [value, day, month, year]);

  useEffect(() => {
    if (year && month && day) {
      onBirthChange(`${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`);
    }
  }, [year, month, day, onBirthChange]);

  return (
    <div className={cx("inputWrapper")}>
      <div className={cx("inputTitle")}>
        생년월일
        <span className={cx("requiredSymbol")}>*</span>
      </div>
      <div className={cx("dateSelector")}>
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={cx("dropDown")}
        >
          <option value="">년도</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className={cx("dropDown")}
        >
          <option value="">월</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}월
            </option>
          ))}
        </select>

        <select
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className={cx("dropDown")}
        >
          <option value="">일</option>
          {Array.from({ length: getDaysInMonth(Number(month)) }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1}일
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Birth;
