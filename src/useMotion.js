import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

// All page-level motion: intro, ambient loops, scroll effects, tilt and cursor.
// useGSAP reverts every tween/trigger on unmount, and matchMedia reverts per query.
export default function useMotion(scope, { countRef, setActive, page }) {
  useGSAP(() => {
    // the journal and experiments pages run their own, lighter motion
    if (page !== 'home') return
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // intro
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.nav', { y: -40, opacity: 0, duration: 0.7 })
        .from('#h3,#h2,#h1', { yPercent: 60, duration: 1.2, stagger: 0.12, ease: 'power2.out' }, 0)
        .from('.avatar', { scale: 0, rotation: -90, duration: 0.7, ease: 'back.out(2)' }, 0.2)
        .from('#hi .ch', { yPercent: 110, rotation: 12, opacity: 0, duration: 0.7, stagger: 0.035 }, 0.3)
        .from('.hero-top .today,.hero-top .team', { opacity: 0, y: 10, duration: 0.5 }, 0.6)
        .from('.left > *', { x: -40, opacity: 0, duration: 0.7, stagger: 0.1 }, 0.55)
        .from('.tasks .task', { y: 80, opacity: 0, rotation: (i) => (i === 1 ? 14 : -6), duration: 0.9, stagger: 0.12, ease: 'back.out(1.3)' }, 0.6)
        .from('.right > *', { x: 40, opacity: 0, duration: 0.7, stagger: 0.12 }, 0.7)
        .from('.stk', { scale: 1.4, opacity: 0, duration: 0.45, stagger: 0.14, ease: 'back.out(3)' }, 1.3)
        .from('.sel-box', { scale: 1.06, opacity: 0, duration: 0.4, ease: 'power2.out' }, 1.5)
        .from('.yellow .leaf', { rotation: -60, scale: 0, transformOrigin: '100% 0%', duration: 0.8, ease: 'back.out(2)' }, 1.1)

      const counter = { v: 0 }
      tl.to(counter, {
        v: 10, duration: 1.6, ease: 'power2.out',
        onUpdate: () => { if (countRef.current) countRef.current.textContent = Math.round(counter.v) },
      }, 0.6)

      // ambient
      gsap.to('.c1', { x: 120, duration: 28, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.c2', { x: -140, duration: 24, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.c3', { x: -100, y: -20, duration: 32, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.c4', { x: 80, duration: 20, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      // the luggage tag swings like a pendulum from its string
      gsap.set('.ltag', { transformOrigin: '50% 0' })
      gsap.fromTo('.ltag', { rotation: -6 }, { rotation: 6, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.6 })
      gsap.to('#hero-task', { y: -6, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 2 })
      gsap.to('.wave i', {
        scaleY: () => gsap.utils.random(0.25, 1.4), duration: () => gsap.utils.random(0.25, 0.6),
        repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: { each: 0.04, from: 'center' }, transformOrigin: '50% 50%',
      })

      // hills sink as the page scrolls, then rise back at the contact section
      const sink = { trigger: document.body, start: 'top top', end: '+=900', scrub: true }
      gsap.to('#h3', { yPercent: 30, ease: 'none', scrollTrigger: sink })
      gsap.to('#h2', { yPercent: 45, ease: 'none', scrollTrigger: sink })
      gsap.to('#h1', { yPercent: 60, ease: 'none', scrollTrigger: sink })
      ScrollTrigger.create({
        trigger: '#contact', start: 'top 90%', end: 'bottom bottom', scrub: true,
        onUpdate: (s) => gsap.set('#h1,#h2,#h3', { yPercent: (i) => [60, 45, 30][i] * (1 - s.progress) }),
      })

      // section heads
      gsap.utils.toArray('.sec-hd h2').forEach((h) => {
        gsap.from(h, { yPercent: 40, opacity: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 88%' } })
      })

      // project cards
      ScrollTrigger.batch('.work .proj', {
        start: 'top 90%', once: true,
        // explicit end state: a plain .from() would lock in a half-faded card if it fires mid-animation (e.g. after a tab switch)
        onEnter: (els) => gsap.fromTo(els,
          { y: 70, opacity: 0.15, rotation: () => gsap.utils.random(-4, 4) },
          { y: 0, opacity: 1, rotation: 0, duration: 0.9, stagger: 0.08, ease: 'back.out(1.4)', overwrite: 'auto' }),
      })
      gsap.from('.receipt-wrap', { y: -50, rotation: -6, opacity: 0, duration: 0.9, ease: 'back.out(1.6)', scrollTrigger: { trigger: '.cta', start: 'top 70%' } })
      // the footer stickers get dropped onto the grass
      gsap.from('.drop', { y: -140, opacity: 0, rotation: () => gsap.utils.random(-40, 40), duration: 0.8, stagger: 0.07, ease: 'back.out(1.5)',
        scrollTrigger: { trigger: '.drops', start: 'top 92%' } })
      gsap.from('.cta', { y: 60, scale: 0.96, opacity: 0.2, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.cta', start: 'top 88%' } })

      // marquee gets a gentle, capped nudge from scroll velocity, then settles back to base speed
      const loop = gsap.to('#marq', { xPercent: -50, duration: 30, ease: 'none', repeat: -1 })
      let nudge
      ScrollTrigger.create({
        trigger: '#stack', start: 'top bottom', end: 'bottom top',
        onUpdate: (s) => {
          const boost = Math.min(1 + Math.abs(s.getVelocity()) / 1500, 1.8)
          nudge?.kill()
          nudge = gsap.timeline()
            .to(loop, { timeScale: s.direction * boost, duration: 0.4, ease: 'power2.out' })
            .to(loop, { timeScale: s.direction, duration: 1.2, ease: 'power2.inOut' })
        },
      })

      // nav active link
      ;['top', 'work', 'journey'].forEach((id) => {
        ScrollTrigger.create({ trigger: '#' + id, start: 'top 40%', end: 'bottom 40%', onToggle: (s) => s.isActive && setActive(id) })
      })
    })

    // desktop: pinned horizontal journey
    mm.add('(min-width: 721px) and (prefers-reduced-motion: no-preference)', () => {
      const track = document.getElementById('track')
      const dist = () => Math.max(0, track.scrollWidth - track.parentElement.clientWidth)
      gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: { trigger: '#journey', start: 'top 12%', end: () => '+=' + dist(), pin: true, scrub: 1, invalidateOnRefresh: true },
      })
      gsap.utils.toArray('.step .art').forEach((a) =>
        gsap.from(a, { scaleX: 0, transformOrigin: 'left', ease: 'none', scrollTrigger: { trigger: a, start: 'top 95%', end: 'top 60%', scrub: true } }))
    })

    // fine pointer: card tilt, magnetic buttons, paper-plane cursor
    mm.add('(pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      const off = []
      const on = (el, ev, fn) => { el.addEventListener(ev, fn); off.push(() => el.removeEventListener(ev, fn)) }

      document.querySelectorAll('[data-tilt]').forEach((el) => {
        on(el, 'mousemove', (e) => {
          const r = el.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5
          gsap.to(el, { rotationY: px * 10, rotationX: -py * 10, transformPerspective: 800, duration: 0.4, ease: 'power2.out' })
        })
        on(el, 'mouseleave', () => gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.6, ease: 'elastic.out(1,.5)' }))
      })

      // hero task cards, the footprint card and reviews sit straight, then swing into a tilt on hover
      document.querySelectorAll('.tasks .task, .fp, .review').forEach((el) => {
        on(el, 'mouseenter', () => {
          gsap.set(el, { zIndex: 2 })
          gsap.to(el, { rotation: 3, x: 12, duration: 0.5, ease: 'back.out(2)', overwrite: 'auto' })
        })
        on(el, 'mouseleave', () => gsap.to(el, { rotation: 0, x: 0, duration: 0.6, ease: 'elastic.out(1,.5)', overwrite: 'auto', onComplete: () => gsap.set(el, { zIndex: 'auto' }) }))
      })

      // brushing past the luggage tag knocks it into a big swing that settles back into the sway
      document.querySelectorAll('.ltag').forEach((t) => {
        on(t, 'mouseenter', (e) => {
          const r = t.getBoundingClientRect()
          const dir = e.clientX < r.left + r.width / 2 ? -1 : 1
          // overwrite: true stops the idle sway (or an earlier knock) before the new swing starts
          gsap.timeline()
            .fromTo(t, { rotation: dir * 28 }, { rotation: 0, duration: 2.2, ease: 'elastic.out(1.1,0.12)', overwrite: true })
            .fromTo(t, { rotation: 0 }, { rotation: 6, duration: 0.7, ease: 'sine.out' })
            .to(t, { rotation: -6, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
        })
      })

      document.querySelectorAll('.btn,.bell,.mic').forEach((b) => {
        on(b, 'mousemove', (e) => {
          const r = b.getBoundingClientRect()
          gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.3 })
        })
        on(b, 'mouseleave', () => gsap.to(b, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,.4)' }))
      })

      const p = document.getElementById('cplane')
      const xTo = gsap.quickTo(p, 'x', { duration: 0.6, ease: 'power3' })
      const yTo = gsap.quickTo(p, 'y', { duration: 0.6, ease: 'power3' })
      let lx = 0, ly = 0
      on(window, 'mousemove', (e) => {
        gsap.set(p, { opacity: 0.85 })
        xTo(e.clientX + 14); yTo(e.clientY + 14)
        if (Math.abs(e.clientX - lx) + Math.abs(e.clientY - ly) > 4) {
          gsap.to(p, { rotation: Math.atan2(e.clientY - ly, e.clientX - lx) * 180 / Math.PI + 45, duration: 0.4 })
        }
        lx = e.clientX; ly = e.clientY
      })

      return () => off.forEach((f) => f())
    })
  }, { scope, dependencies: [page], revertOnUpdate: true })
}
