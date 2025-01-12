"use client";

import Image from "next/image";
import { CardSpotlight } from "./ui/card-spotlight";

const LifeSection = () => {
  return (
    <div className="container mx-auto px-8 py-16 bg-[#020817]">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="relative">
          <div className="absolute top-2 left-12 w-40 h-40 z-10">
            <Image
              src="boy1.png"
              alt="Design Life"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>
          <CardSpotlight className="mt-16 rounded-3xl bg-gradient-to-br from-[#4d5561] to-[#000d21] backdrop-blur-sm">
            {/* <div className="mt-16 bg-gradient-to-br from-[#4d5561] to-[#000d21] backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50"> */}
            <h2 className="mb-8 text-center whitespace-nowrap">
              <span className="text-4xl font-bold text-white my-1">
                Desging
              </span>
              <span className="text-4xl font-bold block text-slate-400">
                Life
              </span>
            </h2>
            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="relative pl-6">
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500 via-blue-500 to-black/50" />
                  <p className="hover:text-slate-400 font-semibold text-white">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy
                  </p>
                </div>
              ))}
            </div>
            {/* </div> */}
          </CardSpotlight>
        </div>

        <div className="relative">
          <div className="absolute top-0 left-12 w-40 h-40 z-10">
            <Image
              src="boy2.png"
              alt="Study Life"
              width={160}
              height={160}
              className="object-contain"
            />
          </div>

          <CardSpotlight className="mt-16 rounded-3xl bg-gradient-to-br from-[#4d5561] to-[#000d21] backdrop-blur-sm">
            {/* <div className="mt-16 bg-gradient-to-br from-[#4d5561] to-[#000d21] backdrop-blur-sm rounded-3xl p-8 border border-slate-700/50"> */}
              <h2 className="mb-8 text-center">
                <span className="text-4xl font-bold text-white my-1">
                  Study
                </span>
                <span className="text-4xl font-bold block text-slate-400">
                  Life
                </span>
              </h2>
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="relative pl-6">
                    <div className="absolute left-0 top-0 w-0.5 h-full bg-gradient-to-b from-blue-500 via-blue-500 to-black/50" />
                    <p className="hover:text-slate-400 font-semibold text-white">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy
                    </p>
                  </div>
                ))}
              </div>
            {/* </div> */}
          </CardSpotlight>
        </div>
      </div>
    </div>
  );
};

export default LifeSection;
