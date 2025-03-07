"use client";

import { useState, useRef, useEffect } from 'react';

interface NavLink {
  href: string;
  label: string;
}

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact','experience'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (navRef.current) {
      const rect = navRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    const sectionId = href?.substring(1);
    
    if (sectionId) {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks: NavLink[] = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div
        ref={navRef}
        className="relative bg-black/20 backdrop-blur-md px-4 md:px-8 py-3 rounded-full overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-4 md:gap-8 relative z-10">
          {navLinks.map(({ href, label }) => {
            const isActive = activeSection === href.substring(1);
            return (
              <a
                key={href}
                href={href}
                onClick={handleNavClick}
                className={`
                  relative text-base md:text-lg transition-all duration-300
                  ${isActive
                    ? 'text-white bg-gradient-to-r from-black/80 via-black/10 to-white/40 border border-white/50 px-3 md:px-6 py-2 rounded-full'
                    : 'text-white/70 hover:text-white'
                  }
                `}
              >
                {label}
              </a>
            );
          })}
        </div>
        {isHovered && (
          <div
            className="absolute pointer-events-none transition-opacity duration-300"
            style={{
              left: `${mousePosition.x}px`,
              top: `${mousePosition.y}px`,
              transform: 'translate(-50%, -50%)',
              width: '120px',
              height: '120px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;