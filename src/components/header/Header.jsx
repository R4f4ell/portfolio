import React, { useEffect, useRef, useState } from 'react'
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
  const headerRef = useRef(null)

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

  return (
    <header
      ref={headerRef}
      className={`site-header${isScrolled ? ' is-scrolled' : ''}`}
      role="banner"
    >
      <div className="header__inner" role="navigation" aria-label="Navegação principal">
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

        <label className="burger" htmlFor="burger" aria-label={open ? 'Fechar menu' : 'Abrir menu'}>
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

        <div className={`nav__panel${open ? ' is-open' : ''}`} aria-hidden={open ? 'false' : 'true'}>
          <nav id="primary-navigation" className="nav__links--panel">
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
        </div>
      </div>
    </header>
  )
}