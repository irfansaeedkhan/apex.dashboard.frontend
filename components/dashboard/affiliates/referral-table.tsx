import React from "react";
import { CgSpinner } from "react-icons/cg";
import { TableCell, TableRow } from "@/components/shared";
import Image from "next/image";
import { AffiliatesListType } from "@/lib/auth/get-affiliates-list";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";
import { FaCircleUser } from "react-icons/fa6";

interface Props {
  affiliatesList: AffiliatesListType;
  isLoading: string;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}

export const ReferralTable: React.FC<Props> = ({
  affiliatesList,
  isLoading,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  const totalPages = Math.ceil(affiliatesList.total / affiliatesList.limit);

  return (
    <div className="rounded-2xl border border-gray-shade-4 bg-white shadow-[0px_2px_8px_0px_rgba(0_0_0_0.02)]">
      <div className="flex items-center gap-2 rounded-t-2xl bg-white px-6 py-5">
        <h2 className="text-lg font-medium text-blue-shade-1">Referrals</h2>
        <span className="rounded-2xl border border-green-shade-1 bg-green-shade-2 px-2 text-xs leading-[18px] text-green-shade-3">
          {affiliatesList?.total} Users
        </span>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto rounded-lg">
          <thead>
            <TableRow
              element="th"
              className="!h-11 w-full bg-white-shade-1 px-6 py-3 text-xs font-medium text-gray-shade-1"
            >
              <TableCell element={"th"}>Name</TableCell>
              <TableCell element={"th"}>Meta Assets Owned</TableCell>
              <TableCell element={"th"}>Weekly Commissions</TableCell>
            </TableRow>
          </thead>
          {affiliatesList?.users?.length > 0 && isLoading === "resolved" && (
            <tbody>
              {affiliatesList?.users.map((item, i) => {
                return (
                  <TableRow
                    element="tb"
                    key={i}
                    className="w-full overflow-x-auto bg-white px-6 py-4 text-sm font-semibold  text-blue-shade-1 last:rounded-b-2xl"
                  >
                    <TableCell
                      element={"td"}
                      className="flex h-[72px] items-center gap-3 last:rounded-br-2xl"
                    >
                      {/* {item?.ImageProfileUrl && (
                        <Image
                          src={item?.ImageProfileUrl ?? "/images/third.png"}
                          alt="usdt"
                          width={100}
                          height={100}
                          className="flex size-10 shrink-0 rounded-full  object-cover"
                        />
                      )}
                      {!item?.ImageProfileUrl && (
                        <FaCircleUser className="size-10 shrink-0" />
                      )} */}
                      <FaCircleUser className="size-10 shrink-0" />

                      <span className="min-w-max font-semibold">
                        {item.name ?? "N/A"} {item.surName ?? "N/A"}
                      </span>
                    </TableCell>

                    <TableCell element={"td"} className="last:rounded-br-2xl">
                      <p className="flex items-center gap-1 text-sm font-medium leading-5 text-blue-shade-1">
                        <Image
                          src={"/images/USDT.png"}
                          alt="usdt"
                          width={16}
                          height={16}
                          className="h-4 w-auto shrink-0"
                        />
                        {item.MetaAsset_Purchased ?? 0} packs
                      </p>
                    </TableCell>
                    <TableCell element={"td"} className="last:rounded-br-2xl">
                      <p className="flex items-center gap-1 text-sm font-medium leading-5 text-blue-shade-1">
                        <Image
                          src={"/images/USDT.png"}
                          alt="usdt"
                          width={16}
                          height={16}
                          className="h-4 w-auto shrink-0"
                        />
                        {item.Royalty?.toFixed(2) ?? "0.00"} USDT
                      </p>
                    </TableCell>
                  </TableRow>
                );
              })}

              <tr>
                <td colSpan={6}>
                  <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
                    <button
                      onClick={handlePrevPage}
                      disabled={page === 1}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:opacity-50"
                    >
                      <HiMiniArrowLeft /> Previous
                    </button>
                    <button
                      onClick={handleNextPage}
                      disabled={!totalPages || page >= totalPages}
                      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border-[1px]  border-[#1414141F] bg-white px-4 py-2 text-sm text-blue-shade-1 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next <HiMiniArrowRight />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>
        {affiliatesList?.users?.length === 0 && isLoading === "resolved" ? (
          <div className="w-full p-20 text-center font-bai-jamjuree font-medium">
            You have no referral yet
          </div>
        ) : isLoading === "idle" || isLoading === "pending" ? (
          <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur">
            <CgSpinner className="mx-auto mt-20 size-14 animate-spin text-blue-shade-1" />
          </div>
        ) : null}
      </div>
      {/* <Pagination /> */}
    </div>
  );
};
