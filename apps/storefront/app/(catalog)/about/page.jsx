import AboutPage from "@/components/home/AboutPage";
import React from "react";
import { config } from "ui/config";

export const metadata = {
  title: `${config.platformName} | About Us`,
};

export default function page() {
  return <AboutPage />;
}
