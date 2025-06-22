import { QueryKey } from "@tanstack/react-query";

export type UseFetchDataParams<TData = any, _ = any, TSelected = any> = {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enableCondition?: boolean;
  refetchOnMount?: boolean;
  retry?: number;
  onSuccessFn?: (data: TSelected) => void;
  onErrorFn?: (errorMessage: string) => void;
  selectFn?: (data: TData) => TSelected;

  dontFetchOnMount?:boolean;
	keepPreviousData?:boolean;
	preventShowError?:boolean;
};