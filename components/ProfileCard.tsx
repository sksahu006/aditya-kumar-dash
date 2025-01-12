"use client";

import Image from "next/image";

export default function ProfileCard() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center min-h-screen p-4">
      <div className="relative group">
        {/* Gradient border background */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00a2f2] via-slate-500 to-[#00496d] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

        {/* Card content */}
        <div className="relative flex flex-col items-center p-4 bg-black/90 rounded-2xl leading-none">
          {/* Image container with gradient border */}
          <div className="relative w-60 h-60 mb-8">
            {/* <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-75"></div> */}
            <div className="relative overflow-hidden rounded-lg w-full h-full">
              <Image
                src={`aditya.jpg`}
                alt="Profile"
                fill
                className="object-cover w-full"
                priority
              />
            </div>
          </div>

          {/* Name with gradient text */}
          <h1 className="text-4xl md:text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
            Hey, I am Aditya
          </h1>
        </div>
      </div>
      <p className="text-2xl font-semibold text-white/70 tracking-wider leading-8 max-w-2xl mx-auto">
        A passionate graphic designer focused on crafting minimalist, impactful,
        and meaningful visual designs.
      </p>
    </div>
  );
}
