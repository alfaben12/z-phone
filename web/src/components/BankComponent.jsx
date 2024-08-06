import React, { useContext, useState } from "react";
import { MENU_DEFAULT, PHONE_HEIGHT } from "../constant/menu";
import MenuContext from "../context/MenuContext";
import { MdArrowBackIosNew } from "react-icons/md";
import { LuSun } from "react-icons/lu";
import { FiHome } from "react-icons/fi";
import { BiTransfer } from "react-icons/bi";
import { FaDollarSign, FaSearch } from "react-icons/fa";
import {
  FaAngleRight,
  FaCheck,
  FaRegUser,
  FaMoneyBillTransfer,
  FaArrowRightLong,
} from "react-icons/fa6";
import { MdOutlineReceiptLong } from "react-icons/md";
import LoadingComponent from "./LoadingComponent";
import { currencyFormat } from "../utils/common";

const subMenuList = {
  balance: "balance",
  bill: "bill",
  history: "history",
  transfer: "transfer",
};

const BankComponent = ({ isShow }) => {
  const { setMenu, bank, profile } = useContext(MenuContext);
  const [subMenu, setSubMenu] = useState(subMenuList["balance"]);

  const handleTransferChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      handleTransferFormChange(e);
    }
  };

  const handleTransferKeyDown = (e) => {
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

  const [formDataTransfer, setFormDataTransfer] = useState({
    receiver: "",
    total: "",
    note: "",
  });

  const handleTransferFormChange = (e) => {
    const { name, value } = e.target;
    setFormDataTransfer({
      ...formDataTransfer,
      [name]: value,
    });
  };

  const handleTransferFormSubmit = (e) => {
    e.preventDefault();
    if (!formDataTransfer.receiver) {
      return;
    }
    if (!formDataTransfer.total) {
      return;
    }
    if (!formDataTransfer.note) {
      return;
    }
    console.log("Form Data:", formDataTransfer);
    // Here you can add your code to send formData to an API
  };

  return (
    <div
      className="relative flex flex-col w-full h-full"
      style={{
        display: isShow ? "block" : "none",
      }}
    >
      <div className="absolute top-0 flex w-full justify-between py-3 bg-black pt-8 z-10">
        <div
          className="flex items-center px-2 text-blue-500 cursor-pointer"
          onClick={() => setMenu(MENU_DEFAULT)}
        >
          <MdArrowBackIosNew className="text-lg" />
          <span className="text-xs">Back</span>
        </div>
        <span className="absolute left-0 right-0 m-auto text-sm text-white w-fit">
          Bank Digital
        </span>
        <div className="flex items-center px-2 text-blue-500">
          {/* <MdEdit className='text-lg' /> */}
        </div>
      </div>
      {bank == undefined ? (
        <LoadingComponent />
      ) : (
        <div
          className="no-scrollbar flex flex-col w-full h-full text-white overflow-y-auto"
          style={{
            paddingTop: 65,
          }}
        >
          <div
            className="h-full"
            style={{
              ...(subMenu !== subMenuList["balance"]
                ? { display: "none" }
                : {}),
            }}
          >
            <div className="w-full h-full pb-10">
              <div
                className="absolute right-0 w-full flex px-3 justify-between items-center space-x-3 z-10"
                style={{ top: 80 }}
              >
                <div className="flex space-x-1">
                  <span>
                    <LuSun className="text-white mt-1" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold line-clamp-1">
                      Hi, {profile.name.split(" ")[0]}
                    </span>
                    <span className="text-xs text-gray-400">
                      Welcome to Digital Banking.
                    </span>
                  </div>
                </div>
                <img
                  src="./assets/images/km-logo.png"
                  className="w-16 h-16 object-cover"
                  alt=""
                />
              </div>
              <div
                className="relative z-20 flex flex-col w-full mt-24 bg-slate-900 rounded-t-2xl text-white px-4 py-4"
                style={{
                  height: `${PHONE_HEIGHT - 120}px`,
                  marginBottom: 50,
                }}
              >
                <div className="flex flex-col space-y-3">
                  <span className="text-xs font-semibold">MAIN ACCOUNT</span>
                  <div className="relative flex flex-col space-y-2 border rounded-lg border-slate-700 text-white px-3 py-3">
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-300">
                        Active Balance
                      </span>
                      <span
                        className="text-xs text-slate-300 cursor-pointer"
                        onClick={() => setSubMenu(subMenuList["history"])}
                      >
                        In & Out
                      </span>
                    </div>
                    <div className="flex items-center w-full">
                      <FaDollarSign className="text-xl" />
                      <span className="text-xl truncate">
                        {currencyFormat(bank.balance)}
                      </span>
                    </div>
                    <div className="flex w-full pt-2">
                      <div
                        className="bg-slate-700 hover:bg-slate-800 px-2 py-1 text-xs"
                        style={{
                          borderRadius: 5,
                        }}
                      >
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => setSubMenu(subMenuList["transfer"])}
                        >
                          <span>Transfer Now</span>
                          <FaAngleRight />
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0">
                      <img
                        src="/images/monas.png"
                        className="w-10 object-cover"
                        alt=""
                      />
                    </div>
                  </div>
                  <br />
                  <div className="flex justify-between">
                    <span className="text-xs font-normal border-b pb-1 border-slate-700">
                      Last 5 Transactions
                    </span>
                    <span
                      className="text-xs font-normal border-slate-700 cursor-pointer"
                      onClick={() => setSubMenu(subMenuList["history"])}
                    >
                      Show All
                    </span>
                  </div>
                  <div className="flex flex-col space-y-2">
                    {bank.histories.slice(0, 5).map((v, i) => {
                      return (
                        <div
                          className="flex justify-between items-center space-x-3"
                          key={i}
                        >
                          <div className="w-1/2">
                            <div className="flex space-x-2 justify-start items-center text-sm">
                              <span className="w-3">{i + 1}.</span>
                              <span className="truncate">{v.label}</span>
                            </div>
                          </div>
                          <div className="w-1/2">
                            <div
                              className={`flex justify-end items-center w-full  ${
                                v.type == "Debit"
                                  ? "text-green-500"
                                  : "text-red-500"
                              }`}
                            >
                              <FaDollarSign className="text-sm" />
                              <span className="text-sm truncate">
                                {currencyFormat(v.total)}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <span className="text-xs font-normal border-slate-700 pt-5 text-center">
                    Digital Bank by KOTA MANIS ROLEPLAY
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="h-full"
            style={{
              ...(subMenu !== subMenuList["history"]
                ? { display: "none" }
                : {}),
            }}
          >
            <div className="p-3 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold leading-none text-white">
                  Top 50 Transactions
                </h3>
              </div>
              <div className="flow-root pb-10">
                <ul role="list-history" className="divide-y divide-gray-800">
                  {bank.histories.map((v, i) => {
                    return (
                      <li className="py-3" key={i}>
                        <div className="flex items-center space-x-4">
                          <div className="flex-1 line-clamp-1">
                            <p className="text-sm font-medium truncate text-white">
                              {v.type}
                            </p>
                            <p className="text-xs truncate text-gray-400">
                              {v.label}
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold">
                            {v.type == "Debit" ? (
                              <span className="text-red-500">
                                - ${currencyFormat(v.total)}
                              </span>
                            ) : (
                              <span className="text-green-500">
                                + ${currencyFormat(v.total)}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div
            className="h-full"
            style={{
              ...(subMenu !== subMenuList["bill"] ? { display: "none" } : {}),
            }}
          >
            <div className="p-3 rounded-lg">
              <div className="flex flex-col space-y-2 mb-4">
                <h3 className="text-lg font-bold leading-none text-white">
                  Bills
                </h3>
                <p className="text-xs text-gray-400">
                  Lakukan pembayaran secepatnya, jika tidak maka akan terpotong
                  otomatis pada akhir bulan dan membayar denda.
                </p>
              </div>
              <div className="flow-root pb-10">
                <ul role="list-bill" className="divide-y divide-gray-800">
                  {bank.bills.map((v, i) => {
                    return (
                      <li className="py-3" key={i}>
                        <div className="flex w-full items-center space-x-4 justify-between">
                          <div className="flex flex-col text-base font-semibold">
                            <span className="text-sm line-clamp-1">
                              {v.type}
                            </span>
                            <span className="text-red-500 line-clamp-1">
                              - ${currencyFormat(v.total)}
                            </span>
                          </div>

                          <button className="flex space-x-1 bg-slate-700 items-center px-2 cursor-pointer hover:bg-green-700 rounded-lg">
                            <FaCheck className="text-sm" />
                            <span className="text-sm font-semibold py-0.5">
                              Pay
                            </span>
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div
            className="h-full"
            style={{
              ...(subMenu !== subMenuList["transfer"]
                ? { display: "none" }
                : {}),
            }}
          >
            <form
              className="flex flex-col space-y-1 pt-1"
              onSubmit={handleTransferFormSubmit}
            >
              <div className="text-xs px-3 text-gray-400">
                Transfer aman dan terjamin dengan Digital Banking!
              </div>
              <div className="pt-2 px-3">
                <div className="flex flex-col space-y-1 border-b border-gray-800 w-full pb-1">
                  <span className="text-sm text-gray-400">From</span>
                  <div className="flex space-x-2 items-center justify-between">
                    <div className="flex items-center space-x-2 line-clamp-1">
                      <FaDollarSign className="text-xl" />
                      <div className="flex flex-col">
                        <span className="text-sm">Dollar MRI</span>
                        <span className="text-xs text-gray-400 line-clamp-1">
                          Active Balance ${currencyFormat(bank.balance)}
                        </span>
                      </div>
                    </div>
                    <FaCheck className="text-green-500" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end px-5 pt-2">
                <FaMoneyBillTransfer className="text-xl" />
              </div>
              <div className="px-3">
                <div className="flex flex-col space-y-1 border-b border-gray-800 w-full pb-1">
                  <span className="text-sm text-gray-400">To</span>
                  <span className="text-xss text-gray-400">
                    Isi dengan nomor akun bank penerima.
                  </span>
                  <div className="flex space-x-2 items-center justify-between w-full">
                    <div className="flex items-center space-x-2 w-full">
                      <FaRegUser className="text-xl" />
                      <div className="flex flex-col w-full">
                        <input
                          type="text"
                          name="receiver"
                          className="bg-black text-lg font-medium w-full focus:outline-none"
                          value={formDataTransfer.receiver}
                          onChange={handleTransferFormChange}
                          required
                        />
                      </div>
                    </div>
                    <div
                      className="bg-slate-700 hover:bg-slate-800 px-2 py-1 text-xs"
                      style={{
                        borderRadius: 5,
                      }}
                    >
                      <div className="flex items-center cursor-pointer space-x-1">
                        <span>Check</span>
                        <FaSearch />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <div className="flex flex-col space-y-1 border-b border-gray-800 w-full pb-1">
                  <span className="text-sm text-gray-400">Nominal</span>
                  <div className="flex space-x-2 items-center justify-between w-full">
                    <div className="flex items-center space-x-2 w-full">
                      <FaDollarSign className="text-xl" />
                      <div className="flex flex-col w-full">
                        <input
                          type="text"
                          name="total"
                          value={formDataTransfer.total}
                          onChange={handleTransferChange}
                          onKeyDown={handleTransferKeyDown}
                          className="bg-black text-lg font-medium w-full focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <div className="flex flex-col space-y-1 border-b border-gray-800 w-full pb-1">
                  <span className="text-sm text-gray-400">Note</span>
                  <div className="flex space-x-2 items-center justify-between w-full">
                    <div className="flex items-center space-x-2 w-full">
                      <div className="flex flex-col w-full">
                        <input
                          type="text"
                          name="note"
                          value={formDataTransfer.note}
                          onChange={handleTransferFormChange}
                          className="bg-black text-sm font-medium focus:outline-none"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-3">
                <div className="text-xss text-gray-400">
                  * Pastikan data penerima benar!
                </div>
              </div>
              <div className="px-5 pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-2 rounded-lg flex justify-center items-center space-x-2"
                >
                  <span>Submit</span>
                  <FaArrowRightLong />
                </button>
              </div>
            </form>
          </div>
          <div className="absolute bottom-0 w-full pb-2 pt-2.5 bg-black z-30">
            <div className="grid h-full w-full grid-cols-4 mx-auto font-medium">
              <button
                type="button"
                className={`inline-flex flex-col items-center justify-center px-5 group ${
                  subMenu === subMenuList["balance"]
                    ? "text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setSubMenu(subMenuList["balance"])}
              >
                <FiHome className="text-xl" />
                <span className="text-xs">Balance</span>
              </button>
              <button
                type="button"
                className={`inline-flex flex-col items-center justify-center px-5 group ${
                  subMenu === subMenuList["transfer"]
                    ? "text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setSubMenu(subMenuList["transfer"])}
              >
                <FaMoneyBillTransfer className="text-xl" />
                <span className="text-xs">Transfer</span>
              </button>
              <button
                type="button"
                className={`inline-flex flex-col items-center justify-center px-5 group ${
                  subMenu === subMenuList["bill"]
                    ? "text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setSubMenu(subMenuList["bill"])}
              >
                <MdOutlineReceiptLong className="text-xl" />
                <span className="text-xs">Bills</span>
              </button>
              <button
                type="button"
                className={`inline-flex flex-col items-center justify-center px-5 group ${
                  subMenu === subMenuList["history"]
                    ? "text-white"
                    : "text-gray-600"
                }`}
                onClick={() => setSubMenu(subMenuList["history"])}
              >
                <BiTransfer className="text-xl" />
                <span className="text-xs">History</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default BankComponent;
