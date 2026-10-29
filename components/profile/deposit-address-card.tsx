import React, { useState } from "react";
import { ProfileCopyButton } from "./profile-copy-button";
import { copyText } from "@/utils/copy-text";
import toast from "react-hot-toast";
import Dropdown from "./drop-down";
import QRCode from "react-qr-code";
import { NetworkList, NetworkOption } from "./profile-card-data";

export const DepositAddressCard: React.FC<NetworkList> = ({
  networks,
  walletAddress,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption>(
    networks[0],
  );
  const handleNetworkSelect = (selectedNetwork: NetworkOption) => {
    setSelectedNetwork(selectedNetwork);
  };
  // Round 1: the demo wallet address is an EVM (0x) address, valid for
  // Ethereum and BNB Smart Chain, not for TRON. Selecting TRON shows
  // a warning and no copyable address, instead of presenting the
  // EVM address under a TRON label.
  const isTron = selectedNetwork?.network === "TRON";
  const address = walletAddress ?? "";
  return (
    <div className="col-span-1 flex w-full flex-col gap-8 rounded-3xl bg-white p-4 sm:p-6">
      <h2 className="font-inter text-xl font-medium tracking-[-0.28px] text-blue-shade-1">
        Deposit Address
      </h2>
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-inter text-xs font-medium tracking-[-0.28px] opacity-60">
            Select Network
          </h3>
          <Dropdown items={networks} onSelect={handleNetworkSelect} />
        </div>
        {isTron ? (
          <p className="rounded-2xl border border-blue-shade-1/10 bg-white-shade-1 p-6 text-sm font-medium text-blue-shade-1">
            No TRON address is connected for this demo account. The
            account address is an EVM address for Ethereum and BNB
            Smart Chain only. Do not send TRON (TRC-20) USDT to an EVM
            address.
          </p>
        ) : (
          <div className="flex w-full flex-wrap items-center justify-between gap-5 rounded-2xl border border-blue-shade-1/10 bg-white-shade-1 p-6">
            <div className="flex items-center justify-center">
              <QRCode
                size={296}
                className="h-[122px] w-full max-w-[122px] object-contain sm:h-[238px] sm:max-w-[238px]"
                value={address}
                viewBox={`0 0 338 338`}
              />
            </div>
            <div className="flex w-full flex-col gap-1">
              <p className="text-xs font-medium text-blue-shade-1 opacity-60">
                Network: {selectedNetwork?.network} (EVM address)
              </p>
              <div className="flex w-full items-center justify-between gap-5 rounded-2xl border border-blue-shade-1/10 p-3 text-sm">
                <div className="flex w-full flex-col">
                  <h3 className="font-inter text-xs font-medium tracking-[-0.28px] opacity-60">
                    Public key
                  </h3>
                  <input
                    className="w-full cursor-pointer overflow-hidden bg-transparent font-medium text-blue-shade-1 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm"
                    onClick={() => {
                      copyText(address);
                      toast.success("Copied to clipboard");
                    }}
                    type="text"
                    value={address}
                    readOnly
                  />
                </div>
                <ProfileCopyButton value={address} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
