"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { HTMLAttributes, useState } from "react";
import { createCustomer } from "@apis";
import { useForm } from "react-hook-form";
import { TEXT, ROUTES } from "@data";
import { useUserStore } from "@store";
import {
  TextInput,
  FormButton,
  FileInput,
  DateInput,
  SelectGenderInput,
} from "@components";
import { CustomerProfileType } from "./schema";
import { IconCalendar, IconCheckboxInvalid } from "@assets";

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
  const router = useRouter();
  const { getToken } = useUserStore();
  const token = getToken();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CustomerProfileType>({
    mode: "onChange",
  });

  const [serverError, setServerError] = useState<{
    title: string;
    duplicate: string;
  }>({ title: "", duplicate: "" });

  const onValid = async (data: any) => {
    try {
      await createCustomer({
        ...data,
        token,
      });
      router.push(ROUTES.SCHEDULE.root);
    } catch (error: any) {
      setServerError(error.message);
    }
  };

  return (
    <div>
      <main>
        <section className={styles.container}>
          <form onSubmit={handleSubmit(onValid)} className={styles.form}>
            <div className={styles.form_body}>
              <div className={styles.upper_container}>
                <InputWrapper name="프로필 이미지">
                  <FileInput {...register("customerProfileImage")} />
                </InputWrapper>
                <InputWrapper name="이름" required={true}>
                  <TextInput
                    {...register("customerName", {
                      required: "이름을 입력해주세요",
                    })}
                    placeholder="이름을 입력해주세요"
                    valid={!errors.customerName}
                    maxLength={30}
                    errorMessage={errors.customerName?.message}
                  />
                </InputWrapper>
                <InputWrapper name="생년월일" required={true}>
                  <DateInput
                    renderIcon={() => <IconCalendar width={14} height={14} />}
                    placeholder="생년월일을 선택해주세요"
                    suffix="종료"
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
                    valid={!errors.customerPhoneNumber}
                    errorMessage={errors.customerPhoneNumber?.message}
                  />
                </InputWrapper>
                <InputWrapper name="성별" required={true}>
                  <SelectGenderInput
                    {...register("customerGender", {
                      required: "성별을 선택해주세요",
                    })}
                    placeholder="성별을 선택해주세요"
                    valid={!errors.customerGender}
                    errorMessage={errors.customerGender?.message}
                  />
                </InputWrapper>
                <InputWrapper name="주소" required={true}>
                  <TextInput
                    {...register("customerAddress", {
                      required: "주소를 입력해주세요",
                    })}
                    placeholder="주소를 입력해주세요"
                    valid={!errors.customerAddress}
                    errorMessage={errors.customerAddress?.message}
                  />
                </InputWrapper>
              </div>
            </div>
            <div className={styles.button_container}>
              <FormButton text="확인" active={isValid} />
            </div>
          </form>
          {serverError.duplicate && (
            <div className={styles.error_message}>
              <IconCheckboxInvalid />
              <p>{serverError.duplicate}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
