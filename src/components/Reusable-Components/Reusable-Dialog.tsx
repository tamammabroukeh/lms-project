import { Dialog, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IReusableDialog } from "@/interfaces";

const ReusableDialog = ({
	isOpen,
	dialogHeader= {title:"", description:""},
	dialogBody = null,
	dialogFooter = null,
	contentClassName = "max-w-fit",
    triggerComponent,
	setIsOpen
}:IReusableDialog) => {
	return (
		<Dialog 
		onOpenChange={(value) => setIsOpen(value)}
		 open={isOpen}
		 >
             {triggerComponent && <DialogTrigger asChild>
				{triggerComponent}
            </DialogTrigger>}
			<DialogContent className={contentClassName}>
				{dialogHeader && (
					<DialogHeader>
						<DialogTitle>{dialogHeader?.title}</DialogTitle>
						<DialogDescription>{dialogHeader?.description}</DialogDescription>
					</DialogHeader>
				)}
				{dialogBody && dialogBody}
				{dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
			</DialogContent>
		</Dialog>
	);
};

export default ReusableDialog;
