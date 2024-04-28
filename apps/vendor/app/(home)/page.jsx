import LandingPage from "@/components/home/LandingPage"
import { config } from "ui/config"

export const metadata = {
  title: `${config.platformName} | Vendor`,

}

export default function Home() {
  return (
    <>
      <LandingPage />
    </>
  )
}
