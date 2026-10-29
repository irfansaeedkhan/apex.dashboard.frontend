import React, { useState } from "react";
import { ProfileCopyButton } from "./profile-copy-button";
import { copyText } from "@/utils/copy-text";
import toast from "react-hot-toast";
import Dropdown from "./drop-down";
import QRCode from "react-qr-code";
import { NetworkList, NetworkOption } from "./profile-card-data";

export const DepositAddressMobileCard: React.FC<NetworkList> = ({
  networks,
  walletAddress,
}) => {
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkOption>(
    networks[0],
  );
  const handleNetworkSelect = (selectedNetwork: NetworkOption) => {
    setSelectedNetwork(selectedNetwork);
  };
  // Round 1: same TRON guard as the desktop card. The demo address is
  // EVM only, so TRON shows a warning and no copyable address.
  const isTron = selectedNetwork?.network === "TRON";
  const address = walletAddress ?? "";
  return (
    <div className="col-span-1 flex w-full flex-col gap-8 rounded-3xl bg-white p-6">
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
          <p className="rounded-2xl border border-blue-shade-1/10 bg-white-shade-1 p-3 text-sm font-medium text-blue-shade-1">
            No TRON address is connected for this demo account. The
            account address is an EVM address for Ethereum and BNB
            Smart Chain only.
          </p>
        ) : (
          <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-blue-shade-1/10 bg-white-shade-1 p-3">
            <QRCode
              size={60}
              className="h-[60px] w-full max-w-[60px] object-contain sm:h-[60px] sm:max-w-[60px]"
              value={address}
              viewBox={`0 0 338 338`}
            />
            <div className="flex w-full items-center justify-between gap-3 text-sm">
              <div className="flex w-full flex-col">
                <h3 className="font-inter text-xs font-medium tracking-[-0.28px] opacity-60">
                  Public key ({selectedNetwork?.network})
                </h3>
                <input
                  className="w-full cursor-pointer overflow-hidden truncate bg-transparent font-medium text-blue-shade-1 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm"
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
        )}
      </div>
    </div>
  );
};
