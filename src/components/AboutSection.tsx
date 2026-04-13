import { personalInfo } from "../data/content";
import { User } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 min-h-[50vh] flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-blue-500 shadow-md">
            <User className="w-6 h-6" />
          </div>
          Tentang Pribadi Saya
        </h2>
        
        <div className="glass-card p-8 md:p-12 rounded-[2.5rem]">
          <p className="text-lg md:text-xl leading-relaxed text-foreground md:leading-loose text-center md:text-left">
            {personalInfo.bio}
          </p>
        </div>
      </div>
    </section>
  );
}
