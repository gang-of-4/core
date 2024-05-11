import Home from "@/components/dashboard/Home";
import { Metadata } from "next";
import React from "react";
import { config } from "ui/config";

export const metadata: Metadata = {
  title: `${config.platformName} | Vendor Dashboard`,
};

export default function page() {
  return (
    <>
      <Home />
    </>
  );
}
