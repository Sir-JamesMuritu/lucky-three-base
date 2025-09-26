import { useState } from 'react'
import confetti from 'canvas-confetti'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLucky3 } from '@/hooks/useLucky3'

interface WinModalProps {
  isOpen: boolean
  onClose: () => void
  hasWon: boolean
  winningNumber: number
  prizeAmount: string
}

export function WinModal({ isOpen, onClose, hasWon, winningNumber, prizeAmount }: WinModalProps) {
  const [isWithdrawing, setIsWithdrawing] = useState(false)
  const { withdraw } = useLucky3()

  const handleWithdraw = async () => {
    setIsWithdrawing(true)
    await withdraw()
    setIsWithdrawing(false)
    onClose()
  }

  const triggerConfetti = () => {
    const count = 200
    const defaults = {
      origin: { y: 0.7 }
    }

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    fire(0.2, {
      spread: 60,
    })

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  if (hasWon) {
    setTimeout(() => triggerConfetti(), 500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-2 border-primary/30 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {hasWon ? (
              <div className="space-y-4">
                <div className="text-6xl animate-bounce">🎉</div>
                <h2 className="text-3xl font-bold gradient-text">Congratulations!</h2>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-6xl">😢</div>
                <h2 className="text-3xl font-bold text-gray-300">Better Luck Next Round</h2>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-6">
          <div>
            <Badge variant="outline" className="text-lg px-4 py-2 mb-3 border-accent text-accent">
              Winning Number: {winningNumber}
            </Badge>
            
            {hasWon ? (
              <div className="space-y-4">
                <div className="p-6 bg-success/20 border border-success/30 rounded-lg">
                  <div className="text-2xl font-bold text-success mb-2">🏆 You Won!</div>
                  <div className="text-3xl font-bold gradient-text">{prizeAmount} ETH</div>
                </div>
                
                <Button
                  onClick={handleWithdraw}
                  disabled={isWithdrawing}
                  className="neon-glow bg-gradient-to-r from-success to-accent hover:from-success/80 hover:to-accent/80 border-0 text-white text-lg px-8 py-3 h-auto w-full"
                >
                  {isWithdrawing ? '💸 Withdrawing...' : '💰 Withdraw Prize'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-6 bg-muted/20 border border-border/30 rounded-lg">
                  <div className="text-lg text-gray-300 mb-2">The winning number was</div>
                  <div className="text-4xl font-bold text-accent">{winningNumber}</div>
                </div>
                
                <p className="text-gray-400">
                  Don't worry! A new round is starting soon. Try your luck again!
                </p>
              </div>
            )}
          </div>

          <Button
            onClick={onClose}
            variant="outline"
            className="border-primary/30 text-primary hover:bg-primary/10 w-full"
          >
            {hasWon ? 'Play Again' : 'Try Next Round'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}