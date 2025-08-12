import { useEffect, useState } from 'react'

export default function useScrollSpy(ids = [], options = {}) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const elements = ids
      .map(id => document.getElementById(id))
      .filter(Boolean)

    if (elements.length === 0) return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))

      if (visible[0]?.target?.id) {
        setActiveId(visible[0].target.id)
      } else {
        const closest = entries
          .slice()
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0]
        if (closest?.target?.id) setActiveId(closest.target.id)
      }
    }, options)

    elements.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [ids.join('|')]) 

  return activeId
}