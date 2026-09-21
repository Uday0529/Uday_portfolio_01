const SYMBOLS = [
  { text: 'C#', top: '8%', left: '6%', size: 'text-6xl', delay: '0s' },
  { text: '.NET', top: '22%', left: '86%', size: 'text-5xl', delay: '1.2s' },
  { text: 'MVC', top: '38%', left: '12%', size: 'text-4xl', delay: '2.4s' },
  { text: 'API', top: '54%', left: '78%', size: 'text-6xl', delay: '0.6s' },
  { text: 'JWT', top: '68%', left: '8%', size: 'text-5xl', delay: '3s' },
  { text: 'SQL', top: '80%', left: '88%', size: 'text-4xl', delay: '1.8s' },
  { text: 'JS', top: '14%', left: '46%', size: 'text-4xl', delay: '2.1s' },
  { text: 'NODE', top: '90%', left: '38%', size: 'text-5xl', delay: '0.9s' },
  { text: '{ }', top: '46%', left: '50%', size: 'text-7xl', delay: '1.5s' },
  { text: '< />', top: '30%', left: '30%', size: 'text-5xl', delay: '2.7s' },
  { text: 'RBAC', top: '62%', left: '58%', size: 'text-4xl', delay: '3.3s' },
  { text: 'REST', top: '4%', left: '68%', size: 'text-4xl', delay: '0.3s' },
]

const PARTICLES = [
  { top: '12%', left: '18%', d: '11s', delay: '0s' },
  { top: '26%', left: '72%', d: '14s', delay: '1.4s' },
  { top: '41%', left: '34%', d: '17s', delay: '2.8s' },
  { top: '58%', left: '82%', d: '12s', delay: '0.7s' },
  { top: '66%', left: '22%', d: '19s', delay: '3.5s' },
  { top: '77%', left: '61%', d: '15s', delay: '2.1s' },
  { top: '88%', left: '14%', d: '13s', delay: '4.2s' },
  { top: '33%', left: '92%', d: '16s', delay: '1.1s' },
  { top: '8%', left: '52%', d: '18s', delay: '3.1s' },
  { top: '50%', left: '6%', d: '14s', delay: '2.4s' },
  { top: '71%', left: '44%', d: '20s', delay: '0.4s' },
  { top: '94%', left: '78%', d: '12s', delay: '1.9s' },
]

export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* base wash */}
      <div className="absolute inset-0 bg-[#080807]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -10%, rgba(197,154,85,0.09), transparent 60%), radial-gradient(90% 60% at 100% 100%, rgba(107,81,48,0.12), transparent 65%)',
        }}
      />

      {/* orbital lines */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <g fill="none" stroke="rgba(197,154,85,0.13)" strokeWidth="0.75">
          <ellipse cx="620" cy="380" rx="560" ry="330" />
          <ellipse cx="620" cy="380" rx="420" ry="480" />
          <circle cx="180" cy="740" r="300" />
          <circle cx="1080" cy="140" r="360" />
          <path d="M-40 620 C 300 500, 700 720, 1240 540" />
          <path d="M-40 260 C 340 400, 820 120, 1240 300" />
        </g>
      </svg>

      {/* faint technical symbols */}
      <div className="absolute inset-0 font-display font-semibold tracking-tight">
        {SYMBOLS.map((s) => (
          <span
            key={s.text + s.top}
            className={`absolute ${s.size} text-[#c59a55]`}
            style={{
              top: s.top,
              left: s.left,
              opacity: 0.035,
              animation: `symbol-pulse 14s ease-in-out ${s.delay} infinite`,
            }}
          >
            {s.text}
          </span>
        ))}
      </div>

      {/* particles */}
      {PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute size-[3px] rounded-full bg-[#e0be7a]"
          style={{
            top: p.top,
            left: p.left,
            boxShadow: '0 0 8px rgba(197,154,85,0.7)',
            animation: `float-particle ${p.d} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}

      {/* vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(100% 100% at 50% 50%, transparent 40%, rgba(8,8,7,0.85) 100%)',
        }}
      />
    </div>
  )
}
