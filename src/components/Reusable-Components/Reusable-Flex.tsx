import { IChildren } from "@/interfaces";
import { cn } from "@/lib/utils";
import React from "react";
const Flex = ({
  children,
  classes,
  ...props
}: IChildren & { classes?: string }) => {
  return (
    <div {...props} className={cn("flex justify-center items-center", classes)}>
      {children}
    </div>
  );
};
export default React.memo(Flex);
