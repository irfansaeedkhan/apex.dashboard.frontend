"use client";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { filterChartMonths } from "@/utils/filter-chart-months";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Series = {
  name: string;
  color: string;
  data: number[];
};

interface Props {
  graphData: { [key: string]: number }[];
  selectedYear?: string;
}

export const TransactionChartMobile: React.FC<Props> = ({
  graphData,
  selectedYear,
}) => {
  const [seriesData, setSeriesData] = useState<Series[]>([]);
  const [optionsData, setOptionsData] = useState<ApexOptions>({});

  // Round 1: never plot future months of the current year.
  const visibleData = selectedYear
    ? filterChartMonths(graphData, selectedYear)
    : graphData;

  const updateChartData = useCallback(() => {
    setSeriesData([
      {
        name: "Revenue",
        color: "#47D366",
        data: visibleData.map((data) => {
          const value = Object.values(data)[0];
          if (typeof value === "number") {
            return value;
          }
          return 0;
        }),
      },
    ]);

    setOptionsData({
      chart: {
        type: "bar",
        height: 350,
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "12px",
          borderRadius: 5,
          barHeight: "12px",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: visibleData.map((data) => Object.keys(data)[0]),
        position: "top",
        labels: {
          formatter: function (val: any) {
            return val + "%";
          },
          style: {
            colors: ["#555"],
            fontSize: "0.7rem",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: ["#555"],
            fontSize: "0.7rem",
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val + "%";
          },
        },
      },
    });
  }, [visibleData]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);
  return (
    <div className="flex w-full items-center justify-center">
      <ReactApexChart
        options={optionsData}
        series={seriesData}
        type="bar"
        height={340}
        width="100%"
      />
    </div>
  );
};
