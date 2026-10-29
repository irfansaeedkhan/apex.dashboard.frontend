import React from "react";
import ModalContainer from "../shared/modal-container";
import { DepositIcon } from "@/assets/svgs";
import { IoClose } from "react-icons/io5";
import QRCode from "react-qr-code";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { Button } from "../shared";
import { copyText } from "@/utils/copy-text";
import toast from "react-hot-toast";

interface Props {
  wallet_address: string;
  open: boolean;
  onClose: () => void;
}

export const DepositeAddressModal: React.FC<Props> = ({
  wallet_address,
  open,
  onClose,
}) => {
  return (
    <ModalContainer
      modalId="deposite-address-modal"
      isOpen={open}
      onClose={onClose}
      modalContentClassName="h-auto rounded-2xl max-w-[566px]"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
    >
      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <DepositIcon />
            <h3 className="font-bai-jamjuree text-xl font-semibold text-blue-shade-1">
              Deposit Address
            </h3>
          </div>
          <span onClick={onClose}>
            <IoClose className="size-4 cursor-pointer stroke-2" />
          </span>
        </div>
        <div className="flex items-center justify-center">
          <QRCode
            size={338}
            className="h-[222px] w-full max-w-[222px] object-contain sm:h-[338px] sm:max-w-[338px]"
            value={wallet_address}
            viewBox={`0 0 338 338`}
          />
        </div>
      </div>
      <div className="mt-8 flex flex-col gap-1.5">
        <p className="font-inter text-xs font-medium text-blue-shade-1">
          Scan QR code or copy address
        </p>
        {/* Round 1: the modal used to show the address with no network
            at all, while the profile labelled it TRON. This is an EVM
            address for Ethereum and BNB Smart Chain only. */}
        <p className="font-inter text-xs font-medium text-blue-shade-1 opacity-60">
          Network: EVM (Ethereum / BNB Smart Chain). Do not send TRON
          (TRC-20) USDT to this address.
        </p>
        <div className="flex h-12 w-full items-center justify-between gap-8 rounded-[14px] border border-black-shade-1/[12%] bg-white px-[18px] py-[14px]">
          <p className="font-inter text-sm font-medium text-blue-shade-1">
            {sliceAccountAddress(wallet_address)}
          </p>
          <Button
            title="Copy"
            variant="tertiary"
            className="!rounded-full !px-3 !py-1.5 text-[11px] font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              copyText(wallet_address);
              toast.success("Copied to clipboard");
            }}
          />
        </div>
      </div>
    </ModalContainer>
  );
};
