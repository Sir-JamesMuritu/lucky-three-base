import { Link } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

// Mock leaderboard data - would come from smart contract events in real app
const mockLeaderboard = [
  { address: '0x1234...5678', nickname: 'CryptoKing', totalWinnings: '2.5', gamesWon: 15 },
  { address: '0x9876...5432', nickname: 'LuckyPlayer', totalWinnings: '1.8', gamesWon: 12 },
  { address: '0xabcd...efgh', nickname: 'DiamondHands', totalWinnings: '1.2', gamesWon: 8 },
  { address: '0x5555...6666', nickname: 'NumberMaster', totalWinnings: '0.9', gamesWon: 6 },
  { address: '0x7777...8888', nickname: 'BetGuru', totalWinnings: '0.7', gamesWon: 4 },
]

const mockRoundHistory = [
  { round: 145, numbers: [14, 27, 89], winner: 27, pool: '3.2', timestamp: '2 min ago' },
  { round: 144, numbers: [52, 71, 33], winner: 52, pool: '2.8', timestamp: '7 min ago' },
  { round: 143, numbers: [19, 85, 42], winner: 85, pool: '4.1', timestamp: '12 min ago' },
  { round: 142, numbers: [63, 28, 97], winner: 28, pool: '2.9', timestamp: '17 min ago' },
  { round: 141, numbers: [35, 76, 18], winner: 76, pool: '3.7', timestamp: '22 min ago' },
]

const Leaderboard = () => {
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
            <Link to="/game">
              <Button className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent border-0 text-white">
                🎲 Play Game
              </Button>
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">🏆 Leaderboard</h1>
          <p className="text-xl text-gray-300">Top players and recent round results</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Players */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              👑 Top Players
            </h2>
            
            <div className="space-y-4">
              {mockLeaderboard.map((player, index) => (
                <div key={player.address} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex items-center space-x-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === 0 ? 'bg-yellow-500 text-black' :
                      index === 1 ? 'bg-gray-400 text-black' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-primary/20 text-primary'
                    }`}>
                      {index + 1}
                    </div>
                    
                    <div>
                      <div className="text-white font-semibold">{player.nickname}</div>
                      <div className="text-sm text-gray-400">{player.address}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-accent font-bold">{player.totalWinnings} ETH</div>
                    <div className="text-sm text-gray-400">{player.gamesWon} wins</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Rounds */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              📊 Recent Rounds
            </h2>
            
            <div className="space-y-4">
              {mockRoundHistory.map((round) => (
                <div key={round.round} className="p-4 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-primary border-primary/30">
                      Round #{round.round}
                    </Badge>
                    <span className="text-sm text-gray-400">{round.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">Numbers:</span>
                      {round.numbers.map((num, index) => (
                        <span 
                          key={index}
                          className={`px-2 py-1 rounded text-sm font-bold ${
                            num === round.winner 
                              ? 'bg-success text-success-foreground' 
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-success font-semibold">Winner: {round.winner}</span>
                    <span className="text-accent font-bold">{round.pool} ETH</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">🎲</div>
            <h3 className="text-lg font-bold text-white mb-1">Total Rounds</h3>
            <p className="text-2xl font-bold text-primary">145</p>
          </Card>
          
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-lg font-bold text-white mb-1">Total Volume</h3>
            <p className="text-2xl font-bold text-accent">127.8 ETH</p>
          </Card>
          
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="text-lg font-bold text-white mb-1">Active Players</h3>
            <p className="text-2xl font-bold text-success">342</p>
          </Card>
          
          <Card className="glass-card p-6 text-center">
            <div className="text-3xl mb-2">🏆</div>
            <h3 className="text-lg font-bold text-white mb-1">Biggest Win</h3>
            <p className="text-2xl font-bold text-warning">8.5 ETH</p>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link to="/game">
            <Button 
              size="lg"
              className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent border-0 text-white text-xl px-12 py-4 h-auto"
            >
              🚀 Join the Game Now
            </Button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Leaderboard