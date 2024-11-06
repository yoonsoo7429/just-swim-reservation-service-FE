"use client";

import { useEffect, useMemo, useState } from "react";

import { numberFormat } from "@utils";
import { NumberPickerProps } from "@types";
import { VerticalSliderLoop } from "@components";

import styled from "./styles.module.scss";

const itemHeight = 60;
const itemsToShow = 3;

const generateNumberItems = () => {
  return new Array(20).fill(0).map((_, index) => numberFormat(index + 1));
};

export function NumberPicker({ value, updateValue }: NumberPickerProps) {
  const capacityValue = parseInt(value);

  const [selectedNumber, setSelectedNumber] = useState<string>(
    numberFormat(capacityValue)
  );

  useEffect(() => {
    updateValue(`${parseInt(selectedNumber)}`);
  }, [selectedNumber]);

  const numberList = useMemo(() => generateNumberItems(), []);

  const updateNumber = (number: string) => {
    setSelectedNumber(number);
  };

  return (
    <div className={styled.container}>
      <VerticalSliderLoop
        itemList={numberList}
        initialItem={selectedNumber}
        updateItem={updateNumber}
        itemHeight={itemHeight}
        itemsToShow={itemsToShow}
        useBorder={true}
      />
    </div>
  );
}
