"use client";
import React, { useState, useEffect } from "react";
import Header from "./Header";
import Link from "next/link";
import Exchange from "../images/exchange.jpg";
import Image from "next/image";
import Loading from "./Loading";

export default function Homepage() {
  const [convertedData, setConvertedData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchConvert = async (currencyFrom, currencyTo, amount) => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.API_HOST}/convert?from=${currencyFrom}&to=${currencyTo}&amount=${amount}&api_key=${process.env.API_KEY}`
      );
      if (res.ok) {
        const data = await res.json();
        setConvertedData(data);
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConvert("USD", "UAH", 100);
  }, []);

  if (loading) {
    return (
      <div className="fixed flex items-center justify-center inset-0">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div className="flex flex-col md:flex-row w-full flex-grow items-center justify-center bg-zinc-900">
        <div className="flex flex-col gap-10 items-center justify-center  w-full py-10">
          <div className="flex flex-col gap-10 items-center justify-center border-b-4 border-slate-500 pb-20 w-full">
            <p className="text-[28px] md:text-[50px] font-bold max-w-sm text-center text-white">
              WELCOME TO CURRENCY EXCHANGE APP
            </p>
            <div className="flex flex-col items-center gap-4 text-white">
              <p className="text-[20px] md:text-[28px]">
                Current USD/UAH exchange rate is:
              </p>
              <p className="font-semibold text-[28px]">
                100 USD = {convertedData.value.toFixed(2)} UAH
              </p>
            </div>{" "}
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-[28px] md:text-[40px] font-bold text-white">
                To see more rates
              </p>
              <Link
                href={"/exchange"}
                className="px-10 py-3 bg-zinc-700 font-semibold hover:bg-green-700 text-[22px] text-white border rounded-xl border-zinc-900 transition-all ease-in-out duration-150"
              >
                Click Button
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
