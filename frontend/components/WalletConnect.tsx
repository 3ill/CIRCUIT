import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  base,
  baseGoerli,
  zora,
  optimismGoerli,
  goerli,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, optimismGoerli, goerli, base, baseGoerli, zora],
  [publicProvider()]
);

const projectId = 'ee4b286452c7ab971c5e7013b5b3f755';

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { RainbowKitProvider, WagmiConfig, wagmiConfig, chains };
