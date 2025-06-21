export interface IReusableButton
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnText: string;
  isLoading: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}
