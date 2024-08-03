"use client";
import React from "react";
import ChangeForm from "./ChangeForm";
import { useState } from "react";

export default function ExchangeLayout() {
  const [currencyFrom, setCurrencyFrom] = useState({
    name: "US Dollar",
    shortCode: "USD",
  });
  const [currencyTo, setCurrencyTo] = useState({
    name: "Hryvnia",
    shortCode: "UAH",
  });
  return (
    <div className="h-full flex flex-col ">
      <div className="flex lg:flex-row flex-col gap-20 h-full my-10">
        <ChangeForm
          currencyFrom={currencyFrom}
          setCurrencyFrom={setCurrencyFrom}
          currencyTo={currencyTo}
          setCurrencyTo={setCurrencyTo}
        />
      </div>
    </div>
  );
}
