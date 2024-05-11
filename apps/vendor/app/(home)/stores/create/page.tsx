import React from "react";
import Page from "@/components/dashboard/stores/CreateStore";
import { Metadata } from "next";
import { config } from "ui/config";
import { capitalize } from "@/utils/format-string";

export const metadata: Metadata = {
  title: `${config.platformName} | Create ${capitalize(config.store.business.name)}`,
};

export default function page() {
  return <Page />;
}
