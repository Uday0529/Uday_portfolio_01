'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Lock,
  Sparkles,
  CheckCircle2,
  RotateCcw,
  SlidersHorizontal,
  Info,
} from 'lucide-react'
import { EASE } from './primitives'

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export function ProjectVideo({ project }) {
  const videoData = project.video
  if (!videoData) return null

  const totalDuration = videoData.durationSeconds || 120
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.85)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasVideoFile, setHasVideoFile] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)

  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const controlsTimeoutRef = useRef(null)
  const simulatedTimerRef = useRef(null)

  // Determine active chapter
  useEffect(() => {
    if (!videoData.chapters) return
    const index = videoData.chapters.findLastIndex(
      (ch) => currentTime >= ch.seconds
    )
    setActiveChapterIndex(index >= 0 ? index : 0)
  }, [currentTime, videoData.chapters])

  // Simulated playback timer when no real mp4 video file is found
  useEffect(() => {
    if (isPlaying && !hasVideoFile) {
      simulatedTimerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (simulatedTimerRef.current) clearInterval(simulatedTimerRef.current)
    }
    return () => {
      if (simulatedTimerRef.current) clearInterval(simulatedTimerRef.current)
    }
  }, [isPlaying, hasVideoFile, totalDuration])

  // Hide controls after 3 seconds of inactivity during play
  const resetControlsTimeout = useCallback(() => {
    setShowControls(true)
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }, [isPlaying])

  useEffect(() => {
    resetControlsTimeout()
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current)
    }
  }, [isPlaying, resetControlsTimeout])

  // Play / Pause toggle
  const togglePlay = () => {
    if (videoRef.current && hasVideoFile) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            setHasVideoFile(false)
            setIsPlaying(true)
          })
      }
    } else {
      setIsPlaying((prev) => !prev)
    }
    resetControlsTimeout()
  }

  // Seek video
  const handleSeek = (seconds) => {
    const clamped = Math.max(0, Math.min(seconds, totalDuration))
    setCurrentTime(clamped)
    if (videoRef.current && hasVideoFile) {
      videoRef.current.currentTime = clamped
    }
    resetControlsTimeout()
  }

  // Scrub bar click
  const handleScrub = (e) => {
    const bar = e.currentTarget.getBoundingClientRect()
    const clickPos = (e.clientX - bar.left) / bar.width
    const newTime = clickPos * totalDuration
    handleSeek(newTime)
  }

  // Mute toggle
  const toggleMute = () => {
    const nextMuted = !isMuted
    setIsMuted(nextMuted)
    if (videoRef.current) {
      videoRef.current.muted = nextMuted
    }
  }

  // Volume slider
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    setIsMuted(val === 0)
    if (videoRef.current) {
      videoRef.current.volume = val
      videoRef.current.muted = val === 0
    }
  }

  // Fullscreen toggle
  const toggleFullscreen = async () => {
    if (!containerRef.current) return
    if (!document.fullscreenElement) {
      try {
        await containerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } catch (err) {
        console.error('Fullscreen request error:', err)
      }
    } else {
      try {
        await document.exitFullscreen()
        setIsFullscreen(false)
      } catch (err) {
        console.error('Exit fullscreen error:', err)
      }
    }
  }

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFsChange)
    return () => document.removeEventListener('fullscreenchange', handleFsChange)
  }, [])

  // Video HTML5 event handlers
  const handleVideoLoaded = () => {
    setHasVideoFile(true)
    if (videoRef.current) {
      videoRef.current.volume = volume
      videoRef.current.muted = isMuted
    }
  }

  const handleVideoTimeUpdate = () => {
    if (videoRef.current && hasVideoFile) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleVideoEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const handleVideoError = () => {
    setHasVideoFile(false)
  }

  const progressPercent = Math.min(100, Math.max(0, (currentTime / totalDuration) * 100))

  return (
    <div className="flex flex-col gap-8">
      {/* Description header */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(197,154,85,0.3)] bg-[#11100e] px-3 py-1 label-xs text-[#e0be7a]">
            <Sparkles className="size-3 text-[#c59a55]" />
            {videoData.resolution || '1080p 60fps'}
          </span>
          <span className="label-xs text-[#a49d90]">
            Duration: {videoData.duration}
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-[#a49d90]">
          {videoData.description}
        </p>
      </div>

      {/* Main Workstation Thumbnail Frame */}
      <div
        ref={containerRef}
        onMouseMove={resetControlsTimeout}
        className={`group/player relative overflow-hidden rounded-3xl border border-[rgba(197,154,85,0.28)] bg-[#0c0b0a] shadow-[0_24px_60px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-[rgba(197,154,85,0.55)] ${
          isFullscreen ? 'h-screen w-screen rounded-none border-none' : ''
        }`}
      >
        {/* Browser Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[rgba(197,154,85,0.18)] bg-[#13120f]/95 px-4 py-3 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-[#e05244]/85 transition-transform hover:scale-125" />
            <span className="size-3 rounded-full bg-[#e5a83b]/85 transition-transform hover:scale-125" />
            <span className="size-3 rounded-full bg-[#41a85f]/85 transition-transform hover:scale-125" />
          </div>

          {/* Browser address pill */}
          <div className="flex max-w-[280px] items-center gap-2 truncate rounded-full border border-[rgba(197,154,85,0.18)] bg-[#080807]/70 px-3.5 py-1 text-xs text-[#a49d90] sm:max-w-md">
            <Lock className="size-3 text-[#c59a55]" />
            <span className="truncate font-mono text-[11px] tracking-wide text-[#e0be7a]">
              https://{videoData.urlDisplay || 'app.demo/walkthrough'}
            </span>
          </div>

          {/* Top right badges */}
          <div className="flex items-center gap-2">
            {isPlaying && (
              <span className="flex items-center gap-1.5 label-xs text-emerald-400">
                <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="hidden sm:inline">Playing</span>
              </span>
            )}
            <span className="label-xs hidden rounded-full border border-[rgba(197,154,85,0.2)] bg-[#191713] px-2.5 py-1 text-[#a49d90] sm:inline-block">
              HD
            </span>
          </div>
        </div>

        {/* Video Canvas / Thumbnail Viewport */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#080807] sm:aspect-[16/9]">
          {/* HTML5 video element */}
          <video
            ref={videoRef}
            src={videoData.url}
            onLoadedMetadata={handleVideoLoaded}
            onTimeUpdate={handleVideoTimeUpdate}
            onEnded={handleVideoEnded}
            onError={handleVideoError}
            playsInline
            className={`absolute inset-0 size-full object-cover transition-opacity duration-300 ${
              isPlaying && hasVideoFile ? 'opacity-100' : 'pointer-events-none opacity-0'
            }`}
          />

          {/* High-res Thumbnail Image Poster */}
          {(!isPlaying || !hasVideoFile) && (
            <div className="relative size-full">
              <Image
                src={videoData.thumbnail || project.image || '/placeholder.svg'}
                alt={`${project.title} video thumbnail`}
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className={`object-cover transition-transform duration-700 ${
                  isPlaying ? 'scale-105 filter brightness-90' : 'group-hover/player:scale-102'
                }`}
                priority
              />

              {/* Cinematic dark gold gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080807]/90 via-[#080807]/35 to-[#080807]/20" />

              {/* Simulated active playback scanner beam when in preview mode */}
              {isPlaying && !hasVideoFile && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 w-32 -translate-x-full bg-gradient-to-r from-transparent via-[rgba(197,154,85,0.18)] to-transparent"
                    style={{
                      animation: 'orbit-spin 6s linear infinite',
                      width: '100%',
                      opacity: 0.3,
                    }}
                  />
                  {/* Subtle live preview banner */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between rounded-xl border border-[rgba(197,154,85,0.35)] bg-[#080807]/85 p-3 text-xs text-[#e0be7a] backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="size-2 animate-ping rounded-full bg-[#c59a55]" />
                      <span className="font-medium">Interactive Demo Walkthrough</span>
                      <span className="text-[#a49d90]">&bull; {videoData.chapters?.[activeChapterIndex]?.title}</span>
                    </div>
                    <span className="label-xs text-[#c59a55]">{formatTime(currentTime)} / {formatTime(totalDuration)}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Large Center Play / Pause trigger when not playing */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="group/btn absolute inset-0 flex cursor-pointer flex-col items-center justify-center p-6 text-center"
            >
              <div className="relative flex size-20 items-center justify-center rounded-full border border-[rgba(197,154,85,0.5)] bg-[#080807]/80 shadow-[0_0_35px_rgba(197,154,85,0.3)] backdrop-blur-md transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:border-[#c59a55] group-hover/btn:shadow-[0_0_50px_rgba(197,154,85,0.6)] sm:size-24">
                {/* Pulsing radar ring */}
                <span className="absolute -inset-2.5 animate-ping rounded-full border border-[rgba(197,154,85,0.25)] opacity-50" />
                <Play className="ml-1 size-8 fill-[#e0be7a] text-[#e0be7a] transition-transform duration-300 group-hover/btn:scale-110 sm:size-10" />
              </div>

              <span className="mt-5 rounded-full border border-[rgba(197,154,85,0.25)] bg-[#11100e]/90 px-5 py-2 font-display text-sm font-light tracking-wide text-[#f1ece2] backdrop-blur-sm transition-all duration-300 group-hover/btn:border-[#c59a55] group-hover/btn:text-[#e0be7a]">
                Watch Walkthrough Demo
              </span>

              {/* Quick chapter hint */}
              <div className="mt-3 flex items-center gap-2 text-xs text-[#a49d90]">
                <span>Full HD 1080p</span>
                <span>&bull;</span>
                <span>{videoData.duration}</span>
                <span>&bull;</span>
                <span>{videoData.chapters?.length || 4} Key Modules</span>
              </div>
            </div>
          )}

          {/* Custom Player Controls Bar (appears on hover or when playing) */}
          <AnimatePresence>
            {(isPlaying || showControls) && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#080807] via-[#080807]/80 to-transparent p-4 sm:p-5"
              >
                {/* Scrubber progress bar */}
                <div
                  onClick={handleScrub}
                  className="group/scrub relative mb-3.5 h-2 w-full cursor-pointer rounded-full bg-[rgba(197,154,85,0.2)]"
                >
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#c59a55] to-[#e0be7a] transition-all duration-100"
                    style={{ width: `${progressPercent}%` }}
                  />

                  {/* Scrubber handle */}
                  <div
                    className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#080807] bg-[#e0be7a] opacity-0 shadow-[0_0_8px_rgba(224,190,122,0.8)] transition-opacity group-hover/scrub:opacity-100"
                    style={{ left: `${progressPercent}%` }}
                  />

                  {/* Chapter tick marks on timeline */}
                  {videoData.chapters?.map((ch) => {
                    const pct = (ch.seconds / totalDuration) * 100
                    return (
                      <div
                        key={ch.title}
                        className="group/mark absolute top-0 bottom-0 w-0.5 bg-[rgba(255,255,255,0.4)]"
                        style={{ left: `${pct}%` }}
                      >
                        <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#080807]/90 px-2 py-0.5 text-[10px] font-mono text-[#e0be7a] opacity-0 transition-opacity group-hover/mark:opacity-100">
                          {ch.time} &bull; {ch.title}
                        </span>
                      </div>
                    )
                  })}
                </div>

                {/* Controls row */}
                <div className="flex items-center justify-between gap-4 text-[#f1ece2]">
                  <div className="flex items-center gap-3">
                    {/* Play/Pause */}
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="flex size-9 items-center justify-center rounded-full border border-[rgba(197,154,85,0.3)] bg-[#15130f]/80 text-[#e0be7a] transition-colors hover:border-[#c59a55] hover:bg-[#c59a55] hover:text-[#080807]"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="size-4 fill-current" />
                      ) : (
                        <Play className="ml-0.5 size-4 fill-current" />
                      )}
                    </button>

                    {/* Replay / Reset */}
                    <button
                      type="button"
                      onClick={() => handleSeek(0)}
                      className="flex size-9 items-center justify-center rounded-full border border-[rgba(197,154,85,0.2)] bg-[#15130f]/60 text-[#a49d90] transition-colors hover:text-[#e0be7a]"
                      aria-label="Restart video"
                    >
                      <RotateCcw className="size-3.5" />
                    </button>

                    {/* Time display */}
                    <div className="font-mono text-xs tracking-wider text-[#a49d90]">
                      <span className="text-[#e0be7a]">{formatTime(currentTime)}</span>
                      <span className="mx-1.5 opacity-40">/</span>
                      <span>{formatTime(totalDuration)}</span>
                    </div>
                  </div>

                  {/* Right side controls */}
                  <div className="flex items-center gap-3">
                    {/* Volume */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleMute}
                        className="flex size-8 items-center justify-center text-[#a49d90] transition-colors hover:text-[#e0be7a]"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="size-4" />
                        ) : (
                          <Volume2 className="size-4" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="hidden h-1 w-16 cursor-pointer appearance-none rounded bg-[rgba(197,154,85,0.25)] accent-[#c59a55] sm:block"
                        aria-label="Volume slider"
                      />
                    </div>

                    {/* Fullscreen */}
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="flex size-9 items-center justify-center rounded-full border border-[rgba(197,154,85,0.3)] bg-[#15130f]/80 text-[#a49d90] transition-colors hover:border-[#c59a55] hover:text-[#e0be7a]"
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="size-4" />
                      ) : (
                        <Maximize2 className="size-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chapters selection pills */}
      {videoData.chapters && videoData.chapters.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="label-xs text-[#c59a55]">Jump to Demo Section</p>
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {videoData.chapters.map((ch, idx) => {
              const isActive = activeChapterIndex === idx
              return (
                <button
                  key={ch.title}
                  type="button"
                  onClick={() => {
                    handleSeek(ch.seconds)
                    if (!isPlaying) togglePlay()
                  }}
                  className={`group flex items-center justify-between rounded-xl border p-3 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-[#c59a55] bg-[#1a1711] shadow-[0_0_15px_rgba(197,154,85,0.25)]'
                      : 'border-[rgba(197,154,85,0.16)] bg-[#11100e]/70 hover:border-[rgba(197,154,85,0.4)] hover:bg-[#15130f]'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isActive ? 'text-[#e0be7a]' : 'text-[#c59a55]'
                      }`}
                    >
                      {ch.time}
                    </span>
                    <span
                      className={`truncate text-xs ${
                        isActive ? 'text-[#f1ece2]' : 'text-[#a49d90] group-hover:text-[#f1ece2]'
                      }`}
                    >
                      {ch.title}
                    </span>
                  </div>
                  <Play
                    className={`size-3 shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'fill-[#e0be7a] text-[#e0be7a]' : 'text-[#6b5130]'
                    }`}
                  />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Feature Highlights Grid */}
      {videoData.highlights && videoData.highlights.length > 0 && (
        <div className="rounded-2xl border border-[rgba(197,154,85,0.18)] bg-[#11100e]/60 p-6">
          <p className="label-xs text-[#c59a55]">Demonstration Highlights</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {videoData.highlights.map((hl) => (
              <div key={hl} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#c59a55]" />
                <span className="text-sm leading-relaxed text-[#a49d90]">{hl}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Drop Video Note */}
      <div className="flex items-center gap-3 rounded-xl border border-[rgba(197,154,85,0.12)] bg-[#0c0b0a]/60 px-4 py-3 text-xs text-[#a49d90]">
        <Info className="size-4 shrink-0 text-[#c59a55]" />
        <p>
          To replace this walkthrough with a recorded screen capture, place an MP4 file in{' '}
          <code className="font-mono text-[#e0be7a]">
            public/videos/{project.slug === 'product-catalog-management' ? 'product-catalog.mp4' : 'expense-tracker.mp4'}
          </code>
          .
        </p>
      </div>
    </div>
  )
}
