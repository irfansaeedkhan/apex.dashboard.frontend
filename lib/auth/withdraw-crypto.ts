import { AppError } from "@/utils/app-error";
import { axiosAPI } from "@/utils/axios";
import toast from "react-hot-toast";

interface Props {
  WhitdrawAmount: string;
  WhitdrawAddress: string;
}

export const withdrawCrypto = async (data: Props) => {
  try {
    const res = await axiosAPI.post("/WithdrawCrypto", data);

    return res.data;
  } catch (error: any) {
    const errorMessage = "Failed to withdraw";
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, "withdrawCrypto");
    } else {
      toast.error(error.response?.data?.error ?? errorMessage);
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        "withdrawCrypto",
      );
    }
  }
};
