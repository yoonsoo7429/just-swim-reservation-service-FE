import React from "react";

import { WEEK_DAYS } from "@data";
import { randomId } from "@utils";

import styled from "./styles.module.scss";

function _MonthlyInfo({
  currentMonth,
}: {
  currentYear: number;
  currentMonth: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
}) {
  return (
    <div className={styled.container}>
      <div className={styled.month_info}>
        <p>{currentMonth + 1}월</p>
      </div>
      <div className={styled.week_days}>
        {WEEK_DAYS.map((d, idx) => {
          return (
            <div
              key={randomId()}
              className={`${styled.weeek_item} ${idx === 0 && styled.sunday} ${idx === 6 && styled.saturday}`}
            >
              <span>{d}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const MonthlyInfo = React.memo(_MonthlyInfo);
