import * as Sentry from "@sentry/browser";
import { BrowserTracing } from "@sentry/tracing";

Sentry.init({
  dsn: "https://0fc7ef2b2d2f4b00b09fb67987ea1269@o773433.ingest.sentry.io/4504657622663168",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});
