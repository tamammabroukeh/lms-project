import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IReusableCard } from "@/interfaces";
import { cn } from "@/lib/utils";
import React from "react";
import { Typography } from "../ui/typography";
const ReusableCard = ({
  children,
  description,
  specificDescription,
  title,
  descriptionStyle,
  titleStyle = "text-3xl",
  headerStyle = "text-center !p-5",
  styleForCard,
  styleForContent = "space-y-2",
  Icon,
  iconClasses = "size-10 mx-auto",
}: IReusableCard) => {
  return (
    <Card className={cn("px-4", styleForCard)}>
      <CardHeader className={headerStyle}>
        {Icon && (
          <div className="p-8 mx-auto border-2 rounded-full">
            <Icon className={iconClasses} />
          </div>
        )}
        {title && <CardTitle className={titleStyle}>{title}</CardTitle>}
        {description && (
          <CardDescription className={descriptionStyle}>
            {description}
            {specificDescription && (
              <Typography weight={"semibold"} className="text-center">
                {specificDescription}
              </Typography>
            )}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className={styleForContent}>{children}</CardContent>
    </Card>
  );
};
export default React.memo(ReusableCard);
