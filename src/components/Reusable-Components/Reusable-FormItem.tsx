import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import ReusableInput from "./Reusable-Input";
import { IReusableFormItem } from "@/interfaces";
import React from "react";
const ReusableFormItem =({ fieldError, form, input, renderCustomField, name }: IReusableFormItem) => {
    return (
        <FormField
            control={form.control}
            name={name}
            key={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{input.label}</FormLabel>
                    <FormControl>
                        {renderCustomField ? (
                            renderCustomField(field, input, form)
                        ) : (
                            <ReusableInput
                                className={`bg-white w-full h-10 ${input.className || ""
                                    }`}
                                hasError={!!fieldError}
                                type={input.type}
                                placeholder={input.placeholder}
                                {...field}
                            />
                        )}
                    </FormControl>
                    {fieldError && (
                        <FormMessage className="!mt-[2px]">
                            {fieldError.message as string}
                        </FormMessage>
                    )}
                </FormItem>
            )}
        />
    )
}
export default React.memo(ReusableFormItem)