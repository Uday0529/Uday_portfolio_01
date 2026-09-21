const SOCIALS = [
  { label: 'GitHub', href: 'https://www.github.com/Uday0529' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/uday-gupta-0923ab311/' },
  { label: 'Email', href: 'mailto:udayg0529@gmail.com' },
]

export function SiteFooter() {
  return (
    <footer className="relative border-t border-[rgba(197,154,85,0.16)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="label-xs font-display font-semibold text-[#f1ece2]">
            UDAY<span className="text-[#c59a55]">.DEV</span>
          </p>
          <p className="label-xs mt-3 text-[#6b5130]">C# &bull; .NET &bull; API &bull; WEB</p>
        </div>

        <ul className="flex flex-wrap gap-x-8 gap-y-2">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="group relative label-xs text-[#a49d90] transition-colors hover:text-[#e0be7a]"
              >
                {s.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#c59a55] transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <p className="label-xs text-[#6b5130]">&copy; 2026 Uday Gupta</p>
      </div>
    </footer>
  )
}
