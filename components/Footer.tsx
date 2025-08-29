'use client'
import Link from 'next/link'
import { Container } from './ui'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#001221] text-white/70">
      <Container className="py-8 grid gap-6 md:grid-cols-3 items-center">
        
        {/* Left: navigation */}
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/topics" className="hover:text-white">Topics</Link>
          <Link href="/blog" className="hover:text-white">Blog</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="hover:text-white">Contact</Link>
        </nav>

        {/* Center: attribution */}
        <div className="text-center text-xs md:text-sm">
          Built with ❤️ by{" "}
          <Link 
            href="https://www.linkedin.com/in/unk-iman-dev" 
            target="_blank" 
            className="text-accent hover:underline"
          >
            Iman Asgari
          </Link>
        </div>

        {/* Right: socials & repo */}
        <div className="flex justify-end gap-4">
          {/* GitHub */}
          <Link
            href="https://github.com/Lumicrate/gompose"
            target="_blank"
            aria-label="GitHub Repository"
            className="hover:text-white"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5"
            >
              <path fillRule="evenodd" d="M12 .5a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61a3.18 3.18 0 00-1.34-1.76c-1.1-.75.08-.74.08-.74a2.5 2.5 0 011.82 1.22 2.53 2.53 0 003.46.99 2.52 2.52 0 01.75-1.58c-2.66-.3-5.46-1.34-5.46-5.95A4.65 4.65 0 015.36 7a4.3 4.3 0 01.12-3.18s1-.32 3.3 1.23a11.4 11.4 0 016 0c2.3-1.55 3.3-1.23 3.3-1.23a4.3 4.3 0 01.12 3.18 4.65 4.65 0 011.23 3.23c0 4.62-2.8 5.64-5.47 5.94a2.82 2.82 0 01.8 2.19v3.25c0 .32.21.68.82.57A12 12 0 0012 .5z" clipRule="evenodd"/>
            </svg>
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/unk-iman-dev"
            target="_blank"
            aria-label="LinkedIn Profile"
            className="hover:text-white"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5"
            >
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 
                2.76 2.24 5 5 5h14c2.76 0 
                5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 
                19h-3v-10h3v10zm-1.5-11.27c-.96 
                0-1.73-.79-1.73-1.73s.78-1.73 
                1.73-1.73 1.73.79 
                1.73 1.73-.78 1.73-1.73 1.73zm13.5 
                11.27h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 
                0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.37h.04c.4-.75 
                1.37-1.54 2.82-1.54 3.01 0 3.57 1.98 3.57 
                4.55v5.62z"/>
            </svg>
          </Link>
        </div>
      </Container>

      {/* bottom copyright bar */}
      <div className="border-t border-white/10 text-center py-3 text-xs text-white/40">
        © {new Date().getFullYear()} Gompose. All rights reserved.
      </div>
    </footer>
  )
}
