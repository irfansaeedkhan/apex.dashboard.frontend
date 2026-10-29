import React from "react";
import {
  EmailIcon,
  GlobeIcon,
  PhoneIcon,
  ReferralAddressIcon,
  UserIcon,
  WalletIcon,
} from "@/assets/svgs";
import { IconProps } from "../dashboard/sidebar-data";

export const cardData: cardDataType[] = [
  {
    card_title: "Personal information",
    card_data: [
      {
        title: "Email",
        value: "hellojohnweson123@gmail.com",
        icon: EmailIcon,
      },
      {
        title: "Name",
        value: "John Weson",
        icon: UserIcon,
      },
      {
        title: "Country",
        value: "United States",
        icon: GlobeIcon,
      },
      {
        title: "Phone Number",
        value: "+1 234 567 890",
        icon: PhoneIcon,
      },
    ],
  },
  {
    card_title: "Deposit and Referrals",
    card_data: [
      {
        title: "Deposit Address",
        value: "N/A",
        icon: WalletIcon,
        button: "Copy",
      },
      {
        title: "Referrals Address",
        value: "N/A",
        icon: ReferralAddressIcon,
        button: "Copy",
      },
    ],
  },
];

export type cardDataType = {
  card_title: string;
  card_data: {
    title: string;
    value: string;
    icon: React.FC<IconProps>;
    button?: string;
  }[];
};

export type getProfileDataApiResponseType = {
  AffiliateCode: string;
  Country: string;
  Email: string;
  Name: string;
  Phone: string;
  Surname: string;
  WalletAddress: string;
};

export type NetworkOption = {
  label: string;
  network: string;
  value: string;
  icon1: string;
  icon2: string;
};

export type NetworkList = {
  networks: NetworkOption[];
  // Round 1: the account's real wallet address. The cards used to
  // hardcode a different, truncated address, which did not match the
  // deposit modal and was a loss risk if copied.
  walletAddress?: string;
};
