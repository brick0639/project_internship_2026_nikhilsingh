import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/favorites', label: 'Favorites' },
  { to: '/orders', label: 'Orders' },
];

export default function Header() {
  const location = useLocation();
  const { getCartItemCount } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = getCartItemCount();
  const isHome = location.pathname === '/';

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isHome ? 'bg-white/70' : 'bg-white/80'} backdrop-blur-2xl`}>
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF5A3D] text-white shadow-[0_12px_40px_-14px_rgba(255,90,61,0.9)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-tight text-slate-900">BiteBox</span>
            <span className="text-[11px] font-medium uppercase tracking-[0.32em] text-slate-500">Luxury delivery</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm font-semibold transition ${isActive ? 'text-[#FF5A3D]' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/cart" className="relative rounded-full border border-slate-200 bg-white/80 p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <ShoppingBag className="h-5 w-5 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF5A3D] text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <Link to="/profile" className="rounded-full border border-slate-200 bg-white/80 p-2.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <User className="h-5 w-5 text-slate-700" />
          </Link>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="rounded-full border border-slate-200 bg-white/80 p-2.5 shadow-sm md:hidden">
            {mobileMenuOpen ? <X className="h-5 w-5 text-slate-700" /> : <Menu className="h-5 w-5 text-slate-700" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white/90 px-4 py-4 shadow-sm md:hidden">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setMobileMenuOpen(false)} className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
