import { Alert, Check, DollarCoin } from "@/assets/svgs";
import { Button } from "@/components/shared";
import ModalContainer from "@/components/shared/modal-container";
import { AppRoutes } from "@/constants/app-routes";
import { addMetaAssts } from "@/lib/auth/add-meta-asset";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { IoClose } from "react-icons/io5";

interface Props {
  open: boolean;
  onClose: () => void;
  numberOfUnits: number;
  totalamount: number;
  StartDate: string;
  duration: number;
}

export const CreateOrderModal: React.FC<Props> = ({
  open,
  onClose,
  totalamount,
  numberOfUnits,
  StartDate,
  duration,
}) => {
  const [isLoading, setIsLoading] = useState("idle");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const endDate = dayjs(StartDate).add(duration, "month").format("DD MMM YYYY");

  const handleConfirm = async () => {
    setIsLoading("pending");
    try {
      const res = await addMetaAssts(numberOfUnits);
      setSuccess(true);
      setFailure(false);
      setIsLoading("resolved");
      toast.success("Order created successfully");
    } catch (error: any) {
      setFailure(true);
      setSuccess(false);
      toast.error(error.message);
      setIsLoading("rejected");
    }
  };

  const handleClose = () => {
    onClose();
    setFailure(false);
    setSuccess(false);
    setIsLoading("idle");
  };

  return (
    <ModalContainer
      modalId="create-order-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-2xl max-w-[518px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <DollarCoin />
            <h3 className="text-blue-shade-1 font-bai-jamjuree text-xl font-semibold">
              Your Order
            </h3>
          </div>
          <span onClick={onClose}>
            <IoClose className="size-4 cursor-pointer stroke-2" />
          </span>
        </div>
        {!success && !failure && (
          <>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <p className="text-blue-shade-1 text-sm font-medium opacity-60">
                  Amount
                </p>
                <div className="flex items-center gap-1">
                  <Image
                    src="/images/USDT.png"
                    alt="USDT"
                    width={20}
                    height={20}
                    className="h-5 w-auto shrink-0"
                  />{" "}
                  <p className="text-blue-shade-1 text-xl font-semibold">
                    {totalamount} USDT
                  </p>
                </div>

                <p className="rounded-md border border-[#E38800] bg-[#FFD79B] px-2 py-0.5 text-[11px] font-medium text-[#9F5F00]">
                  To be paid
                </p>
              </div>
              <div className="flex flex-col gap-[14px] rounded-[20px] border border-white/[0.04] bg-[#F7F7F7] p-4">
                <div className={mainWrap}>
                  <h3 className={firstChild}>UUID</h3>
                  <h3 className={secondChild}> --- </h3>
                </div>
                <div className={mainWrap}>
                  <h3 className={firstChild}>Meta Assets Purchased</h3>
                  <h3 className={secondChild}>{numberOfUnits}</h3>
                </div>
                <div className={mainWrap}>
                  <h3 className={firstChild}>Start Date</h3>
                  <h3 className={secondChild}>
                    {dayjs(StartDate).format("DD MMM YYYY")}
                  </h3>
                </div>
                <div className={mainWrap}>
                  <h3 className={firstChild}>End Date</h3>
                  <h3 className={secondChild}>{endDate}</h3>
                </div>
              </div>
            </div>
            <Button
              title="Confirm"
              className="w-full"
              loaderIcon={
                isLoading === "pending" && (
                  <CgSpinner className="mx-auto size-5 animate-spin" />
                )
              }
              onClick={handleConfirm}
            />
          </>
        )}
        {success && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Check />
            <div className="flex flex-col gap-1">
              <h3 className="text-blue-shade-1 text-lg">
                Order Created Successfully
              </h3>
              <p className="text-sm text-gray-shade-5">
                Your order has been created ,
                <Link
                  href={AppRoutes.profile.my_invoice}
                  className="font-semibold-1 text-blue-shade-1 cursor-pointer underline"
                >
                  View your invoice
                </Link>
              </p>
            </div>
            <Button title="Continue" className="w-full" onClick={handleClose} />
          </div>
        )}
        {failure && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Alert />
            <div className="flex flex-col gap-1">
              <h3 className="text-blue-shade-1 text-lg">
                Failure Creating Order
              </h3>
              <p className="text-sm text-gray-shade-5">
                Unable to place order. Insufficient balance for the
                corresponding quantity of assets due to the rapid rise in
                prices. Try again by reducing the amount, or use Total instead
                of Amount.
              </p>
            </div>
            <Button title="Continue" className="w-full" onClick={handleClose} />
          </div>
        )}
      </div>
    </ModalContainer>
  );
};

const mainWrap = "flex items-center justify-between gap-3";
const firstChild = "text-gray-shade-1 text-sm font-medium";
const secondChild = "text-blue-shade-1 text-sm font-medium";
