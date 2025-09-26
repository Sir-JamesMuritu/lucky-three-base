import { useState } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useLucky3 } from '@/hooks/useLucky3'
import { formatEther } from 'viem'
import { Link } from 'react-router-dom'

const Game = () => {
  const { address, isConnected } = useAccount()
  const { gameData, placeBet, formatTimeLeft } = useLucky3()
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null)
  const [userBet, setUserBet] = useState<number | null>(null)

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <Card className="glass-card p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
          <p className="text-gray-400 mb-6">You need to connect your wallet to play Lucky3</p>
          <ConnectButton />
        </Card>
      </div>
    )
  }

  const handlePlaceBet = async () => {
    if (selectedNumber !== null) {
      await placeBet(selectedNumber)
      setUserBet(selectedNumber)
      setSelectedNumber(null)
    }
  }

  const timeProgress = ((300 - gameData.timeLeft) / 300) * 100

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">L3</span>
              </div>
              <h1 className="text-2xl font-bold gradient-text">Lucky3</h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/leaderboard">
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                🏆 Leaderboard
              </Button>
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Game Status */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <Badge variant={gameData.gameActive ? "default" : "secondary"} className="text-lg px-4 py-2">
                {gameData.gameActive ? "🟢 Game Active" : "🔴 Game Ended"}
              </Badge>
              <div className="text-2xl font-bold text-white">
                Round Timer: {formatTimeLeft(gameData.timeLeft)}
              </div>
            </div>
          </div>
          
          <Progress value={timeProgress} className="h-3 bg-muted/20" />
        </div>

        {/* Lucky Numbers */}
        <Card className="glass-card p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Choose Your Lucky Number</h2>
          
          <div className="grid grid-cols-3 gap-6 mb-8">
            {gameData.currentOptions.map((number, index) => (
              <button
                key={index}
                className={`lucky-number p-8 rounded-xl text-center transition-all duration-300 ${
                  selectedNumber === index ? 'selected' : ''
                } ${userBet === index ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                onClick={() => userBet === null && setSelectedNumber(selectedNumber === index ? null : index)}
                disabled={userBet !== null}
              >
                <div className="text-6xl font-bold gradient-text mb-2">{number}</div>
                <div className="text-lg text-gray-300">
                  Pool: {formatEther(gameData.optionTotals[index])} ETH
                </div>
              </button>
            ))}
          </div>

          {/* Bet Info */}
          <div className="text-center mb-6">
            <p className="text-xl text-gray-300 mb-4">
              Bet Amount: <span className="text-accent font-bold">{formatEther(gameData.betAmount)} ETH</span>
            </p>
            
            {userBet !== null ? (
              <div className="p-4 bg-success/20 border border-success/30 rounded-lg">
                <p className="text-success font-bold">
                  ✅ You bet on number {gameData.currentOptions[userBet]}
                </p>
                <p className="text-gray-400 mt-2">Wait for the round to end to see if you won!</p>
              </div>
            ) : (
              <Button
                onClick={handlePlaceBet}
                disabled={selectedNumber === null || !gameData.gameActive}
                className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent border-0 text-white text-xl px-12 py-4 h-auto"
              >
                {selectedNumber !== null 
                  ? `🎲 Bet on ${gameData.currentOptions[selectedNumber]}`
                  : '🎲 Select a Number to Bet'
                }
              </Button>
            )}
          </div>
        </Card>

        {/* Live Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-lg font-bold text-white mb-1">Total Pool</h3>
            <p className="text-2xl font-bold text-accent">
              {formatEther(gameData.optionTotals.reduce((a, b) => a + b, 0n))} ETH
            </p>
          </Card>
          
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">⏱️</div>
            <h3 className="text-lg font-bold text-white mb-1">Time Left</h3>
            <p className="text-2xl font-bold text-warning">
              {formatTimeLeft(gameData.timeLeft)}
            </p>
          </Card>
          
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-lg font-bold text-white mb-1">Your Bet</h3>
            <p className="text-2xl font-bold text-primary">
              {userBet !== null ? gameData.currentOptions[userBet] : 'None'}
            </p>
          </Card>
        </div>

        {/* Game Rules */}
        <Card className="glass-card p-6 mt-8">
          <h3 className="text-xl font-bold text-white mb-4">🎮 How to Play</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <p className="mb-2">• Choose one of the 3 random numbers</p>
              <p className="mb-2">• Place your bet before time runs out</p>
            </div>
            <div>
              <p className="mb-2">• Winners split the entire prize pool</p>
              <p className="mb-2">• New round starts automatically</p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}

export default Game