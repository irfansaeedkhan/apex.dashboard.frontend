import React from "react";
import Image from "next/image";
import { sliceAccountAddress } from "@/utils/slice-account-address";
import { FaCircleUser } from "react-icons/fa6";
import { CgSpinner } from "react-icons/cg";
import { LeaderBoardList } from "@/lib/auth/get-leaderboard-list";
import { HiMiniArrowLeft, HiMiniArrowRight } from "react-icons/hi2";

interface Props {
  leaderboardList: LeaderBoardList;
  isLoading: string;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  page: number;
}
export const LeaderboardTableMobile: React.FC<Props> = ({
  leaderboardList,
  isLoading,
  handleNextPage,
  handlePrevPage,
  page,
}) => {
  return (
    <div className="flex w-full flex-col rounded-xl bg-white-shade-1">
      <div className="mb-4 flex h-16 items-center justify-between gap-5 rounded-t-xl bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <span className="text-blue-shade-1 text-lg font-medium leading-7">
            Leaderboard
          </span>
          <span className="flex h-[22px] w-fit items-center justify-center rounded-2xl border border-green-shade-1 bg-green-shade-2 px-2 text-xs font-medium leading-[18px] text-green-shade-3">
            {leaderboardList?.LeaderBoard?.length}
            {!leaderboardList?.LeaderBoard?.length && "N/A"}
          </span>
        </div>
      </div>
      {leaderboardList?.LeaderBoard?.length > 0 && isLoading === "resolved" ? (
        <>
          {leaderboardList?.LeaderBoard.map((item, index) => (
            <div
              key={index}
              className="mb-4 flex w-full flex-col gap-3 rounded-xl border-none border-black-shade-1/[0.12] bg-white p-6 last:mb-0"
            >
              <div className="flex flex-col items-center justify-center gap-2 pb-5">
                {item?.ImageProfileUrl && (
                  <Image
                    src={item?.ImageProfileUrl ?? "/images/third.png"}
                    alt="usdt"
                    width={40}
                    height={40}
                    className="border-blue-shade-1 flex size-10 shrink-0 rounded-full border-2 object-cover"
                  />
                )}
                {!item?.ImageProfileUrl && (
                  <FaCircleUser className="border-blue-shade-1 size-10 shrink-0 rounded-full border-2" />
                )}
                <div className="flex flex-col">
                  <h5 className="text-blue-shade-1 min-w-max text-base font-semibold">
                    {item.Username ?? "N/A"}
                  </h5>
                </div>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Position</h6>
                <div>
                  {item.Position === 1 ? (
                    <Image
                      src={"/images/first.png"}
                      alt="Position"
                      width={32}
                      height={32}
                      className="size-8 md:size-10"
                    />
                  ) : item.Position === 2 ? (
                    <Image
                      src={"/images/second.png"}
                      alt="Position"
                      width={32}
                      height={32}
                      className="size-8 md:size-10"
                    />
                  ) : item.Position === 3 ? (
                    <Image
                      src={"/images/third.png"}
                      alt="Position"
                      width={32}
                      height={32}
                      className="size-8 md:size-10"
                    />
                  ) : (
                    <div className={positionClass2}>{item.Position}</div>
                  )}
                </div>
              </div>

              <div className={mainDiv}>
                <h6 className={h6}>Wallet Address</h6>
                <p className={p}>
                  {" "}
                  {sliceAccountAddress(item?.WalletAddress)}
                  {!item?.WalletAddress && "N/A"}
                </p>
              </div>
              <div className={mainDiv}>
                <h6 className={h6}>Score</h6>
                <p className={p}> {item?.Score ?? "N/A"}</p>
              </div>
            </div>
          ))}
          <div className="mx-auto flex w-full max-w-[15rem] items-center justify-center gap-4 py-4">
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className="text-blue-shade-1 flex w-full items-center justify-center gap-2 rounded-lg  border-[1px] border-[#1414141F] bg-white px-4 py-2 text-sm disabled:opacity-50"
            >
              <HiMiniArrowLeft /> Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={
                !leaderboardList?.Number_of_Pages ||
                page >= leaderboardList.Number_of_Pages
              }
              className="text-blue-shade-1 flex w-full items-center justify-center gap-2 rounded-lg  border-[1px] border-[#1414141F] bg-white px-4 py-2 text-sm disabled:opacity-50"
            >
              Next <HiMiniArrowRight />
            </button>
          </div>
        </>
      ) : leaderboardList?.LeaderBoard?.length === 0 &&
        isLoading === "resolved" ? (
        <div className="w-full p-20 text-center font-bai-jamjuree font-medium">
          There is No record for now
        </div>
      ) : isLoading === "idle" || isLoading === "pending" ? (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center backdrop-blur">
          <CgSpinner className="text-blue-shade-1 mx-auto mt-20 size-14 animate-spin" />
        </div>
      ) : null}
    </div>
  );
};

const mainDiv = "flex w-full items-center justify-between gap-5";
const h6 = "text-sm font-medium text-blue-shade-1 opacity-60 leading-[18px]";
const p =
  "text-sm font-medium text-blue-shade-1 leading-5 flex items-center gap-2";
const positionClass2 = "flex size-10 items-center justify-center";
