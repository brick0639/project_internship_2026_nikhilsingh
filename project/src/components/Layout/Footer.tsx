import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FF5A3D] text-white shadow-lg">
                <span className="text-lg font-semibold">B</span>
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-900">BiteBox</p>
                <p className="text-sm text-slate-500">Premium delivery</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-600">
              Curated restaurants, elegant delivery, and a premium experience designed around your next favorite meal.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">About</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link className="transition hover:text-[#FF5A3D]" to="/about">About Us</Link></li>
              <li><Link className="transition hover:text-[#FF5A3D]" to="/careers">Careers</Link></li>
              <li><Link className="transition hover:text-[#FF5A3D]" to="/partners">Partner With Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">Explore</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li><Link className="transition hover:text-[#FF5A3D]" to="/search">Search</Link></li>
              <li><Link className="transition hover:text-[#FF5A3D]" to="/favorites">Favorites</Link></li>
              <li><Link className="transition hover:text-[#FF5A3D]" to="/orders">Orders</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-slate-700">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#FF5A3D]" /><span>Hyderabad, India</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#FF5A3D]" /><span>+91 98765 43210</span></li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#FF5A3D]" /><span>support@bitebox.com</span></li>
            </ul>
            <div className="mt-5 flex gap-3 text-slate-600">
              <a href="#" className="rounded-full border border-slate-200 bg-white p-2.5 transition hover:border-[#FF5A3D] hover:text-[#FF5A3D]"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="rounded-full border border-slate-200 bg-white p-2.5 transition hover:border-[#FF5A3D] hover:text-[#FF5A3D]"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="rounded-full border border-slate-200 bg-white p-2.5 transition hover:border-[#FF5A3D] hover:text-[#FF5A3D]"><Instagram className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-sm text-slate-500 md:flex-row">
          <p>© 2026 BiteBox. All rights reserved.</p>
          <div className="flex gap-4">
            <Link className="transition hover:text-[#FF5A3D]" to="/privacy">Privacy</Link>
            <Link className="transition hover:text-[#FF5A3D]" to="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
