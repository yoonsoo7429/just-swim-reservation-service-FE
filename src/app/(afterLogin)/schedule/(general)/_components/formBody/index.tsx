"use client";

import { HTMLAttributes, MouseEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DayInput,
  FormButton,
  HistoryBackHeader,
  TextInput,
  TimeInput,
} from "@components";
import { IconCheckboxInvalid } from "@assets";

import { formAction } from "./action";
import { courseSchema, courseType } from "./schema";

import styled from "./styles.module.scss";

function InputWrapper({
  children,
  name,
  required = false,
  ...props
}: {
  children?: React.ReactNode;
  name: string;
  required?: boolean;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={styled.fieldset} {...props}>
      <div className={styled.fieldset_title}>
        <p>{name}</p>
        {required && <span>{"(필수)"}</span>}
      </div>
      {children}
    </div>
  );
}

export function FormBody({
  type = "add",
  id = "",
  course,
}: {
  type?: "add" | "modify";
  id?: string;
  course?: courseType;
}) {
  const isModify = type === "modify";
  const [serverErrors, setServerErrors] = useState<{
    title: string;
    duplicate: string;
  }>({ title: "", duplicate: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<courseType>({
    resolver: zodResolver(courseSchema),
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (input: courseType) => {
    const data = {
      ...input,
    };

    const result = await formAction(data, type, id);

    setServerErrors({
      ...result,
    });
  });

  const onValid = async () => {
    await onSubmit();
  };

  const clearTitleError = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setServerErrors((s) => ({
      ...s,
      title: "",
    }));
  };

  const clearDuplicateError = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setServerErrors((s) => ({
      ...s,
      duplicate: "",
    }));
  };

  return (
    <div>
      <HistoryBackHeader
        title={type === "add" ? "수업 등록하기" : "수업 수정하기"}
      />
      <main>
        <section className={styled.container}>
          <form action={onValid} className={styled.form}>
            <div className={styled.form_body}>
              <div className={styled.upper_container}>
                <InputWrapper
                  name="수업명"
                  required={true}
                  onClick={clearTitleError}
                >
                  <TextInput
                    {...register("courseTitle")}
                    placeholder="수업명을 입력해주세요"
                    valid={!errors.courseTitle && !serverErrors.title}
                    errorMessage={errors.courseTitle?.message}
                    maxLength={15}
                    defaultValue={isModify ? course?.courseTitle : ""}
                  />
                </InputWrapper>
              </div>
              <div className={styled.divider} />
              <div className={styled.lower_container}>
                <InputWrapper
                  name="강좌 시간"
                  required={true}
                  onClick={clearDuplicateError}
                >
                  <TimeInput
                    {...register("courseStartTime")}
                    placeholder="시간 선택"
                    defaultValue={isModify ? course?.courseStartTime : ""}
                    valid={!errors.courseStartTime && !serverErrors.duplicate}
                    errorMessage={errors.courseStartTime?.message}
                  />
                </InputWrapper>
                <InputWrapper
                  name="강좌 요일"
                  required={true}
                  onClick={clearDuplicateError}
                >
                  <DayInput
                    {...register("courseDays")}
                    placeholder="강좌 요일을 선택해 주세요"
                    defaultValue={isModify ? course?.courseDays : ""}
                    valid={!errors.courseDays && !serverErrors.duplicate}
                    errorMessage={errors.courseDays?.message}
                  />
                </InputWrapper>
              </div>
            </div>
            <div className={styled.button_container}>
              <FormButton
                text="확인"
                active={isValid && !serverErrors.duplicate}
              />
            </div>
          </form>
          {(serverErrors.title || serverErrors.duplicate) && (
            <div className={styled.error_container}>
              {serverErrors.title && (
                <div className={styled.error_message}>
                  <IconCheckboxInvalid />
                  <p>{serverErrors.title}</p>
                </div>
              )}
              {serverErrors.duplicate && (
                <div className={styled.error_message}>
                  <IconCheckboxInvalid />
                  <p>{serverErrors.duplicate}</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
