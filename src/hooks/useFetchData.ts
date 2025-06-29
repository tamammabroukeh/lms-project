// import { UseFetchDataParams } from "@/types/hooks-types";
// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { useToast } from "./use-toast";

// export const useFetchData = <TData = any, TError = any, TSelected = TData>({
//   queryKey,
//   queryFn,
//   enableCondition = true,
//   refetchOnMount,
//   selectFn,
//   onErrorFn,
//   onSuccessFn,
//   retry,
// }: UseFetchDataParams<TData, TError, TSelected>) => {
//   const { toast } = useToast();
//   const data = useQuery<TData, TError, TSelected>({
//     queryKey,
//     queryFn,
//     refetchOnWindowFocus: false,
//     refetchOnMount: refetchOnMount ?? true,
//     retry: retry ?? 1,
//     enabled: enableCondition,

//     select: (data: TData) => {
//       if (selectFn) {
//         return selectFn(data);
//       }
//       return data as any;
//     },
//   });
//   useEffect(() => {
//     if (data?.isError) {
//       toast({ title: (data.error as Error)?.message, variant: "destructive" });
//       onErrorFn && onErrorFn((data.error as Error)?.message);
//     }
//   }, [data?.isError]);
//   useEffect(() => {
//     onSuccessFn && data?.isSuccess && onSuccessFn(data?.data as TSelected);
//   }, [data?.isSuccess]);

//   return data;
// };





// import { UseFetchDataParams } from "@/types/hooks-types";
// import { useQuery } from "react-query";
// import { toast, ToastContent } from "react-toastify";

// export const useFetchData = ({
// 	queryKey,
// 	queryFn,
// 	enableCondition = true,
// 	dontFetchOnMount,
// 	onSuccessFn,
// 	keepPreviousData = true,
// 	onErrorFn,
// 	selectFn,
// 	preventShowError = false,
// } :UseFetchDataParams) => {
// 	const data = useQuery({
// 		queryKey,
// 		queryFn,
// 		keepPreviousData: keepPreviousData ?? false,
// 		refetchOnWindowFocus: false,
// 		refetchOnMount: dontFetchOnMount ? false : true,
// 		retry: 1,
// 		enabled: enableCondition,
// 		onError: (error : {message:ToastContent<unknown>}) => {
// 			toast.error(error?.message);
// 			onErrorFn && onErrorFn(error?.message as string);
// 		},

// 		onSuccess: (data) => {
// 			// console.log("data?.data?.msg", data?.data?.msg)
// 			// Because the response from the backend adopts this method, I don't know why
// 			if (data?.data?.status === 0 || data?.data?.code == 500 || data?.data?.code == 404 || data?.data?.code == 400) {
// 				// toast.error(data.data.msg ?? data.msg);

// 				// data.data.msg?.map((el) => toast.error(el)) ?? data.msg?.map((el) => toast.error(el));
// 				data?.data?.status == 0 && !preventShowError
// 					? typeof data?.data?.msg == "string"
// 						? toast.error(data?.data?.msg)
// 						: data?.data?.msg?.map((message:ToastContent<unknown>) => toast.error(message))
// 					: "";
// 				onErrorFn && onErrorFn(data?.data?.msg ?? data?.msg);
// 			} else {
// 				onSuccessFn && onSuccessFn(data);
// 			}
// 		},

// 		select: (data) => {
// 			if (selectFn) {
// 				return selectFn(data);
// 			}
// 			const FetchData = Array.isArray(data?.data) ? data?.data?.map((el:unknown) => el) : data?.data;
// 			return { data: FetchData };
// 		},
// 	});

// 	return data;
// };


import { UseFetchDataParams } from "@/types";
import { useQuery } from "react-query";
import { useEffect } from "react";
import { useToast } from "./use-toast";

export const useFetchData = <TData = any, TError = any, TSelected = TData>({
  queryKey,
  queryFn,
  enableCondition = true,
  refetchOnMount,
  selectFn,
  onErrorFn,
  onSuccessFn,
  retry,
}: UseFetchDataParams<TData, TError, TSelected>) => {
  const { toast } = useToast();
  const data = useQuery<TData, TError, TSelected>({
    queryKey,
    queryFn,
    refetchOnWindowFocus: false,
    refetchOnMount: refetchOnMount ?? true,
    retry: retry ?? 1,
    enabled: enableCondition,

    select: (data: TData) => {
      if (selectFn) {
        return selectFn(data);
      }
      return data as any;
    },
  });
  useEffect(() => {
    if (data?.isError) {
      toast({ title: (data.error as Error)?.message, variant: "destructive" });
      onErrorFn && onErrorFn((data.error as Error)?.message);
    }
  }, [data?.isError]);
  useEffect(() => {
    onSuccessFn && data?.isSuccess && onSuccessFn(data?.data as TSelected);
  }, [data?.isSuccess, data?.data]);

  return data;
};
