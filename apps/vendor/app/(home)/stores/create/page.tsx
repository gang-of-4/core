import React from "react";
import Page from "@/components/dashboard/stores/CreateStore";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Store | Vendor",
  description: "Vendor create store page",
};

export default function page() {
  return <Page />;
}
