import { TextShimmerWave } from "./motion-primitives/text-shimmer-wave";

export default function Experience() {
  return (
    <div className="relative flex flex-col items-start justify-center h-screen gap-20 pl-12 text-gray-300">
      
      {/* Experience Card */}
      <div className="relative p-6 shadow-lg rounded-lg border-l-4 border-blue-500 duration-300">
        <h2 className="mb-2 text-2xl font-bold text-gray-100">
          <TextShimmerWave
            className='[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF]'
            duration={1}
            spread={1}
            zDistance={1}
            scaleDistance={1.1}
            rotateYDistance={20}
          >
            Graphic Design Fundamentals
          </TextShimmerWave>
        </h2>
        <p className="text-xl">
          I began my journey in graphic design with classwork, where I learned the fundamentals of design, including color theory, typography, and software tools like Adobe Photoshop and Illustrator. This phase helped me build a strong foundation and develop an eye for aesthetics. Through multiple assignments and projects, I explored different styles and techniques, gradually improving my skills.
        </p>
      </div>

      {/* Experience Card */}
      <div className="relative p-6 shadow-lg rounded-lg border-l-4 border-purple-500 duration-300">
        <h2 className="mb-2 text-2xl font-bold text-gray-100">
          <TextShimmerWave
            className='[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF]'
            duration={1}
            spread={1}
            zDistance={1}
            scaleDistance={1.1}
            rotateYDistance={20}
          >
            Local Projects
          </TextShimmerWave>
        </h2>
        <p className="text-xl">
          After gaining confidence in my abilities, I transitioned to local projects, working with small businesses and individuals in my area. These projects gave me hands-on experience in understanding client needs, managing deadlines, and delivering creative solutions. This phase allowed me to experiment with real-world design challenges and gain insights into the industry’s workflow.
        </p>
      </div>

      {/* Experience Card */}
      <div className="relative p-6 shadow-lg rounded-lg border-l-4 border-pink-500 duration-300">
        <h2 className="mb-2 text-2xl font-bold text-gray-100">
          <TextShimmerWave
            className='[--base-color:#0D74CE] [--base-gradient-color:#5EB1EF]'
            duration={1}
            spread={1}
            zDistance={1}
            scaleDistance={1.1}
            rotateYDistance={20}
          >
            Freelance Graphic Designer
          </TextShimmerWave>
        </h2>
        <p className="text-xl">
          For the past 1.5 years, I have been working as a freelance graphic designer, collaborating with clients on diverse projects. From branding and social media graphics to print and digital designs, I have handled various creative requests while refining my design process. Working with different clients has helped me improve my communication, problem-solving, and project management skills, making me a more adaptable and versatile designer.
        </p>
      </div>
    </div>
  );
}
