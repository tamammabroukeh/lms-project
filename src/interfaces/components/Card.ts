import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
export interface IReusableCard {
  title: string | React.ReactNode;
  titleStyle?: string;
  styleForCard?: string;
  description?: string;
  descriptionStyle?: string;
  specificDescription?: string;
  children: React.ReactNode;
  styleForContent?: string;
  headerStyle?: string;
  Icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  iconClasses?: string;
}