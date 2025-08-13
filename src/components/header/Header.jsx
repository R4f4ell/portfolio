import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './header.scss'
import useLockBodyScroll from '../../hooks/header/useLockBodyScroll'
import useScrollSpy from '../../hooks/header/useScrollSpy'

const LINKS = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'projects', label: 'PROJECTS', href: '#projects' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [panelPos, setPanelPos] = useState({ top: 0, right: 0 })
  const headerRef = useRef(null)
  const panelRef = useRef(null)
  const burgerRef = useRef(null)
  const rafRef = useRef(0)

  useLockBodyScroll(open)

  const activeId = useScrollSpy(LINKS.map(l => l.id), {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0.01,
  })

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // rAF para ancoragem suave (evita layouts repetidos em resize/scroll)
  useEffect(() => {
    const updateAnchors = () => {
      if (!burgerRef.current) return
      const r = burgerRef.current.getBoundingClientRect()
      const gap = 14
      const top = Math.max(0, r.top + r.height + gap)
      const right = Math.max(12, window.innerWidth - r.right + gap)
      setPanelPos({ top, right })
    }
    const schedule = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(updateAnchors)
    }

    if (open) {
      schedule()
      window.addEventListener('resize', schedule)
      window.addEventListener('scroll', schedule, { passive: true })
    }
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handleDown = (e) => {
      const t = e.target
      if (panelRef.current?.contains(t)) return
      if (burgerRef.current?.contains(t)) return
      setOpen(false)
    }
    document.addEventListener('mousedown', handleDown)
    document.addEventListener('touchstart', handleDown, { passive: true })
    return () => {
      document.removeEventListener('mousedown', handleDown)
      document.removeEventListener('touchstart', handleDown)
    }
  }, [open])

  const scrollToId = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const headerHeight = headerRef.current?.offsetHeight || 0
    const rectTop = el.getBoundingClientRect().top + window.pageYOffset
    const targetTop = Math.max(rectTop - headerHeight - 8, 0)
    window.scrollTo({ top: targetTop, behavior: 'smooth' })
  }

  const handleNavClick = (e, id) => {
    e.preventDefault()
    setOpen(false)
    const checkbox = document.getElementById('burger')
    if (checkbox && checkbox.checked) checkbox.checked = false
    scrollToId(id)
  }

  // Variants leves (sem blur/filtro para evitar travadas)
  const panelVariants = {
    hidden: { opacity: 0, x: 18, scale: 0.98 },
    show: {
      opacity: 1, x: 0, scale: 1,
      transition: { type: 'spring', stiffness: 520, damping: 36, mass: 0.6 }
    },
    exit: { opacity: 0, x: 20, scale: 0.98, transition: { duration: 0.16 } }
  }
  const listVariants = { show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } } }
  const itemVariants = { hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0, transition: { duration: 0.16 } } }

  return (
    <header ref={headerRef} className={`site-header${isScrolled ? ' is-scrolled' : ''}`} role="banner">
      <div className="header__inner" role="navigation" aria-label="Navegação principal">
        <span className="brand" aria-label="Portfólio">Portfólio</span>

        {/* Desktop */}
        <nav className="nav__links--desktop" aria-hidden="false">
          <ul>
            {LINKS.map(link => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={activeId === link.id ? 'is-active' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Burger */}
        <label
          ref={burgerRef}
          className="burger"
          htmlFor="burger"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        >
          <input
            type="checkbox"
            id="burger"
            checked={open}
            onChange={() => setOpen(v => !v)}
            aria-controls="primary-navigation"
            aria-expanded={open ? 'true' : 'false'}
          />
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* Backdrop */}
        <AnimatePresence>
          {open && (
            <motion.button
              key="nav-backdrop"
              className="nav__backdrop"
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Painel mobile/tablet */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="nav-panel"
              ref={panelRef}
              className="nav__panel"
              aria-hidden="false"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={panelVariants}
              style={{ top: `${panelPos.top}px`, right: `${panelPos.right}px` }}
            >
              <nav id="primary-navigation" className="nav__links--panel">
                <motion.ul variants={listVariants} initial="hidden" animate="show" exit="hidden">
                  {LINKS.map(link => (
                    <motion.li key={link.id} variants={itemVariants}>
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.id)}
                        className={activeId === link.id ? 'is-active' : undefined}
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </motion.ul>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}