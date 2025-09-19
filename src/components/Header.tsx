'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GiWorld } from 'react-icons/gi';
import BurgerMenu from './BurgerMenu';
import ToggleTheme from './ToggleTheme';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="header">
      <Link href="/">
        <GiWorld className="header-logo" />
      </Link>

      <nav className="nav">
        <Link href="/favourites" className={isActive('/favourites') ? 'active' : ''}>
          Favourites
        </Link>
        <Link href="/random" className={isActive('/random') ? 'active' : ''}>
          Random
        </Link>
      </nav>

      <BurgerMenu />
      <ToggleTheme />
    </header>
  );
}
