import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IReusableTabs } from "@/interfaces";
import React from "react";

const ReusableTabs = ({
  defaultValue,
  onValueChange,
  styleForTab = "w-full max-w-md",
  styleForTabList = "grid grid-cols-2 w-full !h-11",
  styleForTabTrigger = "py-2",
  tabContentValues,
  tabTriggerValues,
  value,
}: IReusableTabs) => {
  return (
    <Tabs {...{ value, defaultValue, onValueChange }} className={styleForTab}>
      {tabTriggerValues && (
        <TabsList className={styleForTabList}>
          {tabTriggerValues?.map((trigger) => (
            <TabsTrigger
              className={styleForTabTrigger}
              key={trigger.value}
              value={trigger.value}
            >
              {trigger.title}
            </TabsTrigger>
          ))}
        </TabsList>
      )}
      {tabContentValues &&
        tabContentValues?.map((content) => (
          <TabsContent key={content.value} value={content.value}>
            {content.children}
          </TabsContent>
        ))}
    </Tabs>
  );
};
export default React.memo(ReusableTabs);
