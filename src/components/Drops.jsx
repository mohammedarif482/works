import { useRef } from 'react'
import gsap from 'gsap'
import { drops } from '../data'

// a soft wavy edge, like a die-cut badge
const wavy = Array.from({ length: 121 }, (_, i) => {
  const a = (i / 120) * Math.PI * 2, r = 54 + 3 * Math.cos(a * 18)
  return (i ? 'L' : 'M') + (60 + r * Math.cos(a)).toFixed(2) + ' ' + (60 + r * Math.sin(a)).toFixed(2)
}).join('') + 'Z'

const icons = {
  palette: (
    <g>
      <path d="M60 43c-10 0-18 7-18 17s8 17 16 17c3 0 4-2 3-4-1-3 1-5 4-5h4c5 0 9-3 9-9 0-9-8-16-18-16z" fill="#fff" stroke="var(--ink)" strokeWidth="1.6" />
      <circle cx="52" cy="54" r="2.6" fill="var(--hot)" /><circle cx="59" cy="50" r="2.6" fill="var(--sun)" />
      <circle cx="67" cy="52" r="2.6" fill="var(--go)" /><circle cx="71" cy="59" r="2.6" fill="#0d99ff" />
    </g>
  ),
  chart: (
    <g stroke="var(--ink)" strokeWidth="1.6">
      <rect x="46" y="60" width="7" height="13" rx="1.5" fill="#fff" /><rect x="56.5" y="53" width="7" height="20" rx="1.5" fill="var(--sun)" />
      <rect x="67" y="47" width="7" height="26" rx="1.5" fill="var(--go)" />
      <path d="M45 55l10-8 9 4 11-10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
}

function Badge({ d, i }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <path d={wavy} fill={d.bg} stroke="#fff" strokeWidth="5" paintOrder="stroke" strokeLinejoin="round" />
      <path id={'ring-' + i} d="M60 60m-40 0a40 40 0 1 1 80 0a40 40 0 1 1-80 0" fill="none" />
      <g className="ring"><text><textPath href={'#ring-' + i} textLength="248" lengthAdjust="spacing">{d.ring}</textPath></text></g>
      <circle cx="60" cy="60" r="31" fill="none" stroke="var(--ink)" strokeWidth=".8" strokeDasharray="2 3" />
      {icons[d.icon]}
    </svg>
  )
}

export default function Drops() {
  const pile = useRef(null)
  const z = useRef(10)
  const press = useRef(null)

  // move a sticker by (dx, dy), keeping it on the pile
  const nudge = (el, dx, dy, vars) => {
    const b = pile.current.getBoundingClientRect(), r = el.getBoundingClientRect()
    dx = gsap.utils.clamp(b.left - 30 - r.left, b.right + 30 - r.right, dx)
    dy = gsap.utils.clamp(b.top - 10 - r.top, b.bottom + 20 - r.bottom, dy)
    gsap.to(el, { x: '+=' + dx, y: '+=' + dy, overwrite: 'auto', ...vars })
  }

  const down = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return
    const el = e.currentTarget
    press.current = { el, x: e.clientX, y: e.clientY, moved: false }
    el.setPointerCapture(e.pointerId)
  }

  const move = (e) => {
    if (e.pointerType !== 'mouse') return
    const el = e.currentTarget, p = press.current
    if (p && p.el === el) {
      const dx = e.clientX - p.x, dy = e.clientY - p.y
      if (!p.moved && Math.hypot(dx, dy) < 5) return
      if (!p.moved) {
        p.moved = true
        el.style.zIndex = ++z.current
        el.classList.add('lift')
        gsap.to(el, { scale: 1.08, duration: 0.2 })
      }
      p.x = e.clientX; p.y = e.clientY
      gsap.set(el, { x: '+=' + dx, y: '+=' + dy })
      gsap.to(el, { rotation: gsap.utils.clamp(-14, 14, dx * 1.5), duration: 0.3 })
      return
    }
    // not holding it: a fast pass of the cursor knocks the sticker along
    const speed = Math.hypot(e.movementX, e.movementY)
    if (speed < 10 || el.dataset.hit) return
    el.dataset.hit = '1'
    setTimeout(() => delete el.dataset.hit, 260)
    el.style.zIndex = ++z.current
    const k = Math.min(speed, 40) * 3
    nudge(el, (e.movementX / speed) * k, (e.movementY / speed) * k, {
      rotation: gsap.utils.clamp(-25, 25, gsap.getProperty(el, 'rotation') + e.movementX * 0.8),
      duration: 0.9, ease: 'power3.out',
    })
  }

  const up = (e) => {
    const p = press.current
    if (!p || p.el !== e.currentTarget) return
    press.current = null
    if (!p.moved) return
    p.el.dataset.dragged = '1'
    p.el.classList.remove('lift')
    gsap.to(p.el, { scale: 1, rotation: 0, duration: 0.7, ease: 'elastic.out(1,.45)' })
  }

  // a drag that ends on a link must not also open it
  const click = (e) => {
    if (e.currentTarget.dataset.dragged) { e.preventDefault(); delete e.currentTarget.dataset.dragged }
  }

  const handlers = { onPointerDown: down, onPointerMove: move, onPointerUp: up, onPointerCancel: up, onClick: click, onDragStart: (e) => e.preventDefault() }

  return (
    <div className="drops" ref={pile}>
      {drops.map((d, i) => {
        const style = { '--x': d.x + 'px', '--y': d.y + 'px', '--r': d.r + 'deg', '--bg': d.bg, '--fg': d.fg }
        if (d.kind === 'badge') return <span key={i} className="drop drop-badge" style={style} {...handlers}><Badge d={d} i={i} /></span>
        if (d.kind === 'img' || d.kind === 'logo') return (
          <span key={i} className={'drop drop-' + d.kind + (d.round ? ' round' : '')} style={{ ...style, '--h': d.h + 'px' }} {...handlers}>
            <img src={d.src} alt={d.alt} draggable="false" />
          </span>
        )
        const ext = d.href.startsWith('http')
        return (
          <a key={i} className="drop drop-pill" style={style} href={d.href} {...(ext ? { target: '_blank', rel: 'noopener' } : {})} {...handlers}>
            {d.t}{ext && <span aria-hidden="true">↗</span>}
          </a>
        )
      })}
    </div>
  )
}
