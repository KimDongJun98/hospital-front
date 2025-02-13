"use client";
import React from "react";
import { ko } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import styles from "./Calander.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

// const Calander = () => {
//   const monthsToRender = 5;
//   const currentMonth = new Date().getMonth();
//   const currentYear = new Date().getFullYear();

//   const [selectedDates, setSelectedDates] = React.useState<Date | undefined>(
//     undefined
//   );

//   const getMonths = () => {
//     return Array.from({ length: monthsToRender }, (_, i) => {
//       const monthOffset = currentMonth + i;
//       const year = currentYear + Math.floor(monthOffset / 12);
//       const month = monthOffset % 12;
//       return new Date(year, month);
//     });
//   };

//   const handleDateSelect = (date: Date | undefined) => {
//     setSelectedDates(date);
//   };

//   return (
//     <div className={cx("calanderWrapper")}>
//       {getMonths().map((month, index) => (
//         <DayPicker
//           key={index}
//           locale={ko}
//           month={month}
//           disabled={[{ before: new Date() }]}
//           fixedWeeks
//           mode="single"
//           selected={selectedDates}
//           onSelect={(date) => handleDateSelect(date)}
//           styles={{
//             weekday: {
//               fontSize: "16px",
//               textAlign: "center",
//               lineHeight: "13px",
//             },
//             day: { fontSize: "16px" },
//             day_button: {
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             },
//             nav: { display: "none" },
//             month_caption: {
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",

//               paddingBottom: "28px",
//               fontSize: "18px",
//               fontWeight: "400",
//             },
//           }}
//         />
//       ))}
//     </div>
//   );
// };

const Calander = ({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
}) => {
  const monthsToRender = 5;
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) onDateSelect(date);
  };

  // const [selectedDates, setSelectedDates] = React.useState<Date | undefined>(
  //   undefined
  // );

  const getMonths = () => {
    return Array.from({ length: monthsToRender }, (_, i) => {
      const monthOffset = currentMonth + i;
      const year = currentYear + Math.floor(monthOffset / 12);
      const month = monthOffset % 12;
      return new Date(year, month);
    });
  };

  // const handleDateSelect = (date: Date | undefined) => {
  //   setSelectedDates(date);
  // };

  return (
    <div className={cx("calanderWrapper")}>
      {getMonths().map((month, index) => (
        <DayPicker
          key={index}
          locale={ko}
          month={month}
          disabled={[{ before: new Date() }]}
          fixedWeeks
          mode="single"
          selected={selectedDate}
          onSelect={(date) => handleDateSelect(date)}
          styles={{
            weekday: {
              fontSize: "16px",
              textAlign: "center",
              lineHeight: "13px",
            },
            day: { fontSize: "16px" },
            day_button: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            },
            nav: { display: "none" },
            month_caption: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              paddingBottom: "28px",
              fontSize: "18px",
              fontWeight: "400",
            },
          }}
        />
      ))}
    </div>
  );
};

export default Calander;
