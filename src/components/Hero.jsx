import { useRef, useState } from 'react'
import gsap from 'gsap'
import { copy, studios, footprint, tasks, asks, stickers } from '../data'
import { Spark, Arrow, TaskIcon } from './icons'
import SwapText from './SwapText'
import Sticker, { Splat } from './Sticker'

const greeting = "Hi, I'm Arif!"
const waveHeights = Array.from({ length: 22 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.7)) * 70)

function TaskCard({ task }) {
  return (
    <article className={'task' + (task.hero ? ' tilt' : '')} id={task.hero ? 'hero-task' : undefined} data-tilt>
      <div className="row">
        <h3><TaskIcon name={task.icon} />{task.name}</h3>
        <div className="badges">
          {task.badges.map((b) => <span key={b.t} className={'tag ' + b.c}>{b.t}</span>)}
        </div>
      </div>
      {task.stamp && <Sticker kind="stamp">{task.stamp.t}<small>{task.stamp.s}</small></Sticker>}
      <div className="fields">
        {task.fields.map(([k, v]) => (
          <div key={k} className={task.select?.field === k ? 'sel' : undefined}>
            <span>{k}</span><p>{v}</p>
            {task.select?.field === k && (
              <span className="sel-box" aria-hidden="true"><i /><i /><i /><i /><b>{task.select.label}</b></span>
            )}
          </div>
        ))}
      </div>
      {task.foot && (
        <div className="foot">
          {task.foot.hand ? <Sticker kind="note">{task.foot.note}</Sticker> : <div className="mini">{task.foot.note}</div>}
          <a className={'btn btn-' + task.foot.style} href="#work">
            {task.foot.style === 'ink' && <span className="spark">✦</span>}
            {task.foot.cta}
          </a>
        </div>
      )}
    </article>
  )
}

export default function Hero({ mode, countRef }) {
  const [si, setSi] = useState(0)
  const chev = useRef(null)

  const nextStudio = () => {
    setSi((i) => (i + 1) % studios.length)
    gsap.to(chev.current, { rotation: '+=180', duration: 0.4 })
  }

  return (
    <section className="hero">
      <div className="hero-top">
        <div className="hello">
          <div className="avatar">MA</div>
          <h1 id="hi" aria-label={greeting}>
            {greeting.split('').map((c, i) => (
              <span key={i} className="ch" aria-hidden="true">{c === ' ' ? ' ' : c}</span>
            ))}
            <Splat label={stickers.avatar} href={stickers.avatarHref} />
          </h1>
        </div>
        <div className="today"><b>350K+</b> visits &amp; users across my builds</div>
        <div className="team">Studios:
          <div className="faces"><span>AD</span><span>MC</span><span>BW</span><span>+9</span></div>
        </div>
      </div>

      <div className="grid">
        <div className="col left">
          <button type="button" className="chip" aria-label="Switch studio" onClick={nextStudio}>
            <span className="ico"><Spark size={16} fill="var(--sun-ink)" /></span>
            <span>
              <SwapText as="strong" text={studios[si].n} />
              <SwapText as="small" text={studios[si].s} />
            </span>
            <svg ref={chev} className="chev" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 4l4 4 4-4" /></svg>
          </button>
          <div>
            <div className="big"><span id="count" ref={countRef}>10</span>+</div>
            <SwapText as="p" className="big-cap" text={copy[mode].cap} />
          </div>
          <div className="fp" data-tilt>
          <div className="yellow">
            <svg className="leaf" viewBox="0 0 70 70" aria-hidden="true"><path d="M60 8C30 6 12 22 14 52c22 2 46-10 46-44z" fill="#4f9a3a" /><path d="M14 52C28 38 40 26 56 12" stroke="#2f6b22" strokeWidth="2" fill="none" /></svg>
            <div className="hd"><span>Builder footprint</span><span className="tag">Live</span></div>
            <div className="stats">
              {footprint.map((f) => <div key={f.label}><b>{f.v}</b><small>{f.label}</small></div>)}
            </div>
          </div>
          <Sticker kind="tags">
            <a className="ltag" href={stickers.bagHref}><span><small>{stickers.bag[0]}</small>{stickers.bag[1]}</span></a>
          </Sticker>
          </div>
        </div>

        <div className="col mid">
          <div className="tasks">
            <TaskCard task={tasks[0]} />
            {tasks.slice(1).map((t) => <TaskCard key={t.name} task={t} />)}
          </div>
        </div>

        <div className="col right">
          <div className="panel">
            <div className="hd"><span><span className="dot">✦</span>Quick asks</span><span className="mono">Tap one</span></div>
            <ul className="asks">
              {asks.map((a) => <li key={a.text}><a href={a.href}><span>{a.text}</span><Arrow /></a></li>)}
            </ul>
          </div>
          <div className="voice">
            <span className="tag b-sun" style={{ background: 'var(--pill)', color: 'var(--pill-ink)' }}>Say hello</span>
            <div className="say">
              <h3>Say something<br />to Arif!</h3>
              <div className="wave" aria-hidden="true">
                {waveHeights.map((h, i) => <i key={i} style={{ height: h + '%' }} />)}
              </div>
            </div>
            <a className="mic" href="#contact" aria-label="Go to contact">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 11a7 7 0 0014 0M12 18v4" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
