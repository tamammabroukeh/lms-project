import { Button } from "@/components/ui/button";
import { IReusableButton } from "@/interfaces";
import { Loader2 } from "lucide-react";

export default function ReusableButton({
  btnText,
  type = "submit",
  className,
  disabled,
  isLoading,
  variant,
  children,
  ...props
}: IReusableButton) {
  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      {...{ variant, type, className }}
    >
      {children}
      {btnText}
      {isLoading && <Loader2 className="animate-spin" />}
    </Button>
  );
}
