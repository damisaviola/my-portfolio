import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { GithubIcon } from "./SocialIcons";
import { useTheme } from "./theme-provider";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export function ContributorSection() {
  const { theme } = useTheme(); 
  const GITHUB_USERNAME = "damisaviola";

  return (
    <section id="contributions" className="py-20 px-6 relative overflow-hidden">
      {/* Background Decor bernuansa hijau GitHub */}
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px] mix-blend-screen pointer-events-none"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-emerald-500 shadow-xl transform hover:rotate-12 transition-transform cursor-pointer">
            <GithubIcon className="w-6 h-6" />
          </div>
          Jejak Kode (GitHub)
        </h2>
        <p className="text-muted-foreground mb-12">
          Rekam jejak aktivitas "hijau" (*commits*) harian saya di semesta GitHub.
        </p>

        <div className="glass-card p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] flex justify-start md:justify-center overflow-x-auto md:overflow-hidden hide-scrollbar w-full border border-white/10 shadow-lg relative cursor-default">
          <div className="min-w-[800px] md:min-w-0 md:w-full pr-6 md:pr-0 pointer-events-auto [&_svg]:md:!w-full [&_svg]:md:!h-auto relative">
            <GitHubCalendar 
              username={GITHUB_USERNAME} 
              colorScheme={theme === "light" ? "light" : "dark"}
              blockSize={13}
              blockMargin={5}
              fontSize={14}
              theme={{
                light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
                dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
              }}
              renderBlock={(block, activity) => React.cloneElement(block, {
                'data-tooltip-id': 'github-tooltip',
                'data-tooltip-html': `<strong>${activity.count} kontribusi</strong> pada ${activity.date}`,
              })}
            />
            
            {/* Native Floating Tooltip */}
            <Tooltip 
              id="github-tooltip" 
              variant={theme === "light" ? "dark" : "light"}
              className="!rounded-lg !text-xs !px-3 !py-1.5 !font-sans !z-50 shadow-xl"
            />
          </div>
          
          {/* Efek kilatan neon pada kotak kalender */}
          <div className="absolute inset-0 pointer-events-none border-2 border-emerald-500/5 rounded-3xl md:rounded-[2.5rem] mix-blend-screen"></div>
        </div>

        <div className="mt-12 flex justify-center">
            <a 
              href={`https://github.com/${GITHUB_USERNAME}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full glass font-bold text-sm hover:scale-[1.03] active:scale-95 transition-transform duration-300 shadow-md group border border-emerald-500/10 hover:border-emerald-500/30"
            >
              <GithubIcon className="w-5 h-5 group-hover:text-emerald-500 transition-colors" />
              Kunjungi Profil @{GITHUB_USERNAME}
            </a>
        </div>
      </div>
    </section>
  );
}
