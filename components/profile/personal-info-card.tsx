import React from "react";
import { ProfileCopyButton } from "./profile-copy-button";
import { getProfileDataApiResponseType } from "./profile-card-data";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { APPBaseURL } from "@/constants/base-urls";
import { copyText } from "@/utils/copy-text";
import toast from "react-hot-toast";
import { sliceReferalAddress } from "@/utils/slice-referal-address";
import { EmailIcon, GlobeIcon, PhoneIcon, UserIcon } from "@/assets/svgs";

export const PersonalInfoCard: React.FC<any> = ({
  Name,
  Email,
  Phone,
  Country,
  Surname,
}) => {
  return (
    <div className="col-span-1 flex w-full flex-col gap-8 rounded-3xl bg-white p-4 sm:p-6">
      <h2 className="font-inter text-xl font-medium tracking-[-0.28px] text-blue-shade-1">
        Personal information
      </h2>
      <div className="flex w-full flex-col gap-4">
        <div className="flex items-center gap-5">
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-shade-1/10 bg-transparent">
            <EmailIcon className="[&>path]:fill-[#A5C700]" />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="font-inter text-xs font-medium tracking-[-0.28px] opacity-60">
              Email
            </h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-semibold text-blue-shade-1 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm">
                {Email}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-shade-1/10 bg-transparent">
            <UserIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="font-inter text-xs font-medium tracking-[-0.28px] opacity-60">
              Name
            </h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-semibold text-blue-shade-1 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm">
                {Name} {Surname}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-shade-1/10 bg-transparent">
            <GlobeIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="font-inter text-xs font-medium tracking-[-0.28px] opacity-60">
              Country
            </h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-semibold text-blue-shade-1 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm">
                {Country}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex size-11 flex-shrink-0 items-center justify-center rounded-full border border-gray-shade-1/10 bg-transparent">
            <PhoneIcon />
          </div>
          <div className="flex w-full flex-col gap-1">
            <h3 className="font-inter text-xs font-medium tracking-[-0.28px] opacity-60">
              Phone Number
            </h3>
            <div className="flex w-full flex-wrap items-center justify-between gap-5">
              <p className="cursor-pointer overflow-hidden text-xs font-semibold text-blue-shade-1 transition-colors duration-100 ease-in-out hover:text-[#1490ea] hover:underline lg:text-sm">
                {Phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
