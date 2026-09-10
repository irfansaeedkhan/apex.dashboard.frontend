import { GetShowOrdersDetailsResponse } from "@/lib/auth/get-show-order-details";
import React, { useState } from "react";
import { Button } from "../shared";
import { CreateOrderModal } from "./meta-asstes/create-order-modal";
import { CustomNumberInput } from "../shared/custom-number-input";
import dayjs from "dayjs";

export const CreateMetaAssetsDashboard: React.FC<
  GetShowOrdersDetailsResponse
> = ({ SinglePackCost, SinglePackDuration, StartDate }) => {
  const [value, setValue] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const handleChange = (value: number) => {
    setValue(value);
  };
  return (
    <div className="col-span-1 flex h-auto w-full flex-col gap-4 rounded-2xl bg-white p-6">
      <div className="flex flex-col items-center justify-between gap-3">
        <h6 className="text-blue-shade-1 text-base font-semibold">
          Buy Meta Assets
        </h6>
        <div className="flex h-10 w-full max-w-[160px] items-center gap-3 rounded-xl bg-[#F8F8F8] p-1">
          <button
            onClick={() => handleChange(value - 1)}
            disabled={value === 0}
            className="text-blue-shade-1 flex size-8 flex-shrink-0 items-center justify-center rounded-xl border border-gray-400/30 bg-white font-semibold"
          >
            -
          </button>
          <CustomNumberInput
            className="focus:ring-blue-shade-1 text-blue-shade-1 flex h-8 w-16 items-center justify-center rounded-md bg-transparent text-center text-base font-semibold focus:outline-none focus:ring-1"
            value={value === 0 ? "" : value}
            placeholder="0"
            onChange={(e) => handleChange(+e.target.value)}
          />
          <button
            onClick={() => handleChange(value + 1)}
            className="bg-blue-shade-1 flex size-8 flex-shrink-0 items-center justify-center rounded-xl font-semibold text-white"
          >
            +
          </button>
        </div>
      </div>
      <div className="mt-1 flex h-full flex-col justify-between gap-[14px]">
        <div className="mt-1 flex flex-col gap-[14px]">
          <div className={mainWrap}>
            <h3 className={firstChild}>Start Date</h3>
            <h3 className={secondChild}>
              {dayjs(StartDate).format("DD MMM YYYY")}
            </h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Duration</h3>
            <h3 className={secondChild}>{SinglePackDuration}months</h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Single Pack Cost</h3>
            <h3 className={secondChild}>{SinglePackCost} USDT</h3>
          </div>
          <div className={mainWrap}>
            <h3 className={firstChild}>Total Amount</h3>
            <h3 className={secondChild}>{SinglePackCost * value} USDT</h3>
          </div>
        </div>
        <Button
          title="Create Order"
          disabled={value === 0}
          onClick={() => setOpenModal(true)}
        />
      </div>
      <CreateOrderModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        totalamount={SinglePackCost * value}
        numberOfUnits={value}
        StartDate={StartDate}
        duration={SinglePackDuration}
      />
    </div>
  );
};

const mainWrap = "flex items-center justify-between gap-3";
const firstChild = "text-gray-shade-1 text-sm font-medium";
const secondChild = "text-blue-shade-1 text-sm font-medium";
