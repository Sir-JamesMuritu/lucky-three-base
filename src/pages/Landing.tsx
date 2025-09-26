import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import heroImage from '@/assets/hero-background.jpg'

const Landing = () => {
  const { isConnected } = useAccount()
  const navigate = useNavigate()

  useEffect(() => {
    if (isConnected) {
      navigate('/game')
    }
  }, [isConnected, navigate])

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="p-6 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">L3</span>
            </div>
            <h1 className="text-2xl font-bold gradient-text">Lucky3</h1>
          </div>
          <ConnectButton />
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="gradient-text">Lucky3</span>
            </h1>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 glitch">
              On-Chain Betting Game
            </h2>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Bet, Win, Celebrate! Fair and transparent betting built on Base blockchain
            </p>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="glass-card p-6 float">
                <div className="text-4xl mb-3">🎲</div>
                <h3 className="text-xl font-bold text-white mb-2">Fair & Random</h3>
                <p className="text-gray-400">Provably fair random number generation on-chain</p>
              </Card>
              
              <Card className="glass-card p-6 float" style={{ animationDelay: '0.5s' }}>
                <div className="text-4xl mb-3">⚡</div>
                <h3 className="text-xl font-bold text-white mb-2">Fast Rounds</h3>
                <p className="text-gray-400">Quick 5-minute rounds for instant excitement</p>
              </Card>
              
              <Card className="glass-card p-6 float" style={{ animationDelay: '1s' }}>
                <div className="text-4xl mb-3">💎</div>
                <h3 className="text-xl font-bold text-white mb-2">Big Rewards</h3>
                <p className="text-gray-400">Winner takes all from the betting pool</p>
              </Card>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <ConnectButton.Custom>
                {({ openConnectModal, connectModalOpen }) => (
                  <Button
                    onClick={openConnectModal}
                    size="lg"
                    className="neon-glow bg-gradient-to-r from-primary to-accent hover:from-primary-glow hover:to-accent border-0 text-white text-lg px-8 py-4 h-auto"
                    disabled={connectModalOpen}
                  >
                    🚀 Connect Wallet & Play
                  </Button>
                )}
              </ConnectButton.Custom>
              
              <Button
                variant="outline"
                size="lg" 
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 h-auto"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Learn How It Works
              </Button>
            </div>
          </div>
        </main>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-white mb-16">How It Works</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 mx-auto pulse-glow">1</div>
                <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
                <p className="text-gray-400">Connect your MetaMask or Coinbase wallet to get started</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 mx-auto pulse-glow" style={{ animationDelay: '0.5s' }}>2</div>
                <h3 className="text-xl font-bold text-white mb-2">Pick Your Number</h3>
                <p className="text-gray-400">Choose one of 3 random numbers generated each round</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 mx-auto pulse-glow" style={{ animationDelay: '1s' }}>3</div>
                <h3 className="text-xl font-bold text-white mb-2">Place Your Bet</h3>
                <p className="text-gray-400">Bet the fixed ETH amount and wait for the round to end</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-2xl font-bold text-white mb-4 mx-auto pulse-glow" style={{ animationDelay: '1.5s' }}>4</div>
                <h3 className="text-xl font-bold text-white mb-2">Win & Withdraw</h3>
                <p className="text-gray-400">If you chose correctly, claim your share of the prize pool</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 text-center text-gray-400 border-t border-white/10">
          <p>&copy; 2024 Lucky3. Built on Base blockchain. Always bet responsibly.</p>
        </footer>
      </div>
    </div>
  )
}

export default Landing