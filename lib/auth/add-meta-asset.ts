import { AppError } from "@/utils/app-error";
import { axiosAPI } from "@/utils/axios";

export const addMetaAssts = async (val: number) => {
  try {
    const res = await axiosAPI.post("/AddMetaAssetOrder", {
      Qty: val,
    });
    return res.data;
  } catch (error: any) {
    const errorMessage = "Failed to add meta assets";
    if (error.response?.status === 500) {
      throw new AppError(error, errorMessage, "addMetaAssts");
    } else {
      throw new AppError(
        error,
        error.response?.data?.error ?? errorMessage,
        "addMetaAssts",
      );
    }
  }
};
