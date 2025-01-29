"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import ProfileCard from "@/components/ProfileCard";
import About from "@/components/About";
import { LampContainer } from "@/components/ui/lamp";
import { motion } from "framer-motion";
import { FloatingDock } from "@/components/ui/floating-dock";
import { HeroParallaxDemo } from "@/components/Project";

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
      <section
        id="about"
        className="min-h-screen flex items-center md:py-20 px-6 md:px-10 lg:px-24"
      >
        <About />
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="min-h-screen flex items-center w-full overflow-hidden"
      >
        <LampContainer className="w-full">
          {" "}
          {/* Added w-full to ensure full width */}
          <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="w-full mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            <div className="container mx-auto px-4 w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12  bg-gradient-to-r from-[#cedeee] to-[#779fca] text-transparent bg-clip-text">
                SKILLS
              </h2>
              <div className="">
                <FloatingDock
                  items={[
                    {
                      title: "Photoshop",
                      icon: (
                        <Image
                          src="skill5.png"
                          width={40}
                          height={40}
                          className=""
                          alt="Photoshop Logo"
                        />
                      ),
                      href: "#",
                    },
                    {
                      title: "Dimension",
                      icon: (
                        <Image
                          src="skill2.png"
                          width={40}
                          height={40}
                          alt="Dimension Logo"
                          className=""
                        />
                      ),
                      href: "#",
                    },
                    {
                      title: "Illustrator",
                      icon: (
                        <Image
                          src="skill4.png"
                          width={40}
                          height={40}
                          alt="Illustrator Logo"
                          className=""
                        />
                      ),
                      href: "#",
                    },
                    {
                      title: "LightRoom",
                      icon: (
                        <Image
                          src="skill3.png"
                          width={40}
                          height={40}
                          alt="LightRoom Logo"
                          className=""
                        />
                      ),
                      href: "#",
                    },
                    {
                      title: "Midjourney",
                      icon: (
                        <Image
                          src="skill1.png"
                          width={40}
                          height={40}
                          alt="Midjourney Logo"
                          className=""
                        />
                      ),
                      href: "#",
                    },
                  ]}
                />
              </div>
            </div>
          </motion.div>
        </LampContainer>
      </section>

      <section id="projects" className="min-h-screen py-20">
        <HeroParallaxDemo />
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
