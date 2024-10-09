"use client";

import {
  ChangeEvent,
  ForwardedRef,
  InputHTMLAttributes,
  MouseEvent,
  forwardRef,
  useRef,
  useState,
} from "react";
import { CareerInputProps } from "@types";
import { mergeRefs } from "@utils";
import styled from "./styles.module.scss";

function _CareerInput(
  {
    name,
    valid = true,
    onChange = () => {},
    errorMessage = "",
    ...props
  }: CareerInputProps & InputHTMLAttributes<HTMLInputElement>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [careers, setCareers] = useState([{ id: 1, career: "", content: "" }]);
  const targetRef = useRef<HTMLInputElement>(null);

  const onChangeHandler = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target) return;

    const updatedCareers = [...careers];
    updatedCareers[index] = {
      ...updatedCareers[index],
      [event.target.name]: event.target.value,
    };
    setCareers(updatedCareers);

    onChange(event);
  };

  const updateCareerHandler = (
    index: number,
    action: "add" | "remove",
    event: MouseEvent<HTMLLabelElement>
  ) => {
    event.preventDefault();
    let updatedCareers = [...careers];

    if (action === "add") {
      updatedCareers = [
        ...careers,
        { id: careers.length + 1, career: "", content: "" },
      ];
    } else if (action === "remove") {
      updatedCareers = careers.filter((_, idx) => idx !== index);
    }

    setCareers(updatedCareers);
  };

  return (
    <div className={styled.career_input_wrapper}>
      {careers.map((career, index) => (
        <div key={career.id} className={styled.input_row}>
          <input
            {...props}
            name={name}
            className={styled.text_input}
            ref={index === 0 ? mergeRefs(targetRef, ref) : undefined}
            type="text"
            placeholder="경력 기간"
            value={career.career}
            onChange={(event) => onChangeHandler(index, event)}
          />
          <input
            {...props}
            name={name}
            className={styled.text_input}
            type="text"
            placeholder="경력 사항"
            value={career.content}
            onChange={(event) => onChangeHandler(index, event)}
          />
          <label
            className={styled.remove_label}
            onClick={(event) => updateCareerHandler(index, "remove", event)}
          >
            <span>-</span>
          </label>
        </div>
      ))}
      <label
        className={styled.add_label}
        onClick={(event) => updateCareerHandler(0, "add", event)}
      >
        <span>+</span>
      </label>
    </div>
  );
}

export const CareerInput = forwardRef(_CareerInput);
