import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './header.scss'
import useLockBodyScroll from '../../hooks/header/useLockBodyScroll'
import useScrollSpy from '../../hooks/header/useScrollSpy'

const ACTIVE_MODE = 'both' // 'click' | 'scroll' | 'both'
const CLICK_LOCK_MS = 1500

const LINKS = [
  { id: 'home', label: 'HOME', href: '#home' },
  { id: 'about', label: 'ABOUT', href: '#about' },
  { id: 'projects', label: 'PROJECTS', href: '#projects' },
  { id: 'quotes', label: 'QUOTES', href: '#quotes' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [panelPos, setPanelPos] = useState({ top: 0, right: 0 })

  const headerRef = useRef(null)
  const panelRef = useRef(null)
  const burgerRef = useRef(null)
  const rafRef = useRef(0)

  // refs do nav desktop
  const navListRef = useRef(null)
  const pillRef = useRef(null)
  const linkRefs = useRef(Object.fromEntries(LINKS.map(l => [l.id, React.createRef()])))
  const [activeId, setActiveId] = useState(LINKS[0].id)
  const lastClickAt = useRef(0)

  // ScrollSpy existente
  const spyId = useScrollSpy(LINKS.map(l => l.id), {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0.01,
  })

  useLockBodyScroll(open)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // posiciona painel mobile
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

  // fecha painel ao clicar fora
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

  // ativa por scroll/click/both
  useEffect(() => {
    if (ACTIVE_MODE === 'scroll') {
      if (spyId) setActiveId(spyId)
      return
    }
    if (ACTIVE_MODE === 'both') {
      const now = performance.now()
      const locked = (now - lastClickAt.current) < CLICK_LOCK_MS
      if (!locked && spyId) setActiveId(spyId)
      return
    }
    // 'click' ignora scroll
  }, [spyId])

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

    lastClickAt.current = performance.now()
    setActiveId(id)
    // animação de clique opcional (se ainda tiver no CSS)
    const a = linkRefs.current[id]?.current
    if (a) {
      const rect = a.getBoundingClientRect()
      const x = (e.nativeEvent.offsetX ?? (rect.width / 2))
      const start = Math.max(0, Math.min(1, x / rect.width))
      a.style.setProperty('--click-start', String(start))
      a.classList.add('is-clicking')
      window.setTimeout(() => a.classList.remove('is-clicking'), 500)
    }
    scrollToId(id)
    // garante atualização imediata do pill
    requestAnimationFrame(updatePill)
  }

  const handleBrandClick = () => {
    try {
      const url = window.location.pathname + window.location.search
      window.history.replaceState(null, '', url)
    } catch {}
    window.location.reload()
  }

  // ======== posiciona o PILL =========
  const updatePill = () => {
    const ul = navListRef.current
    const pill = pillRef.current
    const link = linkRefs.current[activeId]?.current
    if (!ul || !pill || !link) return

    // usa offsetLeft/offsetWidth — mais estável que getBoundingClientRect com transforms
    const left = link.offsetLeft - ul.scrollLeft - 6
    const width = link.offsetWidth + 12

    pill.style.transform = `translateX(${Math.max(0, left)}px)`
    pill.style.width = `${Math.max(0, width)}px`
  }

  useLayoutEffect(() => {
    updatePill()
  }, [activeId])

  useEffect(() => {
    // quando as fontes carregam (evita “salto” e travar no primeiro item)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => updatePill())
    }
    const onResize = () => updatePill()
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize, { passive: true })
    const ro = new ResizeObserver(() => updatePill())
    if (navListRef.current) ro.observe(navListRef.current)
    // observa também o link ativo (quando muda largura por quebra)
    if (linkRefs.current[activeId]?.current) ro.observe(linkRefs.current[activeId].current)

    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('scroll', onResize)
      ro.disconnect()
    }
  }, [activeId])

  // animações painel mobile (sem mudanças)
  const panelVariants = {
    hidden: { opacity: 0, x: 18, scale: 0.98 },
    show: { opacity: 1, x: 0, scale: 1, transition: { type: 'spring', stiffness: 520, damping: 36, mass: 0.6 } },
    exit: { opacity: 0, x: 20, scale: 0.98, transition: { duration: 0.16 } }
  }
  const listVariants = { show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } } }
  const itemVariants = { hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0, transition: { duration: 0.16 } } }

  return (
    <header ref={headerRef} className={`site-header${isScrolled ? ' is-scrolled' : ''}`} role="banner">
      <div className="header__inner" role="navigation" aria-label="Navegação principal">
        {/* BRAND com mesmo fundo dos links; clique = F5/topo */}
        <button
          type="button"
          className="brand-plate"
          aria-label="Voltar ao topo (recarregar)"
          onClick={handleBrandClick}
        >
          <span className="brand-text">Portfólio</span>
        </button>

        {/* DESKTOP NAV */}
        <nav className="nav__links--desktop" aria-hidden="false">
          <ul ref={navListRef} className="nav-pills">
            {/* PILL móvel */}
            <span ref={pillRef} className="nav__active-pill" aria-hidden="true" />
            {LINKS.map(link => (
              <li key={link.id}>
                <a
                  ref={linkRefs.current[link.id]}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={activeId === link.id ? 'is-active' : undefined}
                  aria-label={link.label}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* BURGER */}
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
          <span></span><span></span><span></span>
        </label>

        {/* BACKDROP */}
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

        {/* PAINEL MOBILE/TABLET (só navega, sem hover/fundo) */}
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
                        onClick={(e) => { e.preventDefault(); setOpen(false); scrollToId(link.id) }}
                        aria-label={link.label}
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