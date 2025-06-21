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
  ...props
}: IReusableButton) {
  return (
    <Button
      {...props}
      disabled={disabled || isLoading}
      {...{ variant, type, className }}
    >
      {btnText}
      {isLoading && <Loader2 className="animate-spin" />}
    </Button>
  );
}
