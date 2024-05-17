import StoresPage from "@/components/home/StoresPage";
import { capitalize } from "@/utils/format-string";
import React from "react";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | ${capitalize(config.store.plural)}`,
};

export default function page() {
  return <StoresPage />;
}
