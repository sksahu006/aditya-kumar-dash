"use client";

import Image from "next/image";
import { CardSpotlight } from "./ui/card-spotlight";

const LifeSection = () => {
  return (
    <div className="container mx-auto px-4 sm:px-8 py-8 sm:py-16 bg-[#020817]">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-16 md:gap-8">
        <div className="relative h-full">
          <div className="absolute -top-12 sm:-top-8 md:top-2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 w-24 sm:w-28 md:w-40 h-24 sm:h-28 md:h-40 z-10">
            <Image
              src="boy1.png"
              alt="Design Life"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
          <CardSpotlight className="h-full mt-8 sm:mt-16 pt-16 sm:pt-20 rounded-3xl bg-gradient-to-br from-[#4d5561] to-[#000d21] backdrop-blur-sm">
            <h2 className="mb-6 sm:mb-8 text-center whitespace-nowrap">
              <span className="text-3xl sm:text-4xl font-bold text-white my-1 block sm:inline">
                Designing
              </span>
              <span className="text-3xl sm:text-4xl font-bold block text-slate-400">
                Life
              </span>
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {[
                "I started design without knowing much about how it actually works.",
                "Then I joined ZICA, Bhubaneswar, where I learned the basics and understood design better.",
                "From there, I started developing my own style, improving with every project and experience."
              ].map((item, index) => (
                <div key={index} className="relative pl-4 sm:pl-6">
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500 via-blue-500 to-black/50" />
                  <p className="hover:text-slate-400 font-semibold text-white text-sm sm:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </CardSpotlight>
        </div>

        <div className="relative h-full">
          <div className="absolute -top-12 sm:-top-8 md:top-2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-12 w-24 sm:w-28 md:w-40 h-24 sm:h-28 md:h-40 z-10">
            <Image
              src="boy2.png"
              alt="Study Life"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          <CardSpotlight className="h-full mt-8 sm:mt-16 pt-16 sm:pt-20 rounded-3xl bg-gradient-to-br from-[#4d5561] to-[#000d21] backdrop-blur-sm">
              <h2 className="mb-6 sm:mb-8 text-center">
                <span className="text-3xl sm:text-4xl font-bold text-white my-1 block sm:inline">
                  Study
                </span>
                <span className="text-3xl sm:text-4xl font-bold block text-slate-400">
                  Life
                </span>
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {[
                  "My student life has been a mix of learning, struggles, and small achievements. Like most people, I followed the usual path of school and studies.",
                  "Over time, I started understanding what I enjoy and where I want to focus. It wasn’t always clear, but I kept learning and improving step by step.",
                  "Now, I’m more focused on building my skills and growing in the right direction. I’m still learning, but with better clarity and purpose."
                ].map((item, index) => (
                  <div key={index} className="relative pl-4 sm:pl-6">
                    <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500 via-blue-500 to-black/50" />
                    <p className="hover:text-slate-400 font-semibold text-white text-sm sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
          </CardSpotlight>
        </div>
      </div>
    </div>
  );
};

export default LifeSection;
