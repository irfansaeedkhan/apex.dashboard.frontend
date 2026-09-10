import Image from "next/image";
import React from "react";
import { TableDataAffiliate } from ".";
import { CgSpinner } from "react-icons/cg";
import {
  AffiliatesListType,
  AffiliatesType,
} from "@/lib/auth/get-affiliates-list";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { FaCircleUser } from "react-icons/fa6";

interface Props {
  affiliatesList: AffiliatesListType;
  isLoading: string;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}

export const ReferralTableMobile: React.FC<Props> = ({
  affiliatesList,
  isLoading,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  const totalPages = Math.ceil(affiliatesList.total / affiliatesList.limit);
  return (
    <div className="flex w-full flex-col rounded-xl bg-white-shade-1">
      <div className="mb-4 flex h-16 items-center justify-between gap-5 rounded-t-xl bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium leading-7 text-blue-shade-1">
            Referrals
          </span>
          <span className="flex h-[22px] w-fit items-center justify-center rounded-2xl border border-green-shade-1 bg-green-shade-2 px-2 text-xs font-medium leading-[18px] text-green-shade-3">
            {affiliatesList?.total ?? "N/A"} Users
          </span>
        </div>
      </div>
      {/* {(affiliatesList?.length === 0 || !affiliatesList) && (
        <div className="w-full bg-white px-6 last:rounded-b-2xl">
          <h1 className="py-10 text-center text-sm font-medium text-blue-shade-1">
            No data found
          </h1>
        </div>
      )} */}
      {affiliatesList?.users?.length > 0 && isLoading === "resolved" ? (
        <>
          {affiliatesList?.users.map((item, index) => (
            <div
              key={index}
              className="mb-4 flex w-full flex-col gap-3 rounded-xl border-none border-black-shade-1/[0.12] bg-white p-6 last:mb-0"
            >
              <div className="flex flex-col items-center justify-center gap-2 pb-5">
                {/* {item?.ImageProfileUrl && (
                  <Image
                    src={item?.ImageProfileUrl ?? "/images/third.png"}
                    alt="usdt"
                    width={40}
                    height={40}
                    className="flex size-10 shrink-0 rounded-full border-2 border-blue-shade-1 object-cover"
                  />
                )} */}
                {/* {!item?.ImageProfileUrl && (
                  <FaCircleUser className="size-10 shrink-0 rounded-full border-2 border-blue-shade-1" />
                )} */}
                <FaCircleUser className="size-10 shrink-0" />

                <div className="flex flex-col">
                  <h5 className="min-w-max text-base font-semibold text-blue-shade-1">
                    {item.name ?? "N/A"} {item.surName ?? "N/A"}
                  </h5>
                </div>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Meta Assets Owned</h6>
                <p className={p}>
                  <Image
                    src={"/images/USDT.png"}
                    alt="usdt"
                    width={100}
                    height={18}
                    className="size-[18px]"
                  />
                  {item.MetaAsset_Purchased ?? 0} packs
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Weekly Commissions</h6>
                <p className={p}>
                  <Image
                    src={"/images/USDT.png"}
                    alt="usdt"
                    width={100}
                    height={18}
                    className="size-[18px]"
                  />
                  {item.Royalty?.toFixed(2) ?? "0.00"} USDT
                </p>
              </div>
            </div>
          ))}
          <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:opacity-50"
            >
              <HiMiniArrowLeft /> Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:opacity-50"
            >
              Next <HiMiniArrowRight />
            </button>
          </div>
        </>
      ) : affiliatesList?.users?.length === 0 && isLoading === "resolved" ? (
        <div className="w-full p-20 text-center font-bai-jamjuree font-medium">
          You have no referral yet
        </div>
      ) : isLoading === "idle" || isLoading === "pending" ? (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur">
          <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-blue-shade-1" />
        </div>
      ) : null}
    </div>
  );
};

const mainDiv = "flex w-full items-center justify-between gap-5";
const h6 = "text-sm font-medium text-blue-shade-1 opacity-60 leading-[18px]";
const p =
  "text-sm font-medium text-blue-shade-1 leading-5 flex items-center gap-1";
