import React from "react";
import ChangeForm from "@/components/ChangeForm";
import Header from "@/components/Header";
import ExchangeLayout from "@/components/ExchangeLayout";

export default function Page() {
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <ExchangeLayout />
    </div>
  );
}
