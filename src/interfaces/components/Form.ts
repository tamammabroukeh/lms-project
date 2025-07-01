import { TNameSignFormControl } from "@/types";
import { FormEvent } from "react";
import {
  UseFormReturn,
  SubmitHandler,
  FieldValues,
  FieldErrors,
} from "react-hook-form";

export interface IReusableForm<T extends FieldValues> {
  inputs: ISignFormControls[];
  submitHandler: SubmitHandler<T>;
  submitButtonText?: string;
  isLoading: boolean;
  form: UseFormReturn<T>;
  className?: string;
  errors: FieldErrors<T>;
  children?:React.ReactNode;
  renderCustomField?: (
    field: any,
    inputConfig: ISignFormControls,
    methods: UseFormReturn<T>
  ) => React.ReactNode;
  link?: {
    path: string;
    title: string;
    handleClick?: () => void;
  };
}

export interface ISignFormControls {
  name?: TNameSignFormControl;
  label: string;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
}
export interface IFormControl {
  formControls: ISignFormControls[] | [];
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export interface ICommonForm<T> {
  handleSubmit: (event: FormEvent) => Promise<void>;
  buttonText: string;
  formControls: ISignFormControls[] | [];
  formData: T extends FormData ? any : any;
  setFormData: React.Dispatch<
    React.SetStateAction<T extends FormData ? any : any>
  >;
  isButtonDisabled: boolean;
}

// Form item
export interface IReusableFormItem{
  input:ISignFormControls;
  name:any;
  form:UseFormReturn;
  renderCustomField?: (
    field: any,
    inputConfig: ISignFormControls,
    methods: UseFormReturn
  ) => React.ReactNode;
  fieldError: any
}