"use client";
import React, { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

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
}

export const TransactionChart: React.FC<Props> = ({ graphData }) => {
  const [optionsData, setOptionsData] = useState<ApexOptions>({});
  const [series, setSeries] = useState<Series[]>([]);

  const updateChartData = useCallback(() => {
    setSeries([
      {
        name: "Revenue",
        color: "#47D366",
        data: graphData.map((data) => {
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

      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "12px",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: graphData.map((data) => Object.keys(data)[0]),
        labels: {
          style: {
            colors: ["#555"],
            fontSize: "0.8rem",
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
          formatter: function (val: any) {
            return val + "%";
          },
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
  }, [graphData]);

  useEffect(() => {
    updateChartData();
  }, [updateChartData]);

  return (
    <div>
      <ReactApexChart
        options={optionsData}
        series={series}
        type="bar"
        width={"100%"}
        height={350}
      />
    </div>
  );
};
