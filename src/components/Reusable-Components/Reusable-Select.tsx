import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IReusableSelect } from "@/interfaces";
import React from "react";
const ReusableSelect = ({
  defaultValue,
  placeholder,
  selectValues,
  onValueChange,
  triggerStyle,
  label,
}: IReusableSelect) => {
  return (
    <Select {...{ defaultValue, onValueChange }}>
      {placeholder && (
        <SelectTrigger className={triggerStyle}>
          <SelectValue {...{ placeholder }} />
        </SelectTrigger>
      )}
      <SelectContent>
        <SelectGroup>
          {label && <SelectLabel>{label}</SelectLabel>}
          {selectValues.map(({ title, value }) => (
            <SelectItem key={value} {...{ value }}>
              {title}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
export default React.memo(ReusableSelect);
