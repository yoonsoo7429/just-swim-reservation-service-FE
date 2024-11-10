"use client";

import { HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  DayInput,
  FormButton,
  HistoryBackHeader,
  TextInput,
  TimeInput,
  CapacityInput,
} from "@components";
import { IconCheckboxInvalid } from "@assets";

import { addFormAction } from "./addAction";
import { courseSchema, courseType } from "./schema";

import styled from "./styles.module.scss";
import { modifyFormAction } from "./modifyAction";

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
  const [serverError, setServerError] = useState<{
    title: string;
    duplicate: string;
  }>({ title: "", duplicate: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<courseType>({
    resolver: zodResolver(courseSchema),
    mode: "onChange",
  });

  const watchFields = watch();

  useEffect(() => {
    if (serverError.duplicate) {
      setServerError({ title: "", duplicate: "" });
    }
  }, [JSON.stringify(watchFields)]);

  const onSubmit = handleSubmit(async (input: courseType) => {
    const timeRange = input.courseTime.split("-");
    const data = {
      courseTitle: input.courseTitle,
      courseStartTime: timeRange[0],
      courseEndTime: timeRange[1],
      courseCapacity: parseInt(input.courseCapacity),
      courseDays: input.courseDays,
    };

    if (type === "add") {
      const result = await addFormAction(data);

      setServerError({
        ...result,
      });
    }

    if (type === "modify") {
      const result = await modifyFormAction(data, id);

      setServerError({
        ...result,
      });
    }
  });

  const onValid = async () => {
    await onSubmit();
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
                <InputWrapper name="수업명" required={true}>
                  <TextInput
                    {...register("courseTitle")}
                    placeholder="수업명을 입력해주세요"
                    valid={!errors.courseTitle && !serverError.title}
                    errorMessage={errors.courseTitle?.message}
                    maxLength={15}
                    defaultValue={isModify ? course?.courseTitle : ""}
                  />
                </InputWrapper>
              </div>
              <div className={styled.divider} />
              <div className={styled.lower_container}>
                <InputWrapper name="강좌 시간" required={true}>
                  <TimeInput
                    {...register("courseTime")}
                    placeholder="시간 선택"
                    defaultValue={
                      isModify && course?.courseTime ? course.courseTime : ""
                    }
                    valid={!errors.courseTime && !serverError.duplicate}
                    errorMessage={errors.courseTime?.message}
                  />
                </InputWrapper>
                <InputWrapper name="강좌 요일" required={true}>
                  <DayInput
                    {...register("courseDays")}
                    placeholder="강좌 요일을 선택해 주세요"
                    defaultValue={isModify ? course?.courseDays : ""}
                    valid={!errors.courseDays && !serverError.duplicate}
                    errorMessage={errors.courseDays?.message}
                  />
                </InputWrapper>
                <InputWrapper name="참여 가능 인원" required={true}>
                  <CapacityInput
                    {...register("courseCapacity")}
                    placeholder="참여 가능 인원을 선택해주세요"
                    defaultValue={isModify ? course?.courseCapacity : ""}
                    valid={!errors.courseCapacity && !serverError.duplicate}
                    errorMessage={errors.courseCapacity?.message}
                  />
                </InputWrapper>
              </div>
            </div>
            <div className={styled.button_container}>
              <FormButton
                text="확인"
                active={isValid && !serverError.duplicate}
                disabled={!isValid || !!serverError.duplicate}
              />
            </div>
          </form>
          {(serverError.title || serverError.duplicate) && (
            <div className={styled.error_container}>
              {serverError.duplicate && (
                <div className={styled.error_message}>
                  <IconCheckboxInvalid />
                  <p>{serverError.duplicate}</p>
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
