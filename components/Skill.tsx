import { LampContainer } from "./ui/lamp";
import { motion } from "framer-motion";

export default function Skill() {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">SKILLS</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 justify-items-center">
            {["Ps", "Ai", "Lr", "Ds", "Pr"].map((skill, index) => (
              <div
                key={skill}
                className="skill-icon w-24 h-24 rounded-xl bg-[#1a2333] text-white flex items-center justify-center text-2xl font-bold"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </LampContainer>
  );
}
