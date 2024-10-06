"use client";

import styles from "./page.module.scss";
import { HTMLAttributes, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  TextInput,
  FormButton,
  FileInput,
  DateInput,
  SelectGenderInput,
  AddressInput,
} from "@components";
import { customerProfileSchema, CustomerProfileType } from "./schema";
import { IconCalendar, IconCheckboxInvalid } from "@assets";
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

export default function CustomerProfile() {
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
  } = useForm<CustomerProfileType>({
    resolver: zodResolver(customerProfileSchema),
    mode: "onChange",
  });

  const watchFields = watch();

  useEffect(() => {
    if (serverError.duplicate) {
      setServerError({ title: "", duplicate: "" });
    }
  }, [JSON.stringify(watchFields)]);

  const onSubmit = handleSubmit(async (input: CustomerProfileType) => {
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
                  {...register("customerProfileImage")}
                  name="customerProfileImage"
                />
              </InputWrapper>
              <InputWrapper name="이름" required={true}>
                <TextInput
                  {...register("customerName", {
                    required: "이름을 입력해주세요",
                  })}
                  placeholder="이름을 입력해주세요"
                  valid={!errors.customerName && !serverError.duplicate}
                  maxLength={30}
                  errorMessage={errors.customerName?.message}
                />
              </InputWrapper>
              <InputWrapper name="생년월일" required={true}>
                <DateInput
                  renderIcon={() => <IconCalendar width={14} height={14} />}
                  placeholder="생년월일을 선택해주세요"
                  {...register("customerBirth")}
                  // @ts-ignore
                  errors={[errors.customerBirth?.message ?? ""]}
                />
              </InputWrapper>
              <InputWrapper name="전화번호" required={true}>
                <TextInput
                  {...register("customerPhoneNumber", {
                    required: "전화번호를 입력해주세요",
                  })}
                  placeholder="전화번호를 입력해주세요"
                  maxLength={11}
                  valid={!errors.customerPhoneNumber && !serverError.duplicate}
                  errorMessage={errors.customerPhoneNumber?.message}
                />
              </InputWrapper>
              <InputWrapper name="성별" required={true}>
                <SelectGenderInput
                  {...register("customerGender", {
                    required: "성별을 선택해주세요",
                  })}
                  placeholder="성별을 선택해주세요"
                  valid={!errors.customerGender && !serverError.duplicate}
                  errorMessage={errors.customerGender?.message}
                />
              </InputWrapper>
              <InputWrapper name="주소" required={true}>
                <AddressInput
                  {...register("customerAddress", {
                    required: "주소를 입력해주세요",
                  })}
                  placeholder="주소를 입력해주세요"
                  valid={!errors.customerAddress && !serverError.duplicate}
                  errorMessage={errors.customerAddress?.message}
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
