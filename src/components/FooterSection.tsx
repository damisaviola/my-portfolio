import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import { personalInfo } from "../data/content";

export function FooterSection() {
  const socials = [
    { icon: <GithubIcon className="w-5 h-5" />, href: "#", name: "GitHub" },
    { icon: <LinkedinIcon className="w-5 h-5" />, href: "#", name: "LinkedIn" },
    { icon: <Mail className="w-5 h-5" />, href: "#", name: "Email" },
  ];

  return (
    <footer className="relative pt-20 pb-[120px] md:pb-12 px-6 overflow-hidden">
      {/* Glow effect di bawah footer */}
      <div className="absolute bottom-[-20%] left-1/2 transform -translate-x-1/2 w-[80%] h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full glass-card rounded-[2.5rem] p-8 md:p-12 border-t border-white/20 shadow-2xl flex flex-col items-center text-center gap-8 md:flex-row md:items-center md:text-left md:justify-between">
        
        <div className="flex flex-col gap-2">
          <h3 className="text-3xl font-black tracking-tight text-gradient">
            {personalInfo.name}
          </h3>
          <p className="text-muted-foreground text-base max-w-xs font-medium">
            Membangun pengalaman digital antarmuka yang tiada duanya.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          {socials.map((social, index) => (
            <a 
              key={index}
              href={social.href}
              aria-label={social.name}
              className="w-14 h-14 flex items-center justify-center rounded-[1.2rem] glass hover:-translate-y-1 hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 text-foreground group"
            >
              <div className="transform group-hover:scale-110 transition-transform">
                {social.icon}
              </div>
            </a>
          ))}
        </div>
      </div>
      
      <div className="mt-8 text-center text-xs md:text-sm text-muted-foreground font-semibold uppercase tracking-widest opacity-60">
        © {new Date().getFullYear()} Coded with passion. All Rights Reserved.
      </div>
    </footer>
  );
}
