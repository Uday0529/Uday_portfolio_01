'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { X, Play, RotateCcw, Volume2, VolumeX, Trophy, Gamepad2 } from 'lucide-react'
import { EASE } from './primitives'

const GRID_SIZE = 20
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
]
const INITIAL_DIR = { x: 0, y: -1 }

// Lightweight Web Audio API synthesizer for retro chimes
function playSynthSound(type, muted) {
  if (muted || typeof window === 'undefined') return
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    if (!AudioContext) return
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)

    const now = ctx.currentTime
    if (type === 'eat') {
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(440, now)
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12)
      gain.gain.setValueAtTime(0.15, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14)
      osc.start(now)
      osc.stop(now + 0.15)
    } else if (type === 'over') {
      osc.type = 'sawtooth'
      osc.frequency.setValueAtTime(220, now)
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.28)
      gain.gain.setValueAtTime(0.2, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3)
      osc.start(now)
      osc.stop(now + 0.3)
    } else if (type === 'turn') {
      osc.type = 'sine'
      osc.frequency.setValueAtTime(320, now)
      gain.gain.setValueAtTime(0.05, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04)
      osc.start(now)
      osc.stop(now + 0.05)
    }
  } catch {
    // AudioContext blocked or not supported
  }
}

export function ArcadeGameModal({ isOpen, onClose }) {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [paused, setPaused] = useState(false)
  const [muted, setMuted] = useState(false)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)

  // Game state refs for 60fps loop
  const snakeRef = useRef(INITIAL_SNAKE)
  const dirRef = useRef(INITIAL_DIR)
  const nextDirRef = useRef(INITIAL_DIR)
  const foodRef = useRef({ x: 5, y: 5 })
  const particlesRef = useRef([])
  const lastTickRef = useRef(0)
  const animationFrameRef = useRef(null)

  // Load high score
  useEffect(() => {
    try {
      const saved = localStorage.getItem('uday_arcade_highscore')
      if (saved) setHighScore(parseInt(saved, 10))
    } catch {
      // LocalStorage unavailable
    }
  }, [])

  const spawnFood = useCallback(() => {
    let newFood
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
      const collision = snakeRef.current.some(
        (seg) => seg.x === newFood.x && seg.y === newFood.y
      )
      if (!collision) break
    }
    foodRef.current = newFood
  }, [])

  const spawnParticles = (x, y) => {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 1
      particlesRef.current.push({
        x: (x + 0.5) * 15,
        y: (y + 0.5) * 15,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: Math.random() > 0.4 ? '#e0be7a' : '#c59a55',
        size: Math.random() * 2.5 + 1.5,
      })
    }
  }

  const restartGame = useCallback(() => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ]
    dirRef.current = { x: 0, y: -1 }
    nextDirRef.current = { x: 0, y: -1 }
    particlesRef.current = []
    setScore(0)
    setSpeedMultiplier(1)
    setGameOver(false)
    setPaused(false)
    spawnFood()
  }, [spawnFood])

  // Handle keyboard inputs
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()

      if (key === 'escape') {
        onClose()
        return
      }

      if (key === ' ' || key === 'p') {
        e.preventDefault()
        if (!gameOver) setPaused((prev) => !prev)
        return
      }

      if (gameOver) {
        if (key === 'enter' || key === 'r') {
          restartGame()
        }
        return
      }

      const cur = dirRef.current
      if ((key === 'arrowup' || key === 'w') && cur.y !== 1) {
        e.preventDefault()
        nextDirRef.current = { x: 0, y: -1 }
        playSynthSound('turn', muted)
      } else if ((key === 'arrowdown' || key === 's') && cur.y !== -1) {
        e.preventDefault()
        nextDirRef.current = { x: 0, y: 1 }
        playSynthSound('turn', muted)
      } else if ((key === 'arrowleft' || key === 'a') && cur.x !== 1) {
        e.preventDefault()
        nextDirRef.current = { x: -1, y: 0 }
        playSynthSound('turn', muted)
      } else if ((key === 'arrowright' || key === 'd') && cur.x !== -1) {
        e.preventDefault()
        nextDirRef.current = { x: 1, y: 0 }
        playSynthSound('turn', muted)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, gameOver, muted, onClose, restartGame])

  // Game Loop
  useEffect(() => {
    if (!isOpen) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const cellPixel = canvas.width / GRID_SIZE
    let running = true

    const gameTickInterval = Math.max(70, 130 - score * 3)

    const render = (time) => {
      if (!running) return

      // Update particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.03
      })
      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0)

      // Game step logic
      if (!gameOver && !paused && time - lastTickRef.current > gameTickInterval) {
        lastTickRef.current = time
        dirRef.current = nextDirRef.current

        const head = { ...snakeRef.current[0] }
        head.x += dirRef.current.x
        head.y += dirRef.current.y

        // Wall collision
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
          setGameOver(true)
          playSynthSound('over', muted)
        } else {
          // Self collision
          const selfCollision = snakeRef.current.some(
            (seg) => seg.x === head.x && seg.y === head.y
          )
          if (selfCollision) {
            setGameOver(true)
            playSynthSound('over', muted)
          } else {
            const newSnake = [head, ...snakeRef.current]

            // Check food collision
            if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
              const newScore = score + 1
              setScore(newScore)
              if (newScore > highScore) {
                setHighScore(newScore)
                try {
                  localStorage.setItem('uday_arcade_highscore', newScore.toString())
                } catch {}
              }
              spawnParticles(foodRef.current.x, foodRef.current.y)
              playSynthSound('eat', muted)
              spawnFood()
            } else {
              newSnake.pop()
            }
            snakeRef.current = newSnake
          }
        }
      }

      // Drawing canvas
      ctx.fillStyle = '#080807'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Subtle gold grid
      ctx.strokeStyle = 'rgba(197, 154, 85, 0.08)'
      ctx.lineWidth = 0.5
      for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath()
        ctx.moveTo(i * cellPixel, 0)
        ctx.lineTo(i * cellPixel, canvas.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(0, i * cellPixel)
        ctx.lineTo(canvas.width, i * cellPixel)
        ctx.stroke()
      }

      // Draw Food (Pulsing Gold Energy Orb)
      const food = foodRef.current
      const pulse = (Math.sin(time * 0.008) + 1) * 0.5
      const foodRadius = (cellPixel * 0.38) + pulse * 1.5
      const foodCenterX = food.x * cellPixel + cellPixel / 2
      const foodCenterY = food.y * cellPixel + cellPixel / 2

      // Food Glow
      const glowGrad = ctx.createRadialGradient(
        foodCenterX,
        foodCenterY,
        2,
        foodCenterX,
        foodCenterY,
        cellPixel * 1.2
      )
      glowGrad.addColorStop(0, 'rgba(224, 190, 122, 0.8)')
      glowGrad.addColorStop(0.5, 'rgba(197, 154, 85, 0.25)')
      glowGrad.addColorStop(1, 'transparent')
      ctx.fillStyle = glowGrad
      ctx.beginPath()
      ctx.arc(foodCenterX, foodCenterY, cellPixel * 1.2, 0, Math.PI * 2)
      ctx.fill()

      // Food Core
      ctx.fillStyle = '#f1ece2'
      ctx.beginPath()
      ctx.arc(foodCenterX, foodCenterY, foodRadius, 0, Math.PI * 2)
      ctx.fill()

      // Draw Snake
      snakeRef.current.forEach((seg, index) => {
        const isHead = index === 0
        const factor = 1 - (index / (snakeRef.current.length + 4)) * 0.5

        if (isHead) {
          ctx.fillStyle = '#e0be7a'
          ctx.shadowColor = 'rgba(224, 190, 122, 0.8)'
          ctx.shadowBlur = 10
        } else {
          ctx.fillStyle = `rgba(197, 154, 85, ${Math.max(0.35, factor)})`
          ctx.shadowBlur = 0
        }

        const segPadding = 1.5
        const x = seg.x * cellPixel + segPadding
        const y = seg.y * cellPixel + segPadding
        const size = cellPixel - segPadding * 2

        ctx.beginPath()
        ctx.roundRect(x, y, size, size, isHead ? 5 : 3)
        ctx.fill()
        ctx.shadowBlur = 0

        // Head eyes
        if (isHead) {
          ctx.fillStyle = '#080807'
          const eyeSize = 2.5
          ctx.fillRect(x + size * 0.25, y + size * 0.25, eyeSize, eyeSize)
          ctx.fillRect(x + size * 0.65, y + size * 0.25, eyeSize, eyeSize)
        }
      })

      // Draw Particles
      particlesRef.current.forEach((p) => {
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1.0

      animationFrameRef.current = requestAnimationFrame(render)
    }

    animationFrameRef.current = requestAnimationFrame(render)
    return () => {
      running = false
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isOpen, gameOver, paused, score, highScore, muted, spawnFood])

  const sendDirection = (newDir) => {
    if (gameOver) return
    const cur = dirRef.current
    if (newDir.x !== 0 && cur.x === -newDir.x) return
    if (newDir.y !== 0 && cur.y === -newDir.y) return
    nextDirRef.current = newDir
    playSynthSound('turn', muted)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-[#080807]/90 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="relative w-full max-w-[440px] overflow-hidden rounded-3xl border border-[rgba(197,154,85,0.35)] bg-[#0e0d0b] p-5 shadow-[0_25px_80px_-20px_rgba(197,154,85,0.45)] sm:p-6"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[rgba(197,154,85,0.16)] pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-lg border border-[rgba(197,154,85,0.4)] bg-[#15130f] text-[#e0be7a]">
                  <Gamepad2 className="size-4" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-light tracking-wide text-[#f1ece2]">
                    Gold Matrix <span className="text-[#c59a55]">Arcade</span>
                  </h3>
                  <p className="text-[11px] font-mono text-[#a49d90]">Lightweight Snake Protocol</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMuted((m) => !m)}
                  className="flex size-8 items-center justify-center rounded-full border border-[rgba(197,154,85,0.25)] text-[#a49d90] transition-colors hover:text-[#e0be7a]"
                  aria-label={muted ? 'Unmute' : 'Mute'}
                >
                  {muted ? <VolumeX className="size-4 text-red-400" /> : <Volume2 className="size-4" />}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex size-8 items-center justify-center rounded-full border border-[rgba(197,154,85,0.25)] text-[#a49d90] transition-colors hover:border-[#c59a55] hover:text-[#f1ece2]"
                  aria-label="Close Arcade"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Score Bar */}
            <div className="mt-4 flex items-center justify-between rounded-xl border border-[rgba(197,154,85,0.15)] bg-[#11100e]/70 px-4 py-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-[#a49d90]">
                <span>SCORE:</span>
                <span className="font-bold text-[#e0be7a] text-sm">{score}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#c59a55]">
                <Trophy className="size-3.5" />
                <span className="text-[#a49d90]">BEST:</span>
                <span className="font-bold text-[#f1ece2] text-sm">{highScore}</span>
              </div>
            </div>

            {/* Canvas Screen */}
            <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-2xl border border-[rgba(197,154,85,0.25)] bg-[#080807]">
              <canvas
                ref={canvasRef}
                width={300}
                height={300}
                className="h-full w-full block"
              />

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080807]/85 backdrop-blur-sm p-6 text-center">
                  <span className="label-xs text-red-400 uppercase tracking-widest font-mono">
                    Simulation Ended
                  </span>
                  <p className="mt-2 font-display text-3xl font-light text-[#f1ece2]">
                    Score: <span className="text-[#e0be7a]">{score}</span>
                  </p>
                  <button
                    type="button"
                    onClick={restartGame}
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#c59a55] bg-[#c59a55] px-5 py-2.5 label-xs font-semibold text-[#080807] transition-all hover:bg-[#e0be7a]"
                  >
                    <RotateCcw className="size-3.5" />
                    Play Again
                  </button>
                </div>
              )}

              {/* Paused Overlay */}
              {paused && !gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#080807]/80 backdrop-blur-xs p-6 text-center">
                  <span className="font-display text-2xl font-light text-[#e0be7a]">
                    Paused
                  </span>
                  <button
                    type="button"
                    onClick={() => setPaused(false)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgba(197,154,85,0.4)] px-4 py-2 label-xs text-[#e0be7a] hover:bg-[#c59a55] hover:text-[#080807]"
                  >
                    <Play className="size-3" />
                    Resume
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Touch Controls & Instructions */}
            <div className="mt-4 flex flex-col items-center gap-3">
              {/* Virtual D-Pad for Mobile */}
              <div className="grid grid-cols-3 gap-1.5 w-36 sm:hidden">
                <div />
                <button
                  type="button"
                  onClick={() => sendDirection({ x: 0, y: -1 })}
                  className="flex h-9 items-center justify-center rounded-lg border border-[rgba(197,154,85,0.3)] bg-[#15130f] text-[#e0be7a] active:bg-[#c59a55] active:text-[#080807]"
                >
                  ▲
                </button>
                <div />
                <button
                  type="button"
                  onClick={() => sendDirection({ x: -1, y: 0 })}
                  className="flex h-9 items-center justify-center rounded-lg border border-[rgba(197,154,85,0.3)] bg-[#15130f] text-[#e0be7a] active:bg-[#c59a55] active:text-[#080807]"
                >
                  ◀
                </button>
                <button
                  type="button"
                  onClick={restartGame}
                  className="flex h-9 items-center justify-center rounded-lg border border-[rgba(197,154,85,0.2)] bg-[#11100e] text-[10px] font-mono text-[#a49d90]"
                >
                  RST
                </button>
                <button
                  type="button"
                  onClick={() => sendDirection({ x: 1, y: 0 })}
                  className="flex h-9 items-center justify-center rounded-lg border border-[rgba(197,154,85,0.3)] bg-[#15130f] text-[#e0be7a] active:bg-[#c59a55] active:text-[#080807]"
                >
                  ▶
                </button>
                <div />
                <button
                  type="button"
                  onClick={() => sendDirection({ x: 0, y: 1 })}
                  className="flex h-9 items-center justify-center rounded-lg border border-[rgba(197,154,85,0.3)] bg-[#15130f] text-[#e0be7a] active:bg-[#c59a55] active:text-[#080807]"
                >
                  ▼
                </button>
                <div />
              </div>

              <div className="hidden sm:flex items-center justify-between w-full text-[11px] font-mono text-[#8a8479]">
                <span>Controls: [W, A, S, D] or Arrows</span>
                <span>[Space] Pause</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
