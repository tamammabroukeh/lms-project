import React from "react";

export interface IReusableDialog {
    isOpen: boolean;
    setIsOpen: (value:boolean) => void;
	dialogHeader?: {title:string, description:string};
	dialogBody?:React.ReactNode;
	dialogFooter?:React.ReactNode;
	contentClassName :string;
    triggerComponent:React.ReactNode;
}