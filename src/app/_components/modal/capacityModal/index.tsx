"use client";

import { MouseEvent, useState } from "react";

import { NumberPicker, ConfirmModal } from "@components";
import { CapacityModalProps } from "@types";

import styled from "./styles.module.scss";

export function CapacityModal({
  capacityValue,
  setCapacityValue,
  hideModal,
}: CapacityModalProps) {
  const [selectedCapacity, setSelectedCapacity] =
    useState<string>(capacityValue);

  const changeSelectedCapacity = (capacity: string) => {
    setSelectedCapacity(capacity);
  };

  const confirmSelectedCapacity = (event: MouseEvent<HTMLButtonElement>) => {
    setCapacityValue(selectedCapacity);
    hideModal(event);
  };

  return (
    <ConfirmModal
      hideModal={hideModal}
      confirmCallback={confirmSelectedCapacity}
    >
      <div className={styled.modal}>
        <NumberPicker
          value={selectedCapacity}
          updateValue={changeSelectedCapacity}
        />
      </div>
    </ConfirmModal>
  );
}
