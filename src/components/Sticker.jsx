// Little objects stuck onto the dashboard: stamps, sticky notes, cursors, die-cuts.
// Tilt goes in --r (applied with the CSS `rotate` property) so GSAP's transform tweens stack on top of it.
export default function Sticker({ kind, className, style, href, children }) {
  const Tag = href ? 'a' : 'span'
  return <Tag className={'stk stk-' + kind + (className ? ' ' + className : '')} style={style} href={href}>{children}</Tag>
}

export function Cursor({ label }) {
  return (
    <Sticker kind="cursor">
      <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 2l14 6.5-6 1.8-2.6 5.7z" /></svg>
      <span>{label}</span>
    </Sticker>
  )
}

export function Splat({ label, href }) {
  return (
    <Sticker kind="splat" href={href}>
      <svg viewBox="0 0 96 44" role="img" aria-label={label}>
        <path d="M10 8C24 0 46 6 58 3c14-3 32 1 34 13 2 10-6 18-18 17-4 5-10 7-12 1-14 3-32 4-44 1C8 34 2 26 4 18 1 14 4 10 10 8z" />
        <circle cx="68" cy="41" r="2.2" />
        <text x="48" y="24" textAnchor="middle" dominantBaseline="middle">{label}</text>
      </svg>
    </Sticker>
  )
}
