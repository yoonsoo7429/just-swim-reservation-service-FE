"use client";

import { CapacityInputProps } from "@types";
import {
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

import { mergeRefs, numberFormat } from "@utils";

import { IconCapacity, IconInputValid } from "@assets";
import styled from "./styles.module.scss";
import { CapacityModal } from "@/_components/modal";
import { useModal } from "@hooks";

const checkCapacityValue = (defaultValue: string) => {
  const regexp = /^\d+$/;
  return regexp.test(defaultValue);
};

const CapacityBlock = ({
  selectedCapacity,
  changeSelectedCapacity,
  defaultCapacityValue = "6",
  placeholder = "",
  valid,
}: {
  selectedCapacity: string;
  changeSelectedCapacity: (capacity: string) => void;
  defaultCapacityValue?: string;
  placeholder?: string;
  valid: boolean;
}) => {
  const { modal, showModal, hideModal } = useModal();

  const capacityValue = parseInt(selectedCapacity);

  return (
    <div className={styled.input_wrapper}>
      <div
        className={`${styled.capacity_input} ${
          selectedCapacity ? "" : styled.empty
        } ${!valid && styled.invalid}`}
        onClick={showModal}
      >
        <span>
          {selectedCapacity ? `${numberFormat(capacityValue)}` : placeholder}
        </span>
      </div>
      {modal && (
        <CapacityModal
          capacityValue={selectedCapacity || defaultCapacityValue}
          setCapacityValue={changeSelectedCapacity}
          hideModal={hideModal}
        />
      )}
    </div>
  );
};

function _CapacityInput(
  {
    name,
    valid = true,
    defaultValue = "",
    defaultCapacityValue = "6",
    errorMessage = "",
    ...props
  }: CapacityInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const inputRef = useRef<HTMLInputElement>(null);

  const flag = checkCapacityValue(defaultValue);
  const [capacity, setCapacity] = useState<string>(flag ? defaultValue : "");

  const changeCapacity = (newCapacity: string) => {
    setCapacity(newCapacity);
  };

  useEffect(() => {
    if (!capacity) return;

    if (inputRef.current) {
      inputRef.current.setAttribute("value", capacity);
      inputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  }, [capacity]);

  return (
    <div className={styled.wrapper}>
      <CapacityBlock
        selectedCapacity={capacity}
        changeSelectedCapacity={changeCapacity}
        defaultCapacityValue={defaultCapacityValue}
        placeholder="참여 가능 인원"
        valid={valid}
      />
      <div className={styled.icon_wrapper}>
        <IconCapacity width={20} height={20} />
      </div>
      {valid && (
        <div
          className={`${styled.valid_wrapper} ${capacity ? "" : styled.empty}`}
        >
          <IconInputValid width={18} height={18} />
        </div>
      )}
      {checkCapacityValue(inputRef.current?.value || "") && errorMessage && (
        <div className={styled.error_message}>
          <p>{errorMessage}</p>
        </div>
      )}
      {errorMessage && (
        <div className={styled.error_message}>
          <p>{errorMessage}</p>
        </div>
      )}
      <input
        {...props}
        name={name}
        ref={mergeRefs(inputRef, ref)}
        type="text"
        readOnly
        hidden
      />
    </div>
  );
}

export const CapacityInput = forwardRef(_CapacityInput);
