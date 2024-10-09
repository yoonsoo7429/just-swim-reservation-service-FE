export interface TextInputProps {
  name: string;
  valid?: boolean;
  link?: boolean;
  errorMessage: string | undefined;
}

export interface FormButtonProps {
  text: string;
  loading?: string;
  active?: boolean;
}

export interface FileInputProps {
  name: string;
  length?: number;
  size?: number;
}

export interface DayInputProps {
  name: string;
  valid?: boolean;
  errorMessage: string | undefined;
  defaultValue?: string;
}

export interface DateInputProps {
  name: string;
  valid?: boolean;
  defaultValue?: string;
  use?: boolean;
  renderIcon?: Function;
  suffix?: string;
}

export interface SelectGenderInputProps {
  name: string;
  valid?: boolean;
  errorMessage: string | undefined;
}

export interface AddressInputProps {
  name: string;
  valid?: boolean;
  errorMessage: string | undefined;
}

export interface CareerInputProps {
  name: string;
  valid?: boolean;
  errorMessage?: string;
}
