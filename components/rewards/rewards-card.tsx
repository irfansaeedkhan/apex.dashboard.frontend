"use client";
import React from "react";
import { ReferralRewardsIcon } from "@/assets/svgs";
import Image from "next/image";
import { RewardsDetailsResp } from "@/lib/auth/get-rewards";

interface Props {
  refferalRewards: RewardsDetailsResp | null;
}

export const RewardsCard: React.FC<Props> = ({ refferalRewards }: Props) => {
  const totAssetValue =
    refferalRewards?.RefferalRewardsStats?.Tot_Asset_Value;
  const hasTotAssetValue =
    totAssetValue !== undefined &&
    totAssetValue !== null &&
    totAssetValue !== -1;

  const salesCommission =
    refferalRewards?.RefferalRewardsStats?.Sales_Commission;
  const hasSalesCommission =
    salesCommission !== undefined &&
    salesCommission !== null &&
    salesCommission !== -1;

  return (
    <div className="flex w-full flex-col gap-8 rounded-2xl bg-white py-6">
      <div className="flex flex-col px-6">
        <div className="flex items-center gap-4">
          <div className="flex size-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-shade-1/10 bg-white">
            <ReferralRewardsIcon className="size-6" />
          </div>
          <div className="flex w-full items-center justify-between gap-5">
            <div>
              <h3 className="text-lg font-bold text-blue-shade-1">
                Referral Rewards
              </h3>
              <p className={firstChild}>
                How much are you earning from your Referrals
              </p>
            </div>
            <div className="hidden items-center gap-1 text-2xl font-bold text-blue-shade-1 sm:flex">
              <Image
                src={"/images/USDT.png"}
                alt="usdt"
                width={22}
                height={22}
                className="h-[22px] w-auto shrink-0"
              />
              <span>{hasTotAssetValue ? totAssetValue : 0}</span>
              <span>USDT</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-1 text-2xl font-bold text-blue-shade-1 sm:hidden">
          <Image
            src={"/images/USDT.png"}
            alt="usdt"
            width={22}
            height={22}
            className="h-[22px] w-auto shrink-0"
          />
          <span>{hasTotAssetValue ? totAssetValue : 0}</span>
          <span>USDT</span>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-[14px] px-6">
        <div className={mainWrap}>
          <h3 className={firstChild}>Referrals Joined You</h3>
          <h3 className={secondChild}>
            {refferalRewards?.RefferalRewardsStats?.Referrals ?? "N/A"}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Referrals Meta Assets</h3>
          <h3 className={secondChild}>
            {refferalRewards?.RefferalRewardsStats?.Meta_Assets !== -1
              ? refferalRewards?.RefferalRewardsStats?.Meta_Assets
              : "N/A"}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Referrals Assets Value</h3>
          <h3 className={secondChild}>
            {hasTotAssetValue ? (
              <span className="inline-flex items-center gap-1">
                <Image
                  src={"/images/USDT.png"}
                  alt="usdt"
                  width={16}
                  height={16}
                  className="h-4 w-auto shrink-0"
                />
                <span>
                  {totAssetValue}
                  &nbsp;USDT
                </span>
              </span>
            ) : (
              <span>N/A</span>
            )}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Weekly Percentage</h3>
          <h3 className={secondChild}>
            {refferalRewards?.RefferalRewardsStats?.Reward_Percentage !==
              undefined &&
            refferalRewards?.RefferalRewardsStats?.Reward_Percentage !== null &&
            refferalRewards?.RefferalRewardsStats?.Reward_Percentage !== -1 ? (
              <span>
                {refferalRewards?.RefferalRewardsStats?.Reward_Percentage}
                &nbsp;%
              </span>
            ) : (
              <span>N/A</span>
            )}
          </h3>
        </div>
        <div className={mainWrap}>
          <h3 className={firstChild}>Weekly Commission Income</h3>
          <h3 className={secondChild}>
            {hasSalesCommission ? (
              <span className="inline-flex items-center gap-1">
                <Image
                  src={"/images/USDT.png"}
                  alt="usdt"
                  width={16}
                  height={16}
                  className="h-4 w-auto shrink-0"
                />
                <span>
                  {salesCommission}
                  &nbsp;USDT
                </span>
              </span>
            ) : (
              <span>N/A</span>
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

const mainWrap = "flex items-center justify-between gap-3";
const firstChild = "text-gray-shade-1 sm:text-sm text-[13px] font-medium";
const secondChild =
  "flex items-center gap-1 text-blue-shade-1 text-sm font-medium";
