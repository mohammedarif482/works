import { Plane } from './icons'

export function Sky() {
  return (
    <div className="sky" aria-hidden="true">
      <div className="cloud c1" /><div className="cloud c2" /><div className="cloud c3" /><div className="cloud c4" />
    </div>
  )
}

export function Hills() {
  return (
    <>
      <div className="hills" aria-hidden="true">
        <svg id="h3" viewBox="0 0 1200 300" preserveAspectRatio="none"><path fill="var(--hill-1)" d="M0 170 C200 90 380 140 560 120 C760 96 900 60 1200 130 V300 H0Z" /></svg>
        <svg id="h2" viewBox="0 0 1200 300" preserveAspectRatio="none"><path fill="var(--hill-2)" d="M0 220 C160 170 340 200 520 190 C700 180 860 150 1200 200 V300 H0Z" /></svg>
        <svg id="h1" viewBox="0 0 1200 300" preserveAspectRatio="none"><path fill="var(--hill-3)" d="M0 260 C220 230 420 250 640 244 C860 238 1020 225 1200 250 V300 H0Z" /></svg>
      </div>
      <p className="foot-note">Made of curiosity · Kerala</p>
    </>
  )
}

export function CursorPlane() {
  return <Plane className="cursor-plane" id="cplane" strokeWidth="2" />
}
