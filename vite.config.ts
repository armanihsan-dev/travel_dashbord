import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {sentryReactRouter, type SentryReactRouterBuildOptions} from "@sentry/react-router";

const sentryConfig: SentryReactRouterBuildOptions = {
  org: "procodrrs",
  project: "travel_agency",
  // An auth token is required for uploading source maps.
  authToken: "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"
  // ...
};

export default defineConfig(config => {
  return {
    plugins: [tailwindcss(),tsconfigPaths(), reactRouter(),sentryReactRouter(sentryConfig, config)],
    ssr:{
      noExternal:[/@syncfusion/]
    }
  };
});