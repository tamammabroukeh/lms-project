import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react";

interface IReusableAlertDialog {
  open: boolean;
  setOpen: (value: boolean) => void
  title?: string
  description?: string
  triggerComponent: React.ReactNode;
  isLoading: boolean;
  submitHandler: () => void
}
export default function ReusableAlertDialog({ open, setOpen, submitHandler, isLoading, triggerComponent, title = "Are you absolutely sure to delete this course?", description = "This action cannot be undone. This will permanently delete your course" }: IReusableAlertDialog) {
  return (
    <AlertDialog open={open}>
      <AlertDialogTrigger asChild>
        {triggerComponent}
        {/* <Button variant="outline">Show Dialog</Button> */}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)} className="bg-gray-500 text-white px-3 py-2 rounded-md">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={submitHandler} className="flex gap-1 items-center bg-red-500 text-white px-3 py-2 rounded-md">
            Continue
            {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

