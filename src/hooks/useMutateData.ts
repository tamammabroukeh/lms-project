// import {
//   useMutation,
//   UseMutationOptions,
//   useQueryClient,
// } from "@tanstack/react-query";
// import { AxiosResponse } from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// // import ConvertBinaryToPdf from "utils/convertBinaryToPdf";

// //----***types options***----
// // interface MutationOptions {
// // 	queryFn: (...args: any[]) => Promise<any>;
// // 	onSuccessFn?: (...options: any) => void;
// // 	closeDialog?: () => void;
// // 	multipleKeys?: boolean;
// // 	invalidateKeys?: any[];
// // 	displaySuccess?: boolean;
// // 	onSuccessLink?: string;
// // 	onSuccessLinkQueries?: any;
// //  dispatch:boolean //to indicates if there as any dispatch after success
// //  action : the action that need to be dispatched after success
// //  downloadFile?: boolean;
// // }

// interface IUseMutateDataOptions<T> {
//   onSuccessFn: (
//     data: AxiosResponse<T, any>,
//     variables: FormData,
//     context: unknown
//   ) => void;
//   queryFn: UseMutationOptions<unknown, Error, void, unknown>;
// }

// export const useMutateData = <T>(options: IUseMutateDataOptions<T>) => {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const data = useMutation(options.queryFn, {
//     onSuccess(
//       data: AxiosResponse<T, any>,
//       variables: FormData,
//       context: unknown
//     ): void {
//       // Because the response from the backend adopts this method, I don't know why
//       if (
//         data?.data?.status === 0 ||
//         data?.data?.code == 500 ||
//         data?.data?.code == 404 ||
//         data?.data?.code == 403
//       ) {
//         console.log("data?.data?.msg", data?.data?.msg);
//         typeof data?.data?.msg == "string"
//           ? toast.error(data?.data?.msg)
//           : data?.data?.msg?.map((message: string) => toast.error(message));

//         options.onErrorFn &&
//           options.onErrorFn(data?.data?.msg ?? data?.msg, variables);
//       } else {
//         options.multipleKeys
//           ? options.invalidateKeys &&
//             options.invalidateKeys.map((key) =>
//               queryClient.invalidateQueries(key)
//             )
//           : options.invalidateKeys &&
//             queryClient.invalidateQueries(options.invalidateKeys);
//         options.displaySuccess
//           ? options.successMessage
//             ? toast.success(options.successMessage)
//             : typeof data?.data?.msg == "string"
//             ? toast.success(data?.data?.msg)
//             : data?.data?.msg?.map((message: string) => toast.success(message))
//           : false;

//         options.onSuccessLink &&
//           navigate({
//             pathname: options.onSuccessLink,
//           });
//         options.onSuccessFn &&
//           options.onSuccessFn({ data: data?.data, variables: variables });
//         options.closeDialog && options.closeDialog();
//       }
//     },
//     onError: (error, variables) => {
//       console.log("HEREEERERERERE onError", error);

//       typeof error?.msg == "string"
//         ? toast.error(error?.msg)
//         : error?.msg?.map((message: string) => toast.error(message));
//       options.onErrorFn &&
//         options.onErrorFn(error?.message ?? "Error", variables);
//     },
//   });
//   return data;
// };
import {
  InvalidateQueryFilters,
  MutationFunction,
  MutationKey,
  useMutation,
  useQueryClient,
} from "react-query";
// import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export type UseMutateDataOptions<
  TData = unknown,
  TVariables = unknown,
  TError = unknown
> = {
  mutationFn: MutationFunction<TData, TVariables>;
  mutationKey?: MutationKey;
  invalidateKeys?: InvalidateQueryFilters[]; // QueryKey[] is valid for invalidation
  displaySuccess?: boolean; // Whether to display a success message
  navigateToPath?: string; // Path to navigate after success
  onSuccessFn?: (data: TData, variables: TVariables) => void; // Custom onSuccess handler
  onErrorFn?: (errorMessage: TError, variables: TVariables) => void; // Custom onError handler
};
export const useMutateData = <
  TData = unknown,
  TVariables = unknown,
  TError = unknown
>(
  options: UseMutateDataOptions<TData, TVariables, TError>
) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //   const { t } = useTranslation();
  const data = useMutation<TData, TError, TVariables>({
    mutationFn: options.mutationFn,
    mutationKey: options.mutationKey,
    onSuccess: (data, variables) => {
      console.log("data", data);
      // Invalidate specified queries
      if (options.invalidateKeys) {
        options.invalidateKeys.forEach(
          (key: InvalidateQueryFilters<readonly unknown[]> | undefined) =>
            queryClient.invalidateQueries(key)
        );
      }

      // Display success message if applicable
      if ((data as any)?.data?.message) {
        toast.success((data as any)?.data?.message);
      }

      // Navigate to a specific path if provided
      if (options.navigateToPath) {
        navigate(options.navigateToPath);
      }

      // Call custom onSuccess function
      if (options.onSuccessFn) {
        options.onSuccessFn(data, variables);
      }
    },
    onError: (error: TError, variables: TVariables) => {
      // console.log("in onError mutation", error?.response?.data);
      console.log("in onError mutation", error);

      // Display error message
      if (
        (error as any)?.response?.status === 400 ||
        (error as any)?.response?.status === 408 ||
        (error as any)?.response?.status === 401 ||
        (error as any)?.response?.status === 500
      ) {
        if (
          (error as any)?.response?.data?.errors &&
          typeof (error as any)?.response?.data?.errors !== "string"
        ) {
          console.log("hereeee");
          const {
            data: { errors },
          } = (error as any)?.response;
          errors.map((error: { field: string; message: string }) => {
            console.log("error", error);
            toast.error(error?.message);
          });
        } else {
          toast.error((error as any)?.response?.data?.message);
        }
      } else {
        toast.error((error as any)?.message || "An error occurred");
      }

      // Call custom onError function
      if (options.onErrorFn) {
        options.onErrorFn((error as any)?.message ?? "Error", variables);
      }
    },
  });

  return data;
};
