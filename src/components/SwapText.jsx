import { useRef, useState, useEffect } from 'react'
import gsap from 'gsap'

// Slides old text up and out, new text in from below, whenever `text` changes.
export default function SwapText({ as: Tag = 'span', text, ...rest }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(text)

  useEffect(() => {
    if (text === shown) return
    const el = ref.current
    const tween = gsap.to(el, {
      y: -8, opacity: 0, duration: 0.2,
      onComplete: () => {
        setShown(text)
        gsap.fromTo(el, { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
      },
    })
    return () => tween.kill()
  }, [text]) // eslint-disable-line react-hooks/exhaustive-deps

  return <Tag ref={ref} {...rest}>{shown}</Tag>
}
