import React, { useContext, useState, useEffect } from "react";
import { CFG_INETMAX, MENU_DEFAULT } from "../../constant/menu";
import MenuContext from "../../context/MenuContext";
import {
  MdArrowBackIosNew,
  MdOutline5G,
  MdOutlineShoppingCart,
} from "react-icons/md";
import ApexCharts from "apexcharts";
import { convertFromKb } from "../../utils/common";
import { LuArrowUpDown, LuPackage } from "react-icons/lu";
import { FaCartArrowDown, FaDollarSign } from "react-icons/fa6";
import axios from "axios";
import { currencyFormat } from "../../utils/common";

const pastelColors = [
  "#FF6384", // Soft Red
  "#36A2EB", // Vivid Blue
  "#FFCE56", // Sunny Yellow
  "#4BC0C0", // Turquoise
  "#9966FF", // Light Purple
  "#FF9F40", // Orange
  "#C9CBCF", // Neutral Grey
  "#8A9B0F", // Olive Green
  "#E67E22", // Carrot Orange
  "#3498DB", // Sky Blue
  "#E74C3C", // Bright Red
  "#2ECC71", // Green
  "#9B59B6", // Amethyst
  "#F39C12", // Bright Yellow
  "#1ABC9C", // Aqua
  "#34495E", // Dark Blue
  "#D35400", // Dark Orange
  "#27AE60", // Forest Green
  "#7F8C8D", // Mid Grey
  "#16A085", // Teal
];

const ACTIVE_TAB_LIST = {
  TOPUP_HISTORY: "TOPUP_HISTORY",
  USAGE_HISTORY: "USAGE_HISTORY",
  APP_HISTORY: "APP_HISTORY",
};
const InetMaxComponent = ({ isShow }) => {
  const {
    resolution,
    profile,
    inetMax,
    bank,
    setMenu,
    setProfile,
    setInetMax,
    setBank,
  } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState("balance");
  const [activeTab, setActiveTab] = useState(ACTIVE_TAB_LIST.TOPUP_HISTORY);
  const [isOpenTopup, setIsOpenTopup] = useState(false);
  const [topupTotal, setTopupTotal] = useState(0);
  const [topupTotalError, setTopupTotalError] = useState(null);

  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
    colors: [],
  });
  const getChartOptions = () => {
    return {
      series: chartData.series,
      colors: chartData.colors,
      chart: {
        height: 200,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,
              },
              total: {
                fontSize: "15px",
                showAlways: true,
                show: true,
                label: "Data Usage",
                color: "#FFFFFF",
                fontFamily: "Inter, sans-serif",
                formatter: function (w) {
                  const sum = w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                  return convertFromKb(sum);
                },
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                color: "#FFFFFF",
                fontSize: "17px",
                formatter: function (value) {
                  return convertFromKb(value);
                },
              },
            },
            size: "80%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      labels: chartData.labels,
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false, // Hide the legend
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return convertFromKb(value);
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value) {
            return convertFromKb(value);
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  };
  const [chartOptions, setChartOptions] = useState(getChartOptions());

  const handleTopupTotalChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      setTopupTotal(value);
    }
  };

  const handleTopupTotalKeyDown = (e) => {
    if (
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "ArrowLeft" &&
      e.key !== "ArrowRight" &&
      !/^\d$/.test(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handleTopupSubmit = async (e) => {
    if (topupTotal < CFG_INETMAX.MIN_TOPUP) {
      setTopupTotalError(
        "A minimum purchase of " +
          CFG_INETMAX.MIN_TOPUP +
          "GB is required for online orders."
      );
      return;
    }

    let result = 0;
    try {
      const response = await axios.post("/topup-internet-data", {
        label: "Online purchase",
        total: topupTotal * CFG_INETMAX.PRICE_PER_GB,
      });
      result = response.data == null ? 0 : response.data;
    } catch (error) {
      setTopupTotalError("Please try again later!");
      console.error("error /topup-internet-data", error);
    }

    if (result != 0) {
      setProfile((prev) => ({
        ...prev,
        inetmax_balance: profile.inetmax_balance + result,
      }));

      setInetMax((prev) => ({
        ...prev,
        topup_histories: [
          {
            total: result,
            created_at: "now",
            flag: "CREDIT",
            label: "Online purchase",
          },
          ...inetMax.topup_histories,
        ],
      }));

      setBank((prev) => ({
        ...prev,
        balance: bank.balance - topupTotal,
        histories: [
          {
            type: "withdraw",
            label: "InetMax purchase",
            total: topupTotal,
            created_at: "just now",
          },
          ...bank.histories,
        ],
      }));
      setTopupTotalError(null);
      setIsOpenTopup(false);
      setTopupTotal(0);
    }
  };

  useEffect(() => {
    if (topupTotal >= CFG_INETMAX.MIN_TOPUP) {
      setTopupTotalError(null);
    }
  }, [topupTotal]);
  useEffect(() => {
    if (chartData?.series?.length > 0) {
      const chart = new ApexCharts(
        document.querySelector("#donut-chart"),
        chartOptions
      );
      chart.render();

      // Update chart when data changes
      chart.updateSeries(chartData.series);
      chart.updateOptions({
        colors: chartData.colors,
        labels: chartData.labels,
      });

      return () => {
        chart.destroy();
      };
    }
  }, [chartOptions, chartData]);

  useEffect(() => {
    if (inetMax != undefined) {
      const apps = inetMax?.group_usage?.map((item) => item.app);
      const total = inetMax?.group_usage?.map((item) => item.total);
      const color = apps?.map(
        (_, index) => pastelColors[index % pastelColors.length]
      );

      setChartData({
        series: total,
        labels: apps,
        colors: color,
      });
    }
  }, [inetMax]);
  return (
    <div
      className={`${
        isShow ? "visible" : "invisible"
      } w-full h-full absolute top-0 left-0`}
    >
      <div
        className={{
          display: subMenu == "balance" ? "visible" : "invisible",
        }}
      >
        <div className="relative flex flex-col rounded-xl h-full w-full px-2">
          <div
            className="rounded-lg flex flex-col w-full pt-8"
            style={{
              height: resolution.layoutHeight,
            }}
          >
            <div className="flex w-full justify-between z-10 pb-2.5">
              <div
                className="flex items-center text-blue-500 cursor-pointer"
                onClick={() => {
                  setMenu(MENU_DEFAULT);
                }}
              >
                <MdArrowBackIosNew className="text-lg" />
                <span className="text-xs">Back</span>
              </div>
              <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit"></span>
              <div className="flex items-center px-2 space-x-2 text-white">
                <span className="text-xs">{profile?.name}</span>
                <img
                  src={profile?.avatar}
                  className="w-4 h-4 rounded-full object-cover"
                  alt=""
                  onError={(error) => {
                    error.target.src = "./images/noimage.jpg";
                  }}
                />
              </div>
            </div>
            <div className="no-scrollbar flex flex-col w-full h-full overflow-y-auto z-30 pb-5 space-y-3">
              <div className="flex justify-between bg-slate-800 rounded-lg items-center px-3 py-2">
                <div className="flex flex-col space-x-y-1">
                  <span className="text-white text-xs">Active Package</span>
                  <div className="flex flex items-center space-x-1">
                    <LuArrowUpDown className="text-white text-xl" />
                    <span className="text-white font-lg font-semibold">
                      {convertFromKb(profile?.inetmax_balance)}
                    </span>
                  </div>
                </div>
                {!CFG_INETMAX.IS_DISABLE_TOPUP ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-1 bg-slate-500 hover:bg-slate-600 flex justify-center space-x-1 items-center rounded"
                      onClick={() => {
                        setIsOpenTopup(true);
                        setTopupTotal(0);
                      }}
                    >
                      <MdOutlineShoppingCart className="text-white text-xl" />
                      <span className="text-white text-sm">Buy</span>
                    </button>
                  </div>
                ) : null}
              </div>
              <div className="flex w-full justify-center">
                <div id="donut-chart"></div>
              </div>
              <div className="flex space-x-2 pt-2">
                <div
                  className="flex flex-col w-full items-center space-y-1 cursor-pointer"
                  onClick={() => setActiveTab(ACTIVE_TAB_LIST.TOPUP_HISTORY)}
                >
                  <span className="text-sm text-center text-white">
                    Purchase
                  </span>
                  <span
                    className={`h-0.5 w-14 rounded ${
                      activeTab == ACTIVE_TAB_LIST.TOPUP_HISTORY
                        ? "bg-teal-500"
                        : "bg-transparent"
                    }`}
                  ></span>
                </div>
                <div
                  className="flex flex-col w-full items-center space-y-1 cursor-pointer"
                  onClick={() => setActiveTab(ACTIVE_TAB_LIST.USAGE_HISTORY)}
                >
                  <span className="text-sm text-center text-white">Usages</span>
                  <span
                    className={`h-0.5 w-14 rounded ${
                      activeTab == ACTIVE_TAB_LIST.USAGE_HISTORY
                        ? "bg-teal-500"
                        : "bg-transparent"
                    }`}
                  ></span>
                </div>
                <div
                  className="flex flex-col w-full items-center space-y-1 cursor-pointer"
                  onClick={() => setActiveTab(ACTIVE_TAB_LIST.APP_HISTORY)}
                >
                  <span className="text-sm text-center text-white">Apps</span>
                  <span
                    className={`h-0.5 w-14 rounded ${
                      activeTab == ACTIVE_TAB_LIST.APP_HISTORY
                        ? "bg-teal-500"
                        : "bg-transparent"
                    }`}
                  ></span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display:
                      activeTab == ACTIVE_TAB_LIST.TOPUP_HISTORY
                        ? "block"
                        : "none",
                  }}
                >
                  {inetMax?.topup_histories?.length == 0 ? (
                    <div className="flex justify-center w-full">
                      <span className="text-white text-xs">
                        No purchase histories
                      </span>
                    </div>
                  ) : null}
                  <div className="flow-root">
                    <ul
                      role="list-history"
                      className="divide-y divide-gray-800"
                    >
                      {inetMax?.topup_histories?.map((v, i) => {
                        return (
                          <li className="py-3" key={i}>
                            <div className="flex items-center space-x-4">
                              <div className="flex-1 line-clamp-1">
                                <p className="text-sm font-medium truncate text-white">
                                  {v.flag}
                                </p>
                                <p className="text-xs truncate text-gray-400">
                                  {v.label}
                                </p>
                              </div>
                              <div className="inline-flex items-end text-base font-semibold">
                                <div className="flex flex-col -space-y-1 text-right">
                                  <span className="text-green-500">
                                    + ${convertFromKb(v.total)}
                                  </span>
                                  <span className="text-xss text-gray-400">
                                    {v.created_at}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div
                  style={{
                    display:
                      activeTab == ACTIVE_TAB_LIST.USAGE_HISTORY
                        ? "block"
                        : "none",
                  }}
                >
                  {inetMax?.usage_histories?.length == 0 ? (
                    <div className="flex justify-center w-full">
                      <span className="text-white text-xs">
                        No usage histories
                      </span>
                    </div>
                  ) : null}
                  <div className="flow-root">
                    <ul
                      role="list-history"
                      className="divide-y divide-gray-800"
                    >
                      {inetMax?.usage_histories?.map((v, i) => {
                        return (
                          <li className="py-3" key={i}>
                            <div className="flex items-center space-x-4">
                              <div className="flex-1 line-clamp-1">
                                <p className="text-sm font-medium truncate text-white">
                                  {v.label}
                                </p>
                                <p className="text-xs truncate text-gray-400">
                                  App usage
                                </p>
                              </div>
                              <div className="inline-flex items-end text-base font-semibold">
                                <div className="flex flex-col -space-y-1 text-right">
                                  <span className="text-red-500">
                                    - {convertFromKb(v.total)}
                                  </span>
                                  <span className="text-xss text-gray-400">
                                    {v.created_at}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div
                  style={{
                    display:
                      activeTab == ACTIVE_TAB_LIST.APP_HISTORY
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="grid grid-cols-2 gap-3">
                    {inetMax?.group_usage?.map((v, i) => {
                      return (
                        <div
                          className="flex space-x-2 bg-slate-700 text-white px-2 py-1 rounded-lg items-center"
                          key={i}
                        >
                          <img
                            className="w-7 rounded"
                            src={`./images/${v.app.toLowerCase()}.svg`}
                            alt=""
                            onError={(error) => {
                              error.target.src = "./images/noimage.jpg";
                            }}
                          />
                          <div className="flex flex-col -space-y-1">
                            <span className="text-white text-xs font-semibold">
                              {v.app}
                            </span>
                            <span className="text-white text-sm">
                              {convertFromKb(v.total)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: isOpenTopup ? "block" : "none",
                }}
              >
                <div
                  className="absolute bottom-0 left-0 z-30"
                  style={{
                    height: resolution.layoutHeight,
                    width: resolution.layoutWidth,
                    backgroundColor: "rgba(31, 41, 55, 0.8)",
                  }}
                  onClick={() => setIsOpenTopup(false)}
                ></div>
                <div className="absolute bottom-0 left-0 w-full bg-slate-800 rounded-t-lg pb-8 z-50">
                  <div className="flex flex-col space-y-1 px-4">
                    <div
                      className="flex justify-center cursor-pointer py-3"
                      onClick={() => setIsOpenTopup(false)}
                    >
                      <div className="w-1/3 h-1 bg-white rounded-full"></div>
                    </div>
                    <div className="text-white flex items-center space-x-2">
                      <span className="font-bold">GB</span>
                      <input
                        type="text"
                        placeholder="10"
                        className="w-full text-sm text-white flex-1 border border-slate-600 bg-slate-800 focus:outline-none rounded-lg pl-2 pr-1 py-1"
                        autoComplete="off"
                        name="total"
                        required
                        value={topupTotal}
                        onChange={handleTopupTotalChange}
                        onKeyDown={handleTopupTotalKeyDown}
                      />
                    </div>
                    <div>
                      <div className="grid grid-cols-3 gap-2 text-white pt-1">
                        {CFG_INETMAX.BUY.map((v, i) => {
                          return (
                            <button
                              className="px-2 py-1 bg-teal-500 rounded font-semibold text-sm"
                              onClick={() => setTopupTotal(v.total)}
                              key={i}
                            >
                              {v.text}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    <span className="text-white text-xs pb-1">
                      Ensure your active balance is sufficient to complete the
                      purchase.
                    </span>
                    {topupTotalError != null ? (
                      <span className="text-red-500 text-xs">
                        {topupTotalError}
                      </span>
                    ) : null}
                    <button
                      className="px-2 py-1 bg-blue-500 rounded font-semibold text-sm text-white"
                      onClick={handleTopupSubmit}
                    >
                      Buy now{" "}
                      {topupTotalError == null
                        ? "$" +
                          currencyFormat(topupTotal * CFG_INETMAX.PRICE_PER_GB)
                        : ""}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default InetMaxComponent;
