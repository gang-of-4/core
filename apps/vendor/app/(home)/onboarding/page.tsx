import React from "react";
import Page from "@/components/onboarding";
import { Metadata } from "next";
import { config } from "ui/config";
import { capitalize } from "@/utils/format-string";

export const metadata: Metadata = {
  title: `${config.platformName} | Create ${capitalize(config.store.name)}`,
};

export default function page() {
  return <Page />;
}
