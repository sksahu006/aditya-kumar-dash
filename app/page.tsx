"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function HomePage() {
  const mainRef = useRef<HTMLDivElement>(null);

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

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="bg-[#020817] min-h-screen text-white">
      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center pt-20"
      >
        <div className="container mx-auto px-4 hero-content text-center">
          <ProfileCard />
          
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Design Life</h2>
            <p className="text-gray-400">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Study Life</h2>
            <p className="text-gray-400">
              Lorem ipsum is simply dummy text of the printing and typesetting
              industry. Lorem ipsum has been the industry's standard dummy text
              ever since the 1500s.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center py-20 bg-[#0a1122]"
      >
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
                    src={`https://picsum.photos/seed/${index}/1240/874`}
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
      <section
        id="contact"
        className="min-h-screen flex items-center py-20 bg-[#0a1122]"
      >
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
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
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
