"use client";

import {
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { mergeRefs } from "@utils";

import styled from "./styles.module.scss";
import { SelectGenderInputProps } from "@types";

function _SelectGenderInput(
  {
    name,
    valid = true,
    onChange = () => {},
    errorMessage = "",
    ...props
  }: SelectGenderInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [selectedGender, setSelectedGender] = useState<"남성" | "여성" | null>(
    null
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelectGender = (gender: "남성" | "여성") => {
    setSelectedGender(gender);
    if (inputRef.current) {
      inputRef.current.value = gender;
      inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  useEffect(() => {
    if (selectedGender && inputRef.current) {
      onChange({ target: inputRef.current } as any);
    }
  }, [selectedGender, onChange]);

  return (
    <div className={styled.input_wrapper}>
      <div className={styled.gender_buttons}>
        <button
          type="button"
          className={`${styled.gender_button} ${selectedGender === "여성" ? styled.selected : ""}`}
          onClick={() => handleSelectGender("여성")}
        >
          여성
        </button>
        <button
          type="button"
          className={`${styled.gender_button} ${selectedGender === "남성" ? styled.selected : ""}`}
          onClick={() => handleSelectGender("남성")}
        >
          남성
        </button>
      </div>
      <input
        {...props}
        name={name}
        ref={mergeRefs(inputRef, ref)}
        type="hidden"
        value={selectedGender || ""}
        readOnly
      />
      {errorMessage && (
        <div className={styled.error_message}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

/**
 * 상위 컴포넌트에서 SelectGenderInput 대한 className을 직접 설정하지 않도록 주의! (동작하지 않음)
 * @param {string} name input의 name
 * @param {string} errorMessage 에러 메시지
 * @param {import('react').MutableRefObject<HTMLInputElement>} ref input의 ref attribute에 연결할 target
 * @param {import('react').InputHTMLAttributes<HTMLInputElement>} attributes input에서 사용 가능한 모든 attributes
 */
export const SelectGenderInput = forwardRef(_SelectGenderInput);
