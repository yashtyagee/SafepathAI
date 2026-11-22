/**
 * Navbar — sticky top navigation for the SafePath AI landing page.
 *
 * Features:
 * - Logo with shield icon
 * - Navigation links that smooth-scroll to sections
 * - Sign In / Get Started CTA buttons
 * - Mobile hamburger menu with animated toggle
 * - Becomes opaque with shadow on scroll
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Shield, ChevronRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#workflow' },
  { label: 'Live Map', href: '#map-preview' },
  { label: 'Response', href: '#response' },
]

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track scroll position to change navbar style
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      setMobileOpen(false)
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-nav)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center group-hover:bg-primary-600 transition-colors">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-navy-900 leading-tight">
                SafePath
                <span className="text-primary-500"> AI</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-navy-600 hover:text-primary-500 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-semibold text-navy-700 hover:text-primary-500 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              to="/command-center"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-[var(--radius-button)] transition-colors duration-200 shadow-sm"
            >
              Command Center
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-navy-600 hover:text-navy-900 hover:bg-navy-50 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-white border-t border-navy-100 px-4 pb-4 pt-2 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-4 py-2.5 text-sm font-medium text-navy-600 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-navy-100 space-y-2">
            <Link
              to="/login"
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-navy-700 hover:bg-navy-50 rounded-[var(--radius-button)] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/command-center"
              className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white bg-primary-500 hover:bg-primary-600 rounded-[var(--radius-button)] transition-colors"
            >
              Command Center
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
