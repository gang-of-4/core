import ContactPage from "@/components/home/ContactPage";
import React from "react";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | Contact Us`,
};

export default function page() {
  return <ContactPage />;
}
