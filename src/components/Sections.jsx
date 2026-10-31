import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { copy, projects, workTabs, journey, stack, reviews, facts, receipt, linkedin } from '../data'
import SwapText from './SwapText'
import Sticker from './Sticker'
import Drops from './Drops'

export function Work({ mode }) {
  const [tab, setTab] = useState(workTabs[0].id)
  const thumb = useRef(null)
  const btns = useRef({})
  const grid = useRef(null)
  const first = useRef(true)
  const shown = projects.filter((p) => p.cat === tab)

  useLayoutEffect(() => {
    const place = (instant) => {
      const b = btns.current[tab]
      if (!b) return
      const vars = { x: b.offsetLeft - 3, width: b.offsetWidth }
      if (instant) gsap.set(thumb.current, vars)
      else gsap.to(thumb.current, { ...vars, duration: 0.45, ease: 'power3.out' })
    }
    place(first.current)
    if (!first.current) {
      // cards stay mounted (so tilt bindings survive); just bring the visible ones in
      gsap.fromTo(grid.current.querySelectorAll('.proj:not([hidden]), .work-empty'),
        { y: 30, opacity: 0 }, { y: 0, opacity: 1, rotation: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out', overwrite: 'auto' })
      ScrollTrigger.refresh()
    }
    first.current = false
    const onResize = () => place(true)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [tab])

  return (
    <section className="sec" id="work">
      <div className="sec-hd">
        <h2>Things I've <em>shipped</em></h2>
        <SwapText as="p" text={copy[mode].lede} />
      </div>
      <div className="toggle work-tabs" role="tablist" aria-label="Project type">
        <span className="thumb" ref={thumb} />
        {workTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            ref={(el) => (btns.current[t.id] = el)}
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
          >{t.label}</button>
        ))}
      </div>
      <div className="work" ref={grid}>
        {projects.map((p) => (
          <article key={p.name} className={'proj reveal' + (p.wide ? ' wide' : '')} hidden={p.cat !== tab} data-tilt>
            <div className="row">
              <div className="glyph" style={{ background: p.bg, color: p.fg }}>{p.glyph}</div>
              <span className={'tag' + (p.tagClass ? ' ' + p.tagClass : '')}>{p.tag}</span>
            </div>
            <h3>{p.name}</h3>
            <p>{p.desc}</p>
            <div className="meta">{p.meta.map((m) => <span key={m}>{m}</span>)}</div>
          </article>
        ))}
        {shown.length === 0 && <p className="work-empty">Nothing here yet. More on the way.</p>}
      </div>
    </section>
  )
}

export function Journey() {
  return (
    <section className="sec journey" id="journey">
      <div className="sec-hd">
        <h2>From canvas <em>to cohort charts</em></h2>
        <p>Four stages, in order. Creativity and analytics stayed in the mix the whole way.</p>
      </div>
      <div className="track" id="track">
        {journey.map((s) => (
          <div key={s.n} className="step">
            {s.sticker?.kind === 'brush' && (
              <Sticker kind="brush">
                <svg viewBox="0 0 150 46" role="img" aria-label={s.sticker.t}>
                  <path d="M6 20C20 8 50 10 74 9s52-4 66 4c6 4 4 12-4 15-12 5-40 2-62 6S24 42 12 36C4 32 0 26 6 20z" />
                  <text x="74" y="24" textAnchor="middle" dominantBaseline="middle">{s.sticker.t}</text>
                </svg>
              </Sticker>
            )}
            {s.sticker?.kind === 'code' && <Sticker kind="code">{s.sticker.t}</Sticker>}
            <span className="n">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <div className="art" style={{ background: s.art }} />
          </div>
        ))}
      </div>
    </section>
  )
}

export function Stack() {
  // Rendered twice so the marquee can loop seamlessly at -50%.
  return (
    <section className="sec" id="stack">
      <div className="sec-hd"><h2>The <em>toolbox</em></h2><p>Tools change. Analytical thinking is the part that carries over.</p></div>
      <div className="marq">
        <div className="marq-in" id="marq">
          {[...stack, ...stack].map((s, i) => <span key={i} aria-hidden={i >= stack.length || undefined}>{s}</span>)}
        </div>
      </div>
    </section>
  )
}

export function Reviews() {
  const track = useRef(null)
  const [edge, setEdge] = useState({ start: true, end: true })

  // arrows only show when there is more to scroll in that direction
  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => setEdge({ start: el.scrollLeft < 4, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 4 })
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  if (reviews.length === 0) return null
  const initials = (n) => n.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase()
  const step = (dir) => {
    const card = track.current.querySelector('.review')
    track.current.scrollBy({ left: dir * (card.offsetWidth + 18), behavior: 'smooth' })
  }

  return (
    <section className="sec" id="reviews">
      <div className="sec-hd">
        <h2>What people <em>say</em></h2>
        <p>From founders, clients and teams I've built with.</p>
      </div>
      <div className="reviews" ref={track}>
        {reviews.map((r, i) => (
          <figure key={i} className="review reveal" data-tilt>
            <span className="qmark" aria-hidden="true">“</span>
            <blockquote>{r.quote}</blockquote>
            <figcaption>
              <span className="who">{initials(r.name)}</span>
              <span><b>{r.profile ? <a href={r.profile} target="_blank" rel="noopener">{r.name}</a> : r.name}</b><small>{r.url ? <a href={r.url} target="_blank" rel="noopener">{r.role}</a> : r.role}</small></span>
              {r.draft && <span className="tag b-hot">Draft</span>}
            </figcaption>
          </figure>
        ))}
      </div>
      {!(edge.start && edge.end) && (
        <div className="rv-arrows">
          <button type="button" aria-label="Previous reviews" disabled={edge.start} onClick={() => step(-1)}>←</button>
          <button type="button" aria-label="Next reviews" disabled={edge.end} onClick={() => step(1)}>→</button>
        </div>
      )}
    </section>
  )
}

export function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="cta reveal">
        <div>
          <span className="mono">Open to roles</span>
          <h2 style={{ marginTop: 10 }}>Let's build the <em>next one</em> together.</h2>
          <p>I'm looking for Growth or 0→1 Product Manager roles at founder-led, seed to Series B startups, especially consumer apps, marketplaces and health tech.</p>
          <div className="acts">
            <a className="btn btn-ink btn-lg" href={linkedin} target="_blank" rel="noopener"><span className="spark">✦</span>Message on LinkedIn</a>
            <a className="btn btn-soft btn-lg" href="#work">Browse products</a>
          </div>
        </div>
        <div className="receipt-wrap">
          <div className="receipt">
            <div className="rc-hd"><b>{receipt.shop}</b><span>{receipt.order}</span></div>
            <div className="facts">
              {facts.map(([k, v]) => <div key={k}><span>{k}</span><span>{v}</span></div>)}
            </div>
            <div className="rc-total"><span>{receipt.total[0]}</span><span>{receipt.total[1]}</span></div>
            <div className="rc-bar" aria-hidden="true" />
            <small>{receipt.thanks}</small>
          </div>
        </div>
      </div>
      <Drops />
    </section>
  )
}
