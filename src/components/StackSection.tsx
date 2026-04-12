import { useEffect, useState } from "react";
import { Code2, Terminal } from "lucide-react";

interface LanguageStat {
  name: string;
  count: number;
  percentage: number;
}

export function StackSection() {
  const [languages, setLanguages] = useState<LanguageStat[]>([]);
  const [loading, setLoading] = useState(true);
  const GITHUB_USERNAME = "damisaviola";

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`);
        if (!response.ok) throw new Error("API Limit atau Network Error");
        
        const repos = await response.json();
        const langMap: Record<string, number> = {};
        let totalCount = 0;

        repos.forEach((repo: any) => {
          if (repo.language && !repo.fork) { // abaikan fork agar lebih akurat
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            totalCount++;
          }
        });

        const sorted = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6) // Ambil 6 Teratas
          .map(([name, count]) => ({
            name,
            count,
            percentage: Math.round((count / totalCount) * 100)
          }));

        if (sorted.length > 0) {
          setLanguages(sorted);
        } else {
          throw new Error("Tidak ada repo publik");
        }
      } catch (error) {
        console.warn("Gagal menarik bahasa Github, menggunakan simulasi:", error);
        setLanguages([
          { name: "TypeScript", count: 12, percentage: 45 },
          { name: "JavaScript", count: 8, percentage: 25 },
          { name: "HTML", count: 4, percentage: 15 },
          { name: "CSS", count: 3, percentage: 10 },
          { name: "Python", count: 1, percentage: 5 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const getLangColorAttr = (lang: string) => {
    const colors: Record<string, string> = {
      TypeScript: "from-blue-500 to-blue-400",
      JavaScript: "from-yellow-500 to-yellow-300 text-black",
      HTML: "from-orange-600 to-orange-400",
      CSS: "from-indigo-500 to-indigo-400",
      Python: "from-green-500 to-emerald-400",
      Java: "from-red-600 to-red-400",
      "C++": "from-purple-600 to-purple-400",
      PHP: "from-indigo-600 to-blue-500",
      Ruby: "from-red-700 to-red-500",
      Go: "from-cyan-500 to-cyan-300",
      Rust: "from-orange-600 to-amber-500",
      Vue: "from-emerald-500 to-green-400",
    };
    return colors[lang] || "from-zinc-500 to-zinc-400";
  };

  return (
    <section id="stack" className="py-20 px-6">
      <div className="max-w-4xl mx-auto w-full relative">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-cyan-500 shadow-md transform hover:-rotate-12 transition-transform cursor-default">
            <Terminal className="w-6 h-6" />
          </div>
          Tech Stack
        </h2>
        <p className="text-muted-foreground mb-12">
          Bahasa pemrograman andalan yang ditarik langsung dari preferensi proyek <strong>@{GITHUB_USERNAME}</strong> di GitHub.
        </p>

        {loading ? (
          <div className="glass-card p-10 rounded-[2.5rem] flex justify-center items-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-5 pb-8 md:pb-0 pr-6 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2 relative z-10">
            {/* Swipeable Container for Mobile Native Feel */}
            {languages.map((lang, index) => (
              <div 
                key={lang.name} 
                className="snap-center shrink-0 w-[85vw] md:w-auto glass-card p-6 rounded-3xl group md:hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden"
                style={{ animation: `fade-in-up 0.4s ease-out forwards ${index * 0.1}s`, opacity: 0 }}
              >
                <div className="flex justify-between items-end mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${getLangColorAttr(lang.name)} shadow-sm`}></div>
                    <h3 className="font-bold text-lg">{lang.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-foreground group-hover:text-cyan-500 transition-colors">
                      {lang.percentage}%
                    </span>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mt-1">
                      Distribusi Repo
                    </p>
                  </div>
                </div>

                {/* Progress Bar Asli */}
                <div className="w-full h-2.5 bg-black/10 dark:bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full bg-gradient-to-r ${getLangColorAttr(lang.name)} transform origin-left transition-transform duration-1000 ease-out`}
                    style={{ width: `${lang.percentage}%` }}
                  ></div>
                </div>

                {/* Decorative Icon Background */}
                <Code2 className="absolute -bottom-4 -right-4 w-24 h-24 opacity-[0.03] group-hover:scale-110 group-hover:rotate-12 transition-transform pointer-events-none" />
              </div>
            ))}
          </div>
        )}

        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(15px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>    
    </section>
  );
}
