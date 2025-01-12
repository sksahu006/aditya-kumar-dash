"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brush, Code2, Contact2, Home, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HomePage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animation
      gsap.from(".hero-content", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      // Skills icons animation
      gsap.from(".skill-icon", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#skills",
          start: "top center",
        },
      });

      // Projects animation
      gsap.from(".project-card", {
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#projects",
          start: "top center",
        },
      });
    }, mainRef);

    // Add smooth scrolling behavior
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link?.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId as string);
        
        if (section) {
          gsap.to(window, {
            duration: 1,
            scrollTo: section,
            ease: "power3.inOut",
            offsetY: 80
          });
        }
      }
    };

    // Add click event listeners to all navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavClick);
    });

    return () => {
      ctx.revert();
      // Clean up event listeners
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavClick);
      });
    };
  }, []);

  return (
    <main ref={mainRef} className="bg-[#020817] min-h-screen text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-[#020817]/80 backdrop-blur-sm z-50 py-4">
        <div className="container mx-auto flex justify-center gap-8">
          {[
            { href: "#home", icon: Home, label: "Home" },
            { href: "#about", icon: User, label: "About" },
            { href: "#skills", icon: Code2, label: "Skills" },
            { href: "#projects", icon: Brush, label: "Projects" },
            { href: "#contact", icon: Contact2, label: "Contact" },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={href}
              href={href}
              className="flex items-center gap-2 hover:text-blue-400 transition-colors cursor-pointer"
            >
              <Icon size={20} />
              <span>{label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Rest of the component remains unchanged */}
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 hero-content text-center">
          <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <h1 className="text-5xl font-bold mb-4">Hey, I am Aditya</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A passionate graphic designer focused on crafting minimalist, impactful, and meaningful visual designs.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Design Life</h2>
            <p className="text-gray-400">
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Study Life</h2>
            <p className="text-gray-400">
              Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="min-h-screen flex items-center py-20 bg-[#0a1122]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">SKILLS</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center">
            {["Ps", "Ai", "Lr", "Ds", "Pr"].map((skill, index) => (
              <div
                key={skill}
                className="skill-icon w-24 h-24 rounded-xl bg-[#1a2333] flex items-center justify-center text-2xl font-bold"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-2">Explore the journey</h2>
          <p className="text-xl text-blue-400 mb-12">of my designs</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              "E HUMANS HUMANC",
              "HALF LIFE",
              "WHO?",
              "INCEPTION",
              "AVATAR",
              "MATRIX",
            ].map((project, index) => (
              <Link
                href={`/projects/${index}`}
                key={project}
                className="project-card group"
              >
                <div className="relative h-[400px] bg-[#1a2333] rounded-xl overflow-hidden">
                  <Image
                    src={`https://source.unsplash.com/random/800x1200?movie,poster&sig=${index}`}
                    alt={project}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <h3 className="text-xl font-bold">{project}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/projects"
              className="inline-block px-8 py-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
            >
              View More Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center py-20 bg-[#0a1122]">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-4xl font-bold text-center mb-12">Get in Touch</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-[#1a2333] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-[#1a2333] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full px-4 py-2 bg-[#1a2333] rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}