interface PasswordInputFieldProps {
    icon: string;
    value: string;
    setValue: (value: string) => void;
    content: string;
    disabled: boolean;
  }

  interface InputFieldProps {
    icon: string;
    value: string;
    setvalue: (value: string) => void;
    content: string;
    type: string;
    disabled: boolean;
  }

export type {PasswordInputFieldProps,InputFieldProps}