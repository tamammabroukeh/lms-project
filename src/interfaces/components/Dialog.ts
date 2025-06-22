import React from "react";

export interface IReusableDialog {
    isOpen: boolean;
	dialogHeader?: {title:string, description:string};
	dialogBody?:React.ReactNode;
	dialogFooter?:React.ReactNode;
	contentClassName :string;
	closeDialog:(value:boolean) => void;
    triggerComponent:React.ReactNode;
}