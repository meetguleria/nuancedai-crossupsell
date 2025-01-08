import { useMemo, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Provider } from "@shopify/app-bridge-react";
import { Banner, Layout, Page } from "@shopify/polaris";

export function AppBridgeProvider({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const history = useMemo(
    () => ({
      replace: (path) => {
        navigate(path, { replace: true });
      },
    }),
    [navigate]
  );

  const routerConfig = useMemo(
    () => ({ history, location }),
    [history, location]
  );

  // Add console log to verify host and apiKey
  useEffect(() => {
    const host = new URLSearchParams(location.search).get("host");
    console.log("AppBridgeProvider: host =", host);
    console.log("AppBridgeProvider: VITE_SHOPIFY_API_KEY =", import.meta.env.VITE_SHOPIFY_API_KEY);
  }, [location.search]);

  const [appBridgeConfig] = useState(() => {
    const host =
      new URLSearchParams(location.search).get("host") ||
      window.__SHOPIFY_DEV_HOST;

    console.log("AppBridgeProvider Initial host:", host);

    window.__SHOPIFY_DEV_HOST = host;

    return {
      host,
      apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
      forceRedirect: true,
    };
  });

  // Log appBridgeConfig
  useEffect(() => {
    console.log("AppBridgeProvider Config:", appBridgeConfig);
  }, [appBridgeConfig]);

  if (!import.meta.env.VITE_SHOPIFY_API_KEY || !appBridgeConfig.host) {
    const bannerProps = !import.meta.env.VITE_SHOPIFY_API_KEY
      ? {
          title: "Missing Shopify API Key",
          children: (
            <>
              Your app is running without the SHOPIFY_API_KEY environment
              variable. Please ensure that it is set when running or building
              your React app.
            </>
          ),
        }
      : {
          title: "Missing host query argument",
          children: (
            <>
              Your app can only load if the URL has a <b>host</b> argument.
              Please ensure that it is set, or access your app using the
              Partners Dashboard <b>Test your app</b> feature
            </>
          ),
        };

    console.error("AppBridgeProvider: Missing required config.", {
      apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
      host: appBridgeConfig.host,
    });

    return (
      <Page narrowWidth>
        <Layout>
          <Layout.Section>
            <div style={{ marginTop: "100px" }}>
              <Banner {...bannerProps} status="critical" />
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  return (
    <Provider config={appBridgeConfig} router={routerConfig}>
      {children}
    </Provider>
  );
}
