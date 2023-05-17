import "@rainbow-me/rainbowkit/styles.css"

import { connectorsForWallets } from "@rainbow-me/rainbowkit"
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { configureChains, createClient } from "wagmi"
import { Chain, mainnet } from "wagmi/chains"
import { alchemyProvider } from "wagmi/providers/alchemy"
import { jsonRpcProvider } from "wagmi/providers/jsonRpc"

// create a custom Chain with id 1337
const localChain: Chain = {
  id: 1337,
  name: "Local",
  nativeCurrency: { decimals: 18, name: "Ether", symbol: "ETH" },
  network: "local",
  rpcUrls: {
    default: { http: import.meta.env.VITE_1337_RPC },
    public: { http: import.meta.env.VITE_1337_RPC },
  },
}

export const { chains, provider } = configureChains(
  [mainnet, localChain],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID }),
    jsonRpcProvider({
      rpc: ({ id, rpcUrls }) => {
        const http = import.meta.env[`VITE_${id}_RPC`] || rpcUrls.public

        if (!http) return null
        return { http }
      },
    }),
  ],
)

const needsInjectedWalletFallback =
  typeof window !== "undefined" &&
  window.ethereum &&
  !window.ethereum.isMetaMask &&
  !window.ethereum.isCoinbaseWallet

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ appName: "Fleek dApp", chains }),
      ledgerWallet({ chains }),
      rainbowWallet({ chains }),
      ...(needsInjectedWalletFallback ? [injectedWallet({ chains })] : []),
    ],
  },
  {
    groupName: "Others",
    wallets: [walletConnectWallet({ chains }), braveWallet({ chains })],
  },
])

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
})
