"use client";

import {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useRef,
} from "react";

import { AddressInputProps } from "@types";
import { IconInputValid } from "@assets";
import { mergeRefs } from "@utils";

import styled from "./styles.module.scss";

function _AddressInput(
  {
    name,
    valid = true,
    onChange = () => {},
    errorMessage = "",
    ...props
  }: AddressInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const targetRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className={styled.input_wrapper}>
      <input
        {...props}
        name={name}
        className={`${styled.text_input} ${!valid || errorMessage ? styled.invalid : ""}`}
        ref={mergeRefs(targetRef, ref)}
        type="text"
        onChange={onChangeHandler}
      />
      {valid && <IconInputValid width={18} height={18} />}
      {errorMessage && (
        <div className={styled.error_message}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}

/**
 * 상위 컴포넌트에서 AddressInput 대한 className을 직접 설정하지 않도록 주의! (동작하지 않음)
 * @param {string} name input의 name
 * @param {boolean} valid input이 유효한지 여부
 * @param {import('react').MutableRefObject<HTMLInputElement>} ref input의 ref attribute에 연결할 target
 * @param {import('react').InputHTMLAttributes<HTMLInputElement>} attributes input에서 사용 가능한 모든 attributes
 */
export const AddressInput = forwardRef(_AddressInput);
