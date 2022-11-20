import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import {
  RainbowKitProvider,
  getDefaultWallets,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import GlobalContextProvider, { useGlobal } from "@/app/context/GlobalContext";
import { ConfigProvider } from "antd";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.sepolia]
      : []),
  ],
  [
    alchemyProvider({
      apiKey: process.env.ALCHEMY_KEY as string,
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [authenticationStatus, setAuthenticationStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");
  const { connectUser } = useGlobal();

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await fetch("/api/auth/nonce");
      const res = await response.json();
      return res;
    },
    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: "Sign in with Ethereum to the app.",
        uri: window.location.origin,
        version: "1",
        chainId,
        nonce,
      });
    },
    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },
    verify: async ({ message, signature }) => {
      console.log({ signature });
      const verifyRes = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          authSig: {
            message,
            signature,
            signedMessage: message.prepareMessage(),
          },
        }),
      });
      console.log({ verifyRes });
      setAuthenticationStatus(
        verifyRes.ok ? "authenticated" : "unauthenticated"
      );
      window.location.reload();
      return Boolean(verifyRes.ok);
    },
    signOut: async () => {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
      setAuthenticationStatus("unauthenticated");
    },
  });

  useEffect(() => {
    void (async () => {
      const res = await fetch("/api/auth/me");
      const user = await res.json();
      console.log({ user });
      setAuthenticationStatus(
        user.address ? "authenticated" : "unauthenticated"
      );
      console.log({ user });
      connectUser && connectUser(user._id);
    })();
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={authenticationStatus}
      >
        <RainbowKitProvider
          chains={chains}
          theme={darkTheme()}
          modalSize="compact"
        >
          <GlobalContextProvider>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#00b96b",
                },
              }}
            >
              <Component {...pageProps} />
            </ConfigProvider>
          </GlobalContextProvider>
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
}

export default MyApp;
