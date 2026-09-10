import React, { useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";
import { Alert, Check, WithdrawalIcon } from "@/assets/svgs";
import { withdrawCrypto } from "@/lib/auth/withdraw-crypto";
import { Button } from "../shared";
import { CustomNumberInput } from "../shared/custom-number-input";
import ModalContainer from "../shared/modal-container";
import Link from "next/link";

interface Props {
  open: boolean;
  onClose: () => void;
  available_balance: number;
  getMainCall: () => void;
}

export const WithdrawalModal: React.FC<Props> = ({
  open,
  onClose,
  available_balance,
  getMainCall,
}) => {
  const [isLoading, setIsLoading] = useState("idle");
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [formFields, setFormFields] = useState({
    account_address: "",
    amount: "",
  });

  const handleonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleWithdraw = async () => {
    setIsLoading("pending");
    try {
      const res = await withdrawCrypto({
        WhitdrawAmount: formFields.amount,
        WhitdrawAddress: formFields.account_address,
      });
      setSuccess(true);
      setFailure(false);
      toast.success("Withdrawal request sent successfully!");
      getMainCall();
      setIsLoading("resolved");
      setFormFields({
        account_address: "",
        amount: "",
      });
    } catch (error) {
      setFailure(true);
      setSuccess(false);
      setIsLoading("rejected");
      console.log(error);
    }
  };

  const handleClose = () => {
    onClose();
    setFailure(false);
    setSuccess(false);
    setIsLoading("idle");
    setFormFields({
      account_address: "",
      amount: "",
    });
  };

  return (
    <ModalContainer
      modalId="withdrawal-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-2xl sm:max-w-[566px] max-w-[343px]"
      shouldCloseOnOverlayClick={false}
      shouldCloseOnEsc={false}
    >
      <div className="flex w-full flex-col gap-8">
        {!success && !failure && (
          <>
            <div className="flex items-center justify-between gap-5">
              <div className="flex items-center gap-2">
                <WithdrawalIcon />
                <h3 className="font-bai-jamjuree text-xl font-semibold text-blue-shade-1">
                  Withdraw
                </h3>
              </div>
              <span onClick={onClose}>
                <IoClose className="size-4 cursor-pointer stroke-2" />
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="account_address"
                className="text-xs text-blue-shade-1"
              >
                Address
              </label>
              <input
                type="text"
                name="account_address"
                id="account_address"
                value={formFields.account_address}
                onChange={handleonChange}
                placeholder="Insert your public key"
                className="h-12 w-full rounded-[10px] border border-gray-shade-1/10 bg-white px-4 py-3 text-xs shadow-1 focus:border-blue-shade-1 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="amount" className="text-xs text-blue-shade-1">
                Amount
              </label>
              <div className="flex h-12 w-full items-center gap-2 rounded-[10px] border border-gray-shade-1/10 bg-white px-2 py-3 text-xs shadow-1 focus-within:border-blue-shade-1 sm:px-4">
                <CustomNumberInput
                  name="amount"
                  id="amount"
                  value={formFields.amount}
                  onChange={handleonChange}
                  placeholder="Min. amount: 0.001"
                  className="min-w-0 flex-1 bg-transparent focus:outline-none"
                />
                <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
                  <span className="flex items-center gap-1 rounded-full border border-black-shade-1/[0.12] bg-white px-1.5 py-1 text-[11px] font-medium sm:gap-1.5 sm:p-1.5">
                    <Image
                      src={"/images/USDT.png"}
                      alt="usdt"
                      width={18}
                      height={18}
                      className="h-[18px] w-auto shrink-0"
                    />
                    <span>USDT</span>
                  </span>
                  <span
                    className="cursor-pointer rounded-full bg-black-shade-5 px-2.5 py-1.5 text-xs font-medium text-white sm:px-3"
                    onClick={() =>
                      setFormFields({
                        ...formFields,
                        amount: available_balance?.toString(),
                      })
                    }
                  >
                    MAX
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[14px] rounded-[20px] border border-white/[0.04] bg-[#F7F7F7] p-4">
              <div className="flex h-8 w-full items-center justify-between gap-2">
                <span className="text-sm font-medium leading-8 text-[#969699]">
                  Fee:
                </span>
                <span className="text-sm font-medium leading-8 text-blue-shade-1">
                  18 %
                </span>
              </div>
              <hr />
              <div className="flex h-8 w-full items-center justify-between gap-2">
                <span className="text-sm font-medium leading-8 text-[#969699]">
                  Amount received:
                </span>
                <span className="text-sm font-medium leading-8 text-blue-shade-1">
                  {(
                    +formFields.amount -
                    (18 / 100) * +formFields.amount
                  )?.toFixed(2)}{" "}
                  Token
                </span>
              </div>
            </div>
            <Button
              title="Withdraw"
              className="w-full"
              disabled={
                available_balance === 0 ||
                formFields.amount === "" ||
                formFields.account_address === "" ||
                isLoading === "pending"
              }
              loaderIcon={
                isLoading === "pending" && (
                  <CgSpinner className="mx-auto size-5 animate-spin" />
                )
              }
              onClick={handleWithdraw}
            />
          </>
        )}

        {success && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Check />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg text-blue-shade-1">
                Withdraw completed successfully
              </h3>
              <p className="text-sm text-gray-shade-5">
                Withdrawal expected at your wallet in 3-5 business days.
              </p>
            </div>
            <Button title="Continue" className="w-full" onClick={handleClose} />
          </div>
        )}
        {failure && (
          <div className="flex flex-col items-center gap-6 text-center">
            <Alert />
            <div className="flex flex-col gap-1">
              <h3 className="text-lg text-blue-shade-1">Withdraw Failed</h3>
              <p className="text-sm text-gray-shade-5">
                To protect your account, your withdrawal has not been processed.
                Please try another again later.
              </p>
            </div>
            <Button title="Ok " className="w-full" onClick={handleClose} />
          </div>
        )}
      </div>
    </ModalContainer>
  );
};
