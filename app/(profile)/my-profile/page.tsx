"use client";
import React, { useCallback, useEffect, useState } from "react";
import { MyProfileCard } from "@/components/profile";
import {
  cardData,
  getProfileDataApiResponseType,
} from "@/components/profile/profile-card-data";
import { getProfile } from "@/lib/auth/get-profile";
import { DepositAddressCard } from "@/components/profile/deposit-address-card";
import { ReferralAddressCard } from "@/components/profile/referrals-address-card";
import { PersonalInfoCard } from "@/components/profile/personal-info-card";
import { DepositAddressMobileCard } from "@/components/profile/deposit-address-mobile-card";

// Round 1: EVM networks first. The demo wallet address is an EVM
// (0x) address, so it must never be presented under the TRON label,
// which was the old default and a loss risk.
const networks: any[] = [
  {
    label: "USDT",
    network: "Ethereum",
    value: "usdt-erc20",
    icon1: "/images/USDT.png",
    icon2: "/images/eth.png",
  },
  {
    label: "USDT",
    network: "BNB Smart Chain",
    value: "usdt-bep20",
    icon1: "/images/USDT.png",
    icon2: "/images/bnb.png",
  },
  {
    label: "USDT",
    network: "TRON",
    value: "usdt-trc20",
    icon1: "/images/USDT.png",
    icon2: "/images/tron.png",
  },
];

const MyProfile = () => {
  const [profileData, setProfileData] =
    useState<getProfileDataApiResponseType>();

  const getProfileData = useCallback(async () => {
    try {
      const res = await getProfile();
      setProfileData(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex flex-1 flex-col gap-6">
        <ReferralAddressCard {...profileData} />
        <div className="block flex-1 lg:hidden">
          <DepositAddressMobileCard
            networks={networks}
            walletAddress={profileData?.WalletAddress}
          />
        </div>
        <PersonalInfoCard {...profileData} />
      </div>
      <div className="hidden flex-1 lg:flex">
        <DepositAddressCard
          networks={networks}
          walletAddress={profileData?.WalletAddress}
        />
      </div>
    </div>
  );
};

export default MyProfile;
