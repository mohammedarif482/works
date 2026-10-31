import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Nav from './components/Nav'
import Hero from './components/Hero'
import { Work, Journey, Stack, Reviews, Contact } from './components/Sections'
import Journal from './components/Journal'
import { Sky, Hills, CursorPlane } from './components/Scenery'
import useMotion from './useMotion'

// Hash routes: #/journal, #/journal/<slug>, #/experiments, #/experiments/<slug>. Anything else is the home page.
const parseRoute = () => {
  const m = window.location.hash.match(/^#\/(journal|experiments)(?:\/([\w-]+))?/)
  return m ? { page: m[1], slug: m[2] } : { page: 'home' }
}

export default function App() {
  const [mode, setMode] = useState('builder')
  const [active, setActive] = useState('top')
  const root = useRef(null)
  const countRef = useRef(null)
  const firstMode = useRef(true)
  const [route, setRoute] = useState(parseRoute)

  useEffect(() => {
    const onHash = () => setRoute(parseRoute())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  // on a page switch, start at the top, or at the section a home link pointed to
  const firstRoute = useRef(true)
  useEffect(() => {
    if (firstRoute.current) { firstRoute.current = false; return }
    const target = route.page === 'home' && document.getElementById(window.location.hash.slice(1))
    requestAnimationFrame(() => (target ? target.scrollIntoView() : window.scrollTo(0, 0)))
  }, [route.page, route.slug])

  useMotion(root, { countRef, setActive, page: route.page })

  // little pop on the big number whenever the persona changes
  useEffect(() => {
    if (firstMode.current) { firstMode.current = false; return }
    if (!countRef.current) return
    gsap.fromTo(countRef.current, { scale: 0.9 }, { scale: 1, duration: 0.6, ease: 'elastic.out(1,.5)' })
  }, [mode])

  return (
    <div ref={root} className={'pg-' + route.page}>
      <Sky />
      <Nav mode={mode} onMode={setMode} active={route.page === 'home' ? active : route.page} />
      {route.page === 'home' ? (
        <main className="wrap" id="top">
          <Hero mode={mode} countRef={countRef} />
          <Work mode={mode} />
          <Journey />
          <Stack />
          <Reviews />
          <Contact />
        </main>
      ) : (
        <Journal page={route.page} slug={route.slug} />
      )}
      <Hills />
      <CursorPlane />
    </div>
  )
}
