import React, { useCallback, useEffect, useRef, useState } from "react"
import "./circularGallery.scss"

export default function CircularGallery({ items = [] }) {
  const [index, setIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [translate, setTranslate] = useState(0)

  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const startXRef = useRef(0)
  const baseTranslateRef = useRef(0)

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v))

  const calcOffsetToCenter = useCallback(
    (idx) => {
      const viewport = viewportRef.current
      const track = trackRef.current
      if (!viewport || !track) return 0
      const slide = track.children[idx]
      if (!slide) return 0
      const slideLeft = slide.offsetLeft
      const slideWidth = slide.offsetWidth
      const vpWidth = viewport.clientWidth
      return -(slideLeft - (vpWidth - slideWidth) / 2)
    },
    []
  )

  const snapTo = useCallback(
    (idx) => {
      const safe = clamp(idx, 0, items.length - 1)
      setIndex(safe)
      const offset = calcOffsetToCenter(safe)
      setTranslate(offset)
    },
    [calcOffsetToCenter, items.length]
  )

  // LOOP: volta ao início/fim
  const next = useCallback(() => {
    const i = (index + 1) % items.length
    snapTo(i)
  }, [index, items.length, snapTo])

  const prev = useCallback(() => {
    const i = (index - 1 + items.length) % items.length
    snapTo(i)
  }, [index, items.length, snapTo])

  useEffect(() => {
    snapTo(0)
    const ro = new ResizeObserver(() => snapTo(index))
    if (viewportRef.current) ro.observe(viewportRef.current)
    if (trackRef.current) ro.observe(trackRef.current)
    const onWinResize = () => snapTo(index)
    window.addEventListener("resize", onWinResize)
    return () => {
      ro.disconnect()
      window.removeEventListener("resize", onWinResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  const onKeyDown = (e) => {
    if (e.key === "ArrowRight") next()
    if (e.key === "ArrowLeft") prev()
  }

  // Pointer/Touch drag
  const onPointerDown = (e) => {
    e.preventDefault()
    const x = e.touches ? e.touches[0].clientX : e.clientX
    startXRef.current = x
    baseTranslateRef.current = translate
    setIsDragging(true)
  }

  const onPointerMove = (e) => {
    if (!isDragging) return
    const x = e.touches ? e.touches[0].clientX : e.clientX
    const dx = x - startXRef.current
    setTranslate(baseTranslateRef.current + dx)
  }

  const onPointerUp = (e) => {
    if (!isDragging) return
    const x = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const dx = x - startXRef.current
    const threshold = 60
    setIsDragging(false)
    if (dx > threshold) prev()
    else if (dx < -threshold) next()
    else snapTo(index)
  }

  const liveLabel =
    items[index] && items[index].text
      ? `Slide ${index + 1} de ${items.length}: ${items[index].text}`
      : `Slide ${index + 1} de ${items.length}`

  return (
    <div
      className="circular-gallery"
      role="region"
      aria-label="Carrossel de certificados"
    >
      <div className="circular-gallery__dots" aria-label="Navegação por slides">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`circular-gallery__dot ${i === index ? "is-active" : ""}`}
            aria-label={`Ir para o slide ${i + 1}`}
            aria-current={i === index ? "true" : "false"}
            onClick={() => snapTo(i)}
          />
        ))}
      </div>

      <div className="circular-gallery__slider" onKeyDown={onKeyDown} tabIndex={0}>
        <button
          type="button"
          className="circular-gallery__arrow circular-gallery__arrow--prev"
          aria-label="Slide anterior"
          onClick={prev}
        >
          <span aria-hidden="true">‹</span>
        </button>

        <div
          className="circular-gallery__viewport"
          ref={viewportRef}
          onMouseDown={onPointerDown}
          onMouseMove={onPointerMove}
          onMouseUp={onPointerUp}
          onMouseLeave={onPointerUp}
          onTouchStart={onPointerDown}
          onTouchMove={onPointerMove}
          onTouchEnd={onPointerUp}
          role="group"
          aria-roledescription="carrossel"
        >
          <div
            className={`circular-gallery__track ${isDragging ? "is-dragging" : ""}`}
            ref={trackRef}
            style={{ transform: `translate3d(${translate}px, 0, 0)` }}
          >
            {items.map((item, i) => (
              <div
                key={i}
                className={`circular-gallery__item ${i === index ? "is-active" : ""}`}
              >
                <div className="circular-gallery__image">{item.image}</div>
                <p className="circular-gallery__label">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="circular-gallery__arrow circular-gallery__arrow--next"
          aria-label="Próximo slide"
          onClick={next}
        >
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <span className="sr-only" aria-live="polite">
        {liveLabel}
      </span>
    </div>
  )
}