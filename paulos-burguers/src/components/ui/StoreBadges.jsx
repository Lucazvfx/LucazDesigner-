import { forwardRef } from 'react'
import { links } from '../../config/site'

function PlayIcon(props) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" {...props}>
      <path fill="#00d0ff" d="M47 20a24 24 0 0 0-11 20v432a24 24 0 0 0 11 20l232-236Z" />
      <path fill="#ffd400" d="m279 256 74-75 105 60c17 10 17 30 0 40l-105 60Z" />
      <path fill="#00f076" d="M47 20c6-4 15-4 23 1l283 160-74 75Z" />
      <path fill="#ff3a44" d="m279 256 74 75-283 160c-8 5-17 5-23 1Z" />
    </svg>
  )
}

function AppleIcon(props) {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  )
}

const badgeClass =
  'group inline-flex items-center gap-3 rounded-xl border border-white/25 bg-black px-4 py-2.5 ' +
  'transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/50 ' +
  'focus-visible:-translate-y-0.5 sm:px-5 sm:py-3'

/**
 * Botões oficiais de loja. `forwardRef` porque o GSAP anima o container
 * no fim da timeline do hero.
 */
export const StoreBadges = forwardRef(function StoreBadges({ className = '' }, ref) {
  return (
    <div ref={ref} className={`flex flex-wrap items-center justify-center gap-3 ${className}`}>
      <a
        href={links.playStore}
        target="_blank"
        rel="noreferrer noopener"
        className={badgeClass}
        aria-label="Baixar o app na Google Play"
      >
        <PlayIcon className="h-7 w-7 shrink-0" />
        <span className="text-left leading-none">
          <span className="block text-[9px] uppercase tracking-[0.18em] text-white/70">
            Disponível no
          </span>
          <span className="mt-1 block font-heading text-lg tracking-wide text-white">
            Google Play
          </span>
        </span>
      </a>

      <a
        href={links.appStore}
        target="_blank"
        rel="noreferrer noopener"
        className={badgeClass}
        aria-label="Baixar o app na App Store"
      >
        <AppleIcon className="h-7 w-7 shrink-0 text-white" />
        <span className="text-left leading-none">
          <span className="block text-[9px] uppercase tracking-[0.18em] text-white/70">
            Baixar na
          </span>
          <span className="mt-1 block font-heading text-lg tracking-wide text-white">
            App Store
          </span>
        </span>
      </a>
    </div>
  )
})
