import { useMutateData } from "@/hooks";
import axios from "@/api/axiosInstance";
import { createOrder } from "@/api/routes";
const useCreateOrder = () => {

  const createOrderMutation = useMutateData({
    mutationFn: (data) =>
      axios.post(createOrder, data),
    onSuccessFn(data) {
      console.log("data from on success", data);
      if(data?.data?.success && data?.data?.approveUrl){
        localStorage.setItem("currentOrderId", data?.data?.orderId)
        window.location.href = data?.data?.approveUrl;
      }
    },
  });

  const submitHandler = (paymentPayload:any) => {
    createOrderMutation.mutateAsync(paymentPayload)
  }

  return {
    error: createOrderMutation.error,
    isError: createOrderMutation.isError,
    isLoading: createOrderMutation.isLoading,
    isSuccess: createOrderMutation.isSuccess,
    submitHandler,
  };
};

export default useCreateOrder;