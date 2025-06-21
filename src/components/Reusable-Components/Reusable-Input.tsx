import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import i18n from "@/i18n/config";
interface ReusableInputProps extends React.ComponentProps<"input"> {
  hasError?: boolean;
}

const ReusableInput = forwardRef<HTMLInputElement, ReusableInputProps>(
  ({ type, className, hasError = false, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    let isPassword = type === "password";
    let iconClasses = "h-4 w-4 text-muted-foreground";
    let isRTL = i18n.language === "ar";
    return (
      <div className="relative">
        <Input
          ref={ref}
          type={isPassword && showPassword ? "text" : type}
          className={cn(
            isRTL ? "pl-10" : "pr-10",
            hasError ? "border-destructive focus-visible:ring-0" : "ring-1",
            className
          )}
          {...props}
        />
        {isPassword && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={cn(
              "absolute right-0 top-0 hover:bg-transparent",
              isRTL ? "left-0" : "right-0"
            )}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword && <EyeOff className={iconClasses} />}
            {!showPassword && <Eye className={iconClasses} />}
          </Button>
        )}
      </div>
    );
  }
);
ReusableInput.displayName = "PasswordInput";
export default React.memo(ReusableInput);
