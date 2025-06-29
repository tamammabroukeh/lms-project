import { Form } from "@/components/ui/form";
import { IReusableForm, ISignFormControls } from "@/interfaces";
import { FieldErrors, FieldValues, UseFormReturn } from "react-hook-form";
import { cn } from "@/lib/utils";
import { ReusableButton } from ".";
import React from "react";
import ReusableFlex from "./Reusable-Flex";
import { Link } from "react-router-dom";
import ReusableFormItem from "./Reusable-FormItem";

const ReusableForm = <T extends FieldValues>({
  inputs,
  submitHandler,
  form,
  submitButtonText = "Submit",
  className,
  isLoading,
  errors,
  renderCustomField,
  children,
  link = { title: "", path: "", handleClick() { } },
}: IReusableForm<T>) => {
  let disabledBtn = isLoading || Object.entries(errors).length > 0;
  return (
    <Form {...form}>
      <form
        className={cn("space-y-4", className)}
        onSubmit={form.handleSubmit(submitHandler)}
      >
        {children}
        {inputs.map((input) => {
          const fieldError = errors[input.name as keyof FieldErrors<T>];
          return (
            <ReusableFormItem
              name={input.name}
              fieldError={fieldError}
              form={form as UseFormReturn}
              input={input}
              renderCustomField={renderCustomField as (
                field: any,
                inputConfig: ISignFormControls,
                methods: UseFormReturn
              ) => React.ReactNode}
            />
            // <FormField
            //   control={form.control}
            //   name={input.name as any}
            //   key={input.name}
            //   render={({ field }) => (
            //     <FormItem>
            //       <FormLabel>{input.label}</FormLabel>
            //       <FormControl>
            //         {renderCustomField ? (
            //           renderCustomField(field, input, form)
            //         ) : (
            //           <ReusableInput
            //             className={`bg-white w-full h-10 ${
            //               input.className || ""
            //             }`}
            //             hasError={!!fieldError}
            //             type={input.type}
            //             placeholder={input.placeholder}
            //             {...field}
            //           />
            //         )}
            //       </FormControl>
            //       {fieldError && (
            //         <FormMessage className="!mt-[2px]">
            //           {fieldError.message as string}
            //         </FormMessage>
            //       )}
            //     </FormItem>
            //   )}
            // />
          );
        })}
        {submitButtonText && (
          <ReusableButton
            btnText={submitButtonText}
            isLoading={isLoading}
            className="w-full"
            disabled={disabledBtn}
          />
        )}
        {link.title && (
          <ReusableFlex>
            <Link
              onClick={link.handleClick}
              className="text-md font-medium"
              to={link.path}
            >
              {link.title}
            </Link>
          </ReusableFlex>
        )}
      </form>
    </Form>
  );
};
export default React.memo(ReusableForm) as typeof ReusableForm;
