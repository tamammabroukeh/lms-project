export interface IActiveTab {
  activeTab?: string;
}
export interface IReusableTabs {
  value: string;
  defaultValue: string;
  onValueChange: (value: string) => void;
  styleForTab?: string;
  styleForTabList?: string;
  styleForTabTrigger?: string;
  tabTriggerValues: {
    title: string;
    value: string;
  }[];
  tabContentValues: {
    value: string;
    children: React.ReactNode;
  }[];
}
