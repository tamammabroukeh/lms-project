export interface IReusableSelect {
  defaultValue: string;
  triggerStyle?: string;
  placeholder?: string;
  label?: string;
  onValueChange: (value: string) => void;
  selectValues: {
    title: string;
    value: string;
  }[];
}
