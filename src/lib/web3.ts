import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors'

// Lucky3 contract configuration
export const LUCKY3_CONTRACT = {
  address: '0x1234567890123456789012345678901234567890' as const, // Placeholder - replace with actual deployed contract
  abi: [
    // Contract ABI - these would be generated from the actual smart contract
    {
      name: 'placeBet',
      type: 'function',
      inputs: [{ name: 'option', type: 'uint256' }],
      outputs: [],
      stateMutability: 'payable',
    },
    {
      name: 'endGame',
      type: 'function', 
      inputs: [{ name: 'winningOption', type: 'uint256' }],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      name: 'withdraw',
      type: 'function',
      inputs: [],
      outputs: [],
      stateMutability: 'nonpayable',
    },
    {
      name: 'betAmount',
      type: 'function',
      inputs: [],
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      name: 'winningOption',
      type: 'function',
      inputs: [],
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      name: 'gameActive',
      type: 'function',
      inputs: [],
      outputs: [{ name: '', type: 'bool' }],
      stateMutability: 'view',
    },
    {
      name: 'currentOptions',
      type: 'function',
      inputs: [{ name: '', type: 'uint256' }],
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
    },
    {
      name: 'optionTotals',
      type: 'function',
      inputs: [{ name: '', type: 'uint256' }],
      outputs: [{ name: '', type: 'uint256' }],
      stateMutability: 'view',
    },
  ] as const,
} as const

export const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    metaMask(),
    coinbaseWallet({ appName: 'Lucky3' }),
    walletConnect({ 
      projectId: '12345678901234567890123456789012' // Replace with actual WalletConnect project ID
    }),
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
})