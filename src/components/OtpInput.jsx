import React, { useEffect, useRef, useState } from "react";
import { OTP_DIGITS_COUNT } from "../utils/constants";

const OtpInput = () => {
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill("")
  );
  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOtpChange = (value, index) => {
    if (isNaN(value)) return;

    const newArr = [...inputArr];
    const trimmedValue = value?.trim();
    newArr[index] = trimmedValue?.slice(-1);
    setInputArr(newArr);
    trimmedValue && refArr.current[index + 1]?.focus();
  };

  const handleRemoveValue = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArr.current[index - 1]?.focus();
    }
  };

  return (
    <div>
      {inputArr?.map((item, index) => (
        <input
          key={index}
          type="text"
          className="otp-input"
          ref={(input) => (refArr.current[index] = input)}
          value={inputArr[index]}
          onChange={(e) => handleOtpChange(e.target.value, index)}
          onKeyDown={(e) => handleRemoveValue(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
