import { useReadContract, useWriteContract, useWatchContractEvent, useAccount } from 'wagmi'
import { LUCKY3_CONTRACT } from '@/lib/web3'
import { useState, useEffect } from 'react'
import { toast } from '@/hooks/use-toast'
import { base } from 'wagmi/chains'

export function useLucky3() {
  const { address } = useAccount()
  const [gameData, setGameData] = useState({
    betAmount: 100000000000000000n, // 0.1 ETH in wei
    currentOptions: [14, 27, 89], // Mock data - will come from contract
    optionTotals: [0n, 0n, 0n],
    gameActive: true,
    winningOption: null as number | null,
    timeLeft: 300, // 5 minutes in seconds
  })

  // Mock contract reads for development
  const { data: betAmount } = useReadContract({
    address: LUCKY3_CONTRACT.address,
    abi: LUCKY3_CONTRACT.abi,
    functionName: 'betAmount',
  })

  const { data: gameActive } = useReadContract({
    address: LUCKY3_CONTRACT.address,
    abi: LUCKY3_CONTRACT.abi,
    functionName: 'gameActive',
  })

  const { writeContract } = useWriteContract()

  // Mock timer for round countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setGameData(prev => ({
        ...prev,
        timeLeft: prev.timeLeft > 0 ? prev.timeLeft - 1 : 300
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const placeBet = async (option: number) => {
    if (!address) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to place a bet",
        variant: "destructive",
      })
      return
    }

    try {
      await writeContract({
        address: LUCKY3_CONTRACT.address,
        abi: LUCKY3_CONTRACT.abi,
        functionName: 'placeBet',
        args: [BigInt(option)],
        value: gameData.betAmount,
        chain: base,
        account: address,
      })
      
      toast({
        title: "Bet Placed! 🎲",
        description: `You bet on number ${gameData.currentOptions[option]}`,
      })
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Could not place bet. Please try again.",
        variant: "destructive",
      })
    }
  }

  const withdraw = async () => {
    if (!address) {
      toast({
        title: "Connect Wallet", 
        description: "Please connect your wallet to withdraw",
        variant: "destructive",
      })
      return
    }

    try {
      await writeContract({
        address: LUCKY3_CONTRACT.address,
        abi: LUCKY3_CONTRACT.abi,
        functionName: 'withdraw',
        chain: base,
        account: address,
      })
      
      toast({
        title: "Withdrawal Successful! 💰",
        description: "Your winnings have been transferred to your wallet",
      })
    } catch (error) {
      toast({
        title: "Withdrawal Failed", 
        description: "Could not withdraw funds. Please try again.",
        variant: "destructive",
      })
    }
  }

  return {
    gameData,
    placeBet,
    withdraw,
    formatTimeLeft: (seconds: number) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
  }
}