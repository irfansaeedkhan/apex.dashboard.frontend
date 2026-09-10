import React from "react";
import { ProfileCopyButton } from "./profile-copy-button";
import { APPBaseURL } from "@/constants/base-urls";
import { copyText } from "@/utils/copy-text";
import toast from "react-hot-toast";
import { sliceReferalAddress } from "@/utils/slice-referal-address";
import { sliceAccountAddress } from "@/utils/slice-account-address";

export const ReferralAddressCard: React.FC<any> = ({
  WalletAddress,
  AffiliateCode,
}) => {
  return (
    <div className="col-span-1 flex w-full flex-col gap-8 rounded-3xl bg-white p-4 sm:p-6">
      <h2 className="font-inter text-xl font-medium tracking-[-0.28px] text-blue-shade-1">
        Referrals Address
      </h2>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-5">
          <div className="flex w-full flex-col gap-1">
            <h3 className="font-inter text-xs font-medium tracking-[-0.28px] opacity-60">
              Referral Code
            </h3>
            <div className="flex w-full items-center justify-between gap-5 rounded-2xl border border-blue-shade-1/10 p-3">
              <input
                className="w-full cursor-pointer overflow-hidden text-xs font-semibold text-blue-shade-1 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm"
                onClick={() => {
                  copyText(AffiliateCode);
                  toast.success("Copied to clipboard");
                }}
                type="text"
                value={AffiliateCode}
              />
              <ProfileCopyButton value={WalletAddress} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex w-full flex-col gap-1">
            <h3 className="font-inter text-xs font-medium tracking-[-0.28px] opacity-60">
              Referral Link
            </h3>
            <div className="flex w-full items-center justify-between gap-5 rounded-2xl border border-blue-shade-1/10 p-3">
              <input
                className="w-full cursor-pointer overflow-hidden text-xs font-semibold text-blue-shade-1 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm"
                onClick={() => {
                  copyText(`${APPBaseURL}/auth/register?ref=${AffiliateCode}`);
                  toast.success("Copied to clipboard");
                }}
                type="text"
                // value={`${APPBaseURL}/auth/register?ref=${AffiliateCode}`}
                value={sliceReferalAddress(
                  `${APPBaseURL}/auth/register?ref=${AffiliateCode}`,
                )}
              />
              <ProfileCopyButton
                value={`${APPBaseURL}/auth/register?ref=${AffiliateCode}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
