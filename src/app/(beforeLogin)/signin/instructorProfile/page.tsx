"use client";

import styles from "./page.module.scss";
import { HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput, FormButton, FileInput, CareerInput } from "@components";
import { instructorProfileSchema, InstructorProfileType } from "./schema";
import { IconCheckboxInvalid } from "@assets";
import { zodResolver } from "@hookform/resolvers/zod";
import { formAction } from "./action";
import { redirect } from "next/navigation";

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
    <div className={styles.fieldset} {...props}>
      <div className={styles.fieldset_title}>
        <p>{name}</p>
        {required && <span>{"(필수)"}</span>}
      </div>
      {children}
    </div>
  );
}

export default function InstructorProfile() {
  //에러 구분지어주기
  const [serverError, setServerError] = useState<{
    title: string;
    duplicate: string;
  }>({ title: "", duplicate: "" });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<InstructorProfileType>({
    resolver: zodResolver(instructorProfileSchema),
    mode: "onChange",
  });

  const watchFields = watch();

  useEffect(() => {
    if (serverError.duplicate) {
      setServerError({ title: "", duplicate: "" });
    }
  }, [JSON.stringify(watchFields)]);

  const onSubmit = handleSubmit(async (input: InstructorProfileType) => {
    const result = await formAction(input);

    if (result.success) {
      redirect("/schedule");
    } else {
      setServerError({
        title: "",
        duplicate: result.error || "서버 오류 발생",
      });
    }
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div className={styles.profile_header}>
      <section className={styles.container}>
        <form action={onValid} className={styles.form}>
          <div className={styles.form_body}>
            <div className={styles.upper_container}>
              <InputWrapper name="프로필 이미지">
                <FileInput
                  {...register("instructorProfileImage")}
                  name="instructorProfileImage"
                />
              </InputWrapper>
              <InputWrapper name="이름" required={true}>
                <TextInput
                  {...register("instructorName", {
                    required: "이름을 입력해주세요",
                  })}
                  placeholder="이름을 입력해주세요"
                  valid={!errors.instructorName && !serverError.duplicate}
                  maxLength={30}
                  errorMessage={errors.instructorName?.message}
                />
              </InputWrapper>
              <InputWrapper name="전화번호" required={true}>
                <TextInput
                  {...register("instructorPhoneNumber", {
                    required: "전화번호를 입력해주세요",
                  })}
                  placeholder="전화번호를 입력해주세요"
                  maxLength={11}
                  valid={
                    !errors.instructorPhoneNumber && !serverError.duplicate
                  }
                  errorMessage={errors.instructorPhoneNumber?.message}
                />
              </InputWrapper>
            </div>
          </div>

          <div className={styles.button_container}>
            <FormButton
              text="확인"
              active={isValid && !serverError.duplicate}
              disabled={!isValid || !!serverError.duplicate}
            />
          </div>
        </form>
        {serverError.duplicate && (
          <div className={styles.error_message}>
            <IconCheckboxInvalid />
            <p>{serverError.duplicate}</p>
          </div>
        )}
      </section>
    </div>
  );
}
