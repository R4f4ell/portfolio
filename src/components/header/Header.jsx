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
  const [panelPos, setPanelPos] = useState({ top: 0, right: 0 }) // <- posição dinâmica
  const headerRef = useRef(null)
  const panelRef = useRef(null)
  const burgerRef = useRef(null)

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

  // Calcula a posição do painel para ficar logo ABAIXO do X
  useEffect(() => {
    const updateAnchors = () => {
      if (!burgerRef.current) return
      const r = burgerRef.current.getBoundingClientRect()
      const gap = 14 // gap entre X e painel
      const top = Math.max(0, r.top + r.height + gap)
      const right = Math.max(12, window.innerWidth - r.right + gap)
      setPanelPos({ top, right })
    }
    if (open) {
      updateAnchors()
      window.addEventListener('resize', updateAnchors)
      window.addEventListener('scroll', updateAnchors, { passive: true })
    }
    return () => {
      window.removeEventListener('resize', updateAnchors)
      window.removeEventListener('scroll', updateAnchors)
    }
  }, [open])

  // Fecha ao clicar fora (fora do painel e do burger)
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

  // Framer: animações
  const panelVariants = {
    hidden: { opacity: 0, x: 18, scale: 0.98, filter: 'blur(2px)' },
    show:   { opacity: 1, x: 0,  scale: 1,    filter: 'blur(0px)',
              transition: { type: 'spring', stiffness: 480, damping: 34, mass: 0.6 } },
    exit:   { opacity: 0, x: 20, scale: 0.98, filter: 'blur(2px)',
              transition: { duration: 0.18, ease: [0.22,0.61,0.36,1] } }
  }
  const listVariants = { show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }
  const itemVariants = { hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0, transition: { duration: 0.18 } } }

  return (
    <header ref={headerRef} className={`site-header${isScrolled ? ' is-scrolled' : ''}`} role="banner">
      <div className="header__inner" role="navigation" aria-label="Navegação principal">
        <p className="brand" aria-label="Portfólio">Portfólio</p>

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

        {/* Burger (mesma posição; só troca ícone) */}
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

        {/* Backdrop para fechar ao clicar fora */}
        <AnimatePresence>
          {open && (
            <motion.button
              key="nav-backdrop"
              className="nav__backdrop"
              aria-label="Fechar menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Painel — ancorado abaixo do X, sai da direita */}
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
              style={{ top: `${panelPos.top}px`, right: `${panelPos.right}px` }} // <- abaixo do X
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