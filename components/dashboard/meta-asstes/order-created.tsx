import React from "react";
import clsx from "clsx";
import dayjs from "dayjs";

interface Props {
  duration: number;
  qty: number;
  singlePackCost: number;
  startDate: string;
  totalAmount: number;
}

export const OrderCreated: React.FC<Props> = ({
  duration,
  qty,
  startDate,
  totalAmount,
}) => {
  const endDate = dayjs(startDate).add(duration, "month").format("DD MMM YYYY");
  return (
    <div className="col-span flex h-auto w-full flex-col justify-between gap-4 rounded-2xl bg-white p-6">
      <h3 className={clsx(secondChild, "text-center")}>Order Details</h3>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-blue-shade-1 text-sm font-medium opacity-60">
            Amount
          </p>
          <p className="text-blue-shade-1 text-xl font-semibold">
            {totalAmount} USDT
          </p>
          <span className="border-blue-shade-1 bg-blue-shade-2 text-blue-shade-3 rounded-2xl border px-2 text-xs leading-[18px]">
            Paid
          </span>
        </div>
        <div className="flex flex-col gap-[14px] rounded-[20px] border border-white/[0.04] bg-[#F7F7F7] p-4">
          <div className={mainWrap}>
            <h3 className={firstChild}>UUID</h3>
            <h3 className={secondChild}> --- </h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Meta Assets Purchased</h3>
            <h3 className={secondChild}>{qty}</h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Start Date</h3>
            <h3 className={secondChild}>
              {dayjs(startDate).format("DD MMM YYYY")}
            </h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>End Date</h3>
            <h3 className={secondChild}>{endDate}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

const mainWrap = "flex items-center justify-between gap-3";
const firstChild = "text-gray-shade-1 text-sm font-medium";
const secondChild = "text-blue-shade-1 text-sm font-medium";
