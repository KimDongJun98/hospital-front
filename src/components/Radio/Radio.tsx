"use client";

import React from "react";
import styles from "./Radio.module.scss";
import cn from "classnames/bind";

const cx = cn.bind(styles);

type RadioProps = {
    label?: React.ReactNode;
    name: string;
    value: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    nonBorder?: boolean;
};

// const Radio = (props: RadioProps) => {
//     const {
//         label,
//         name,
//         value,
//         checked = false,
//         onChange,
//         className,
//         nonBorder = true,
//     } = props;

//     // const [isChecked, setIsChecked] = useState(checked);

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         // const newChecked = e.target.checked;
//         // setIsChecked(newChecked);

//         if (onChange) {
//             onChange(e);
//         }
//     };

//     return (
//         <label
//             className={cx(
//                 "Radio",
//                 {
//                     check: isChecked,
//                     nonBorder,
//                 },
//                 className
//             )}
//         >
//             <div className={cx("RadioMark", { check: isChecked })} />
//             <span className={cx("RadioLabel", { check: isChecked })}>
//                 <div className={cx("Label")}>{label}</div>
//             </span>
//             <input
//                 type="radio"
//                 name={name}
//                 value={value}
//                 checked={isChecked}
//                 onChange={handleChange}
//                 hidden
//             />
//         </label>
//     );
// };

// export default Radio;

const Radio = (props: RadioProps) => {
    const {
        label,
        name,
        value,
        checked = false, // 외부에서 전달된 checked 값을 사용
        onChange,
        className,
        nonBorder = true,
    } = props;

    // checked 상태를 외부에서 관리하도록 변경
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e); // onChange 콜백 호출
        }
    };

    return (
        <label
            className={cx(
                "Radio",
                {
                    check: checked, // 외부에서 전달된 checked 값 사용
                    nonBorder,
                },
                className
            )}
        >
            <div className={cx("RadioMark", { check: checked })} />
            <span className={cx("RadioLabel", { check: checked })}>
                <div className={cx("Label")}>{label}</div>
            </span>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked} // 외부에서 전달된 checked 값을 사용
                onChange={handleChange}
                hidden
            />
        </label>
    );
};

export default Radio;