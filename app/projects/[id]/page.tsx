"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  useEffect(() => {
    gsap.from(".content", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  }, []);

  const projectTitles = [
    "E HUMANS HUMANC",
    "HALF LIFE",
    "WHO?",
    "INCEPTION",
    "AVATAR",
    "MATRIX",
  ];
  const projectTitle = projectTitles[Number(params.id) % projectTitles.length];

  return (
    <main className="bg-[#020817] min-h-screen text-white py-20">
      <div className="container mx-auto px-4 content">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12"
        >
          <ArrowLeft size={20} />
          Back to Projects
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative h-[600px] bg-[#1a2333] rounded-xl overflow-hidden">
            <Image
              src={`https://source.unsplash.com/random/1200x1600?movie,poster&sig=${params.id}`}
              alt={projectTitle}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">{projectTitle}</h1>
              <p className="text-gray-400">
                A detailed exploration of visual storytelling through minimalist design principles.
                This project showcases the perfect balance between form and function.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Tools & Technologies</h2>
              <div className="flex gap-4">
                {["Ps", "Ai", "Lr"].map((tool) => (
                  <span
                    key={tool}
                    className="px-4 py-2 bg-[#1a2333] rounded-lg"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Project Details</h2>
              <p className="text-gray-400">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink size={20} />
                Live Preview
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a2333] rounded-lg hover:bg-[#2a3343] transition-colors"
              >
                <Github size={20} />
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}