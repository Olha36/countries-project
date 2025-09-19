'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 730) setIsOpen(false);
    };

    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    window.addEventListener('resize', handleResize);
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    checkTheme();

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={`burger-wrapper ${isDark ? 'dark' : 'light'}`}>
      <label className="toggle">
        <input type="checkbox" checked={isOpen} onChange={toggleMenu} />
        <div>
          <div>
            <span></span>
            <span></span>
          </div>
          <svg>
            <use xlinkHref="#path" />
          </svg>
          <svg>
            <use xlinkHref="#path" />
          </svg>
        </div>
      </label>

      {isOpen && (
        <nav className="burger-menu">
          <Link href="/random" onClick={closeMenu}>
            Random
          </Link>
          <Link href="/favourites" onClick={closeMenu}>
            Favourite
          </Link>
        </nav>
      )}

      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol viewBox="0 0 44 44" id="path">
          <path d="M22,22 L2,22 C2,11 11,2 22,2 C33,2 42,11 42,22"></path>
        </symbol>
      </svg>
    </div>
  );
}
