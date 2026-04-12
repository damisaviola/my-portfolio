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
          <p className="text-lg md:text-xl leading-relaxed text-foreground md:leading-loose">
            {personalInfo.bio}
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-border">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-gradient">2+</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Tahun Pengalaman</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-gradient">15+</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Proyek Selesai</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-gradient">100%</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Dedikasi</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-bold text-gradient">24/7</span>
              <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Belajar Hal Baru</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
