import React from "react"

import { RainbowKitProvider } from "@rainbow-me/rainbowkit"
import ReactDOM from "react-dom/client"
import { WagmiConfig } from "wagmi"

import App from "./App"
import { chains, wagmiClient } from "./services"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
