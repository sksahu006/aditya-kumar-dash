"use client";

import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
export default function ProfileCard() {
  return (
    <>
      {/* <div className="flex flex-col gap-6 justify-center items-center min-h-screen p-4">
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-b from-[#00a2f2] via-slate-500 to-[#00496d] rounded-3xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>

          <div className="relative flex flex-col items-center p-4 bg-black/90 rounded-3xl leading-none">
            <div className="relative w-96 h-96 mb-8">
              <div className="relative overflow-hidden rounded-3xl w-full h-full">
                <Image
                  src={`aditya.jpg`}
                  alt="Profile"
                  fill
                  className="object-cover w-full rounded-xl group-hover/card:shadow-xl"
                  priority
                />
              </div>
            </div>

            <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              <span className="text-white font-medium from-neutral-400">
                Hey,
              </span>{" "}
              I am Aditya
            </h1>
          </div>
        </div>
        <p className="text-2xl font-semibold text-white/70 tracking-wider leading-8 max-w-2xl mx-auto mt-4">
          A passionate graphic designer focused on crafting minimalist,
          impactful, and meaningful visual designs.
        </p>
      </div> */}
      <CardContainer className="relative">
        <div className="absolute -inset-0.5 bg-gradient-to-b from-[#00a2f2] via-slate-500 to-[#00496d] rounded-3xl opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <CardBody className="bg-black/50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-3xl border">
          <div className="bg-black/90 p-4 rounded-3xl">
            <CardItem translateZ="100" className="w-full">
              <Image
                src="aditya.jpg"
                height="1000"
                width="1000"
                className="h-96 w-full object-cover rounded-3xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex items-center mt-4 justify-center">
              <CardItem
                translateZ={40}
                className="px-4 py-2 rounded-3xl text-xs font-normal dark:text-white"
              >
                <h1 className="text-2xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
                  <span className="text-white font-medium from-neutral-400">
                    Hey,
                  </span>{" "}
                  I am Aditya
                </h1>
              </CardItem>
            </div>
          </div>
        </CardBody>
      </CardContainer>
    </>
  );
}
