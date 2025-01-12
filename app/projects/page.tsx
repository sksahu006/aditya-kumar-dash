"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function ProjectsPage() {
  useEffect(() => {
    gsap.from(".project-card", {
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
    });
  }, []);

  const projects = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    title: ["E HUMANS HUMANC", "HALF LIFE", "WHO?", "INCEPTION", "AVATAR", "MATRIX"][i % 6],
  }));

  return (
    <main className="bg-[#020817] min-h-screen text-white py-20">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold mb-2">All Projects</h1>
        <p className="text-xl text-blue-400 mb-12">Explore my complete portfolio</p>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="project-card group"
            >
              <div className="relative h-[400px] bg-[#1a2333] rounded-xl overflow-hidden">
                <Image
                  src={`https://source.unsplash.com/random/800x1200?movie,poster&sig=${project.id}`}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}