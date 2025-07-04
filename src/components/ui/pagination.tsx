import * as React from "react"
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { useTypedTranslation } from "@/hooks"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
    <nav
        role="navigation"
        aria-label="pagination"
        className={cn("mx-auto flex w-full justify-center", className)}
        {...props}
    />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
    HTMLUListElement,
    React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
    <ul
        ref={ref}
        className={cn("flex flex-row items-center gap-1", className)}
        {...props}
    />
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
    HTMLLIElement,
    React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
    <li ref={ref} className={cn("", className)} {...props} />
))
PaginationItem.displayName = "PaginationItem"

type PaginationLinkProps = {
    isActive?: boolean
} & Pick<ButtonProps, "size"> &
    React.ComponentProps<"a">

const PaginationLink = ({
    className,
    isActive,
    size = "icon",
    ...props
}: PaginationLinkProps) => (
    <a
        aria-current={isActive ? "page" : undefined}
        className={cn(
            buttonVariants({
                variant: isActive ? "outline" : "ghost",
                size,
            }),
            className
        )}
        {...props}
    />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => {
    const { t, i18n } = useTypedTranslation();
    const isRTL = i18n.language === "ar";

    return (
        <PaginationLink
            aria-label="Go to previous page"
            size="default"
            className={cn("gap-1 px-2.5", className)}
            {...props}
        >
            {isRTL ? (
                <>
                    <ChevronRightIcon className="h-4 w-4" />
                    <ChevronRight className="h-4 w-4" />
                    <span>{t('common:previous')}</span>

                </>
            ) : (
                <>
                    <ChevronLeftIcon className="h-4 w-4" />
                    <ChevronLeft className="h-4 w-4" />
                    <span>{t('common:previous')}</span>
                </>
            )}
        </PaginationLink>
    );
};

PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
    className,
    ...props
}: React.ComponentProps<typeof PaginationLink>) => {
    const { t, i18n } = useTypedTranslation();
    const isRTL = i18n.language === "ar";

    return (
        <PaginationLink
            aria-label="Go to next page"
            size="default"
            className={cn("gap-1 px-2.5", className)}
            {...props}
        >
            {isRTL ? (
                <>
                    <span>{t('common:next')}</span>
                    <ChevronLeftIcon className="h-4 w-4" />
                    <ChevronLeft className="h-4 w-4" />
                </>
            ) : (
                <>
                    <span>{t('common:next')}</span>
                    <ChevronRightIcon className="h-4 w-4" />
                    <ChevronRight className="h-4 w-4" />
                </>
            )}
        </PaginationLink>
    );
};

PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
    className,
    ...props
}: React.ComponentProps<"span">) => (
    <span
        aria-hidden
        className={cn("flex h-9 w-9 items-center justify-center", className)}
        {...props}
    >
    <DotsHorizontalIcon className="h-4 w-4" />
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span >
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
}
