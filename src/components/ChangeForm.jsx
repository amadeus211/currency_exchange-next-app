"use client";

import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import dayjs from "dayjs";

export default function ChangeForm({
  currencyFrom,
  setCurrencyFrom,
  currencyTo,
  setCurrencyTo,
}) {
  const [currencies, setCurrencies] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currencyFromAmount, setCurrencyFromAmount] = useState(1);
  const [convertedData, setConvertedData] = useState({});

  const fetchCurrency = async () => {
    try {
      const res = await fetch(
        `${process.env.API_HOST}/currencies?api_key=${process.env.API_KEY}&type=fiat`
      );

      if (res.ok) {
        const data = await res.json();
        const currencyArray = Object.values(data);
        setCurrencies(currencyArray);
      }
    } catch (error) {
      console.error("Error fetching currency data:", error);
    } finally {
      setLoading(false);
    }
  };

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
    fetchCurrency();
    const currencyFromStorage = JSON.parse(
      sessionStorage.getItem("currencyFrom")
    );
    const currencyToStorage = JSON.parse(sessionStorage.getItem("currencyTo"));
    const amountStorage = sessionStorage.getItem("amount");

    if (currencyFromStorage && currencyToStorage && amountStorage) {
      setCurrencyFrom(currencyFrom);
      setCurrencyTo(currencyTo);
      setCurrencyFromAmount(amountStorage);
      fetchConvert(
        currencyFromStorage.shortCode,
        currencyToStorage.shortCode,
        amountStorage
      );
    } else {
      fetchConvert(currencyFrom, currencyTo, currencyFromAmount);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    fetchConvert(
      currencyFrom.shortCode,
      currencyTo.shortCode,
      currencyFromAmount
    );

    sessionStorage.setItem("currencyFrom", JSON.stringify(currencyFrom));
    sessionStorage.setItem("currencyTo", JSON.stringify(currencyTo));
    sessionStorage.setItem("amount", currencyFromAmount);
  };

  const handleCurrencyChange = (setter) => (e) => {
    const selectedCurrency = currencies.find(
      (currency) => currency.name === e.target.value
    );
    if (selectedCurrency) {
      setter({
        name: selectedCurrency.name,
        shortCode: selectedCurrency.short_code,
      });
    } else {
      setter({
        name: e.target.value,
        shortCode: "",
      });
    }
  };

  if (loading) {
    return (
      <div className="fixed flex items-center justify-center inset-0">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full items-center justify-center mx-auto w-full">
      <form
        className="flex flex-col gap-5 border-2 rounded-3xl border-slate-300 shadow-xl p-10"
        onSubmit={handleSubmit}
      >
        {convertedData && convertedData.value ? (
          <div className="flex flex-col ">
            <p className="text-[15px] font-semibold">
              {convertedData.response.amount} {convertedData.response.from}{" "}
              equals{" "}
            </p>
            <p className="text-[30px] font-semibold">
              <span className="text-red-900">
                {convertedData.value.toFixed(2)}
              </span>{" "}
              {convertedData.response.to}
            </p>
          </div>
        ) : (
          <></>
        )}
        <div className="flex sm:flex-row flex-col sm:gap-10 gap-5">
          <label className="flex flex-col gap-4 justify-between text-[18px] font-medium">
            Currency From:
            <input
              type="text"
              name="currencyFrom"
              list="currencyname"
              className="border rounded-xl border-zinc-800 p-4 placeholder:text-[15px]"
              value={currencyFrom.name}
              onChange={handleCurrencyChange(setCurrencyFrom)}
            />
          </label>

          <label className="flex flex-col gap-4 justify-between text-[18px] font-medium">
            Currency To:
            <input
              type="text"
              name="currencyTo"
              list="currencyname"
              className="border rounded-xl border-zinc-800 p-4 placeholder:text-[15px]"
              value={currencyTo.name}
              onChange={handleCurrencyChange(setCurrencyTo)}
            />
          </label>
        </div>

        <label className="flex flex-col gap-4 justify-between text-[18px] font-medium">
          Amount:
          <input
            type="number"
            className="border rounded-xl border-zinc-800 p-4 placeholder:text-[15px]"
            placeholder="Amount"
            onChange={(e) => {
              setCurrencyFromAmount(e.target.value);
            }}
            value={currencyFromAmount}
          />
        </label>

        {currencies.length > 0 && (
          <datalist id="currencyname">
            {currencies.map((currency, index) => (
              <option key={index} value={currency.name}>
                ({currency.short_code})
              </option>
            ))}
          </datalist>
        )}

        <button
          className="px-10 py-3 bg-zinc-800 font-semibold hover:bg-zinc-900 text-[22px] text-white border rounded-xl"
          type="submit"
        >
          Find
        </button>
      </form>
    </div>
  );
}
