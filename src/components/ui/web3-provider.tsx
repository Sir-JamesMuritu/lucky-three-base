import { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { base, baseSepolia } from 'wagmi/chains'
import '@rainbow-me/rainbowkit/styles.css'

const config = getDefaultConfig({
  appName: 'Lucky3',
  projectId: 'YOUR_PROJECT_ID', // Replace with your WalletConnect project ID
  chains: [base, baseSepolia],
  ssr: false,
})

const queryClient = new QueryClient()

interface Web3ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: Web3ProviderProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={{
          blurs: {
            modalOverlay: 'blur(8px)',
          },
          colors: {
            accentColor: '#3B82F6',
            accentColorForeground: 'white',
            actionButtonBorder: 'transparent',
            actionButtonBorderMobile: 'transparent',
            actionButtonSecondaryBackground: '#1F2937',
            closeButton: '#9CA3AF',
            closeButtonBackground: '#374151',
            connectButtonBackground: '#1F2937',
            connectButtonBackgroundError: '#EF4444',
            connectButtonInnerBackground: '#111827',
            connectButtonText: 'white',
            connectButtonTextError: 'white',
            connectionIndicator: '#10B981',
            downloadBottomCardBackground: '#111827',
            downloadTopCardBackground: '#1F2937',
            error: '#EF4444',
            generalBorder: '#374151',
            generalBorderDim: '#1F2937',
            menuItemBackground: '#111827',
            modalBackdrop: 'rgba(0, 0, 0, 0.8)',
            modalBackground: '#111827',
            modalBorder: '#374151',
            modalText: 'white',
            modalTextDim: '#9CA3AF',
            modalTextSecondary: '#D1D5DB',
            profileAction: '#1F2937',
            profileActionHover: '#374151',
            profileForeground: '#111827',
            selectedOptionBorder: '#3B82F6',
            standby: '#9CA3AF',
          },
          fonts: {
            body: 'Inter, system-ui, sans-serif',
          },
          radii: {
            actionButton: '8px',
            connectButton: '8px',
            menuButton: '8px',
            modal: '12px',
            modalMobile: '12px',
          },
          shadows: {
            connectButton: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
            dialog: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
            profileDetailsAction: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
            selectedOption: '0 0 0 2px #3B82F6',
            selectedWallet: '0 0 0 2px #3B82F6',
            walletLogo: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
          },
        }}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}