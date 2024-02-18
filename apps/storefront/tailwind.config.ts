import type { Config } from "tailwindcss";
import tailwindConfig from "tailwind-config/tailwind.config";

const config: Pick<Config, "presets"> = {
  presets: [tailwindConfig],
};

export default config;
