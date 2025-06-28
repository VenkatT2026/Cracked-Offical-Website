import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="w-full bg-white/90 backdrop-blur border-b border-accent-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-primary-700 text-xl tracking-tight">
          <span className="sr-only">SAT Prep Platform</span>
          <span className="inline-block">SATPrep</span>
        </Link>
        {/* Nav Links */}
        <div className="hidden md:flex gap-8 items-center text-primary-700 font-medium">
          <Link href="/library" className="hover:text-primary-500 transition-colors">Library</Link>
          <Link href="/blog" className="hover:text-primary-500 transition-colors">Blog</Link>
          <Link href="/login" className="hover:text-primary-500 transition-colors">Login</Link>
          <Link href="/register" className="hover:text-primary-500 transition-colors">Register</Link>
        </div>
        {/* CTA Button */}
        <Link href="/student/dashboard" className="ml-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-full px-5 py-2 shadow transition-colors hidden sm:inline-block">
          Start Studying
        </Link>
        {/* Mobile menu (hamburger) */}
        <div className="md:hidden">
          {/* Placeholder for mobile menu button */}
          <button className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary-400" aria-label="Open menu">
            <svg className="w-6 h-6 text-primary-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
} 