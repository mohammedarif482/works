import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { posts, tests, readMins, fmtDate } from '../posts'
import { Contact } from './Sections'

// One component for both writing pages; they only differ in copy and entries.
const pages = {
  journal: {
    title: <>The <em>journal</em></>,
    lede: 'Notes on building products, growth and what the numbers taught me.',
    items: posts,
    empty: 'First post is on the way.',
    back: 'All posts',
  },
  experiments: {
    title: <>Growth <em>experiments</em></>,
    lede: 'Hypotheses I tested, the metric I watched, and what actually happened.',
    items: tests,
    empty: 'First experiment write-up is on the way.',
    back: 'All experiments',
  },
}

const statusClass = { Won: 'b-go', Lost: 'b-hot', Running: 'b-sun' }

export default function Journal({ page, slug }) {
  const root = useRef(null)
  const cfg = pages[page]
  const entry = slug && cfg.items.find((p) => p.slug === slug)

  useGSAP(() => {
    gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.jr-in', { y: 40, opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' })
    })
  }, { scope: root, dependencies: [page, slug], revertOnUpdate: true })

  return (
    <main className="wrap journal" ref={root}>
      {slug ? <Entry page={page} cfg={cfg} entry={entry} /> : <List page={page} cfg={cfg} />}
      <Contact />
    </main>
  )
}

function Meta({ e }) {
  return (
    <div className="jr-meta">
      <span className="tag">{e.tag}</span>
      {e.status && <span className={'tag ' + (statusClass[e.status] || '')}>{e.status}</span>}
      <span>{fmtDate(e.date)} · {readMins(e)} min read</span>
      {e.draft && <span className="tag b-hot">Draft</span>}
    </div>
  )
}

function Facts({ e }) {
  if (!e.hypothesis) return null
  return (
    <dl className="jr-facts">
      <div><dt>Hypothesis</dt><dd>{e.hypothesis}</dd></div>
      <div><dt>Metric</dt><dd>{e.metric}</dd></div>
      <div><dt>Result</dt><dd>{e.result}</dd></div>
    </dl>
  )
}

function List({ page, cfg }) {
  return (
    <section className="sec">
      <div className="sec-hd jr-in">
        <h2>{cfg.title}</h2>
        <p>{cfg.lede}</p>
      </div>
      {cfg.items.length === 0 ? (
        <p className="work-empty jr-in">{cfg.empty}</p>
      ) : (
        <div className="jr-list">
          {cfg.items.map((e) => (
            <a key={e.slug} className="jr-card jr-in" href={`#/${page}/${e.slug}`}>
              <Meta e={e} />
              <h3>{e.title}</h3>
              <p>{e.excerpt}</p>
              <Facts e={e} />
              <span className="jr-more">Read →</span>
            </a>
          ))}
        </div>
      )}
    </section>
  )
}

function Entry({ page, cfg, entry }) {
  const back = <a className="jr-back jr-in" href={'#/' + page}>← {cfg.back}</a>
  if (!entry) {
    return (
      <section className="sec">
        {back}
        <p className="work-empty jr-in">That page doesn't exist (yet).</p>
      </section>
    )
  }
  return (
    <article className="sec jr-post">
      {back}
      <header className="jr-in">
        <Meta e={entry} />
        <h1>{entry.title}</h1>
        {entry.source && <a className="jr-src" href={entry.source.url} target="_blank" rel="noopener">Inspired by {entry.source.title} ↗</a>}
      </header>
      <div className="jr-body jr-in">
        <Facts e={entry} />
        {entry.body.map((b, i) =>
          b.startsWith('## ') ? <h2 key={i}>{b.slice(3)}</h2>
          : b.startsWith('> ') ? <blockquote key={i}>{b.slice(2)}</blockquote>
          : <p key={i}>{b}</p>
        )}
      </div>
    </article>
  )
}
