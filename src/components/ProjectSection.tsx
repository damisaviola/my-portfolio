import { useState, useEffect } from "react";
import { ExternalLink, FolderGit2, Star, GitFork } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}

export function ProjectSection() {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch("https://api.github.com/users/damisaviola/repos?sort=updated&per_page=12");
        if (!res.ok) throw new Error("Gagal mengambil data project");
        const data = await res.json();
        // Filter out forks, and limit to 4 or 6 items
        const originalRepos = data.filter((repo: GithubRepo) => !repo.fork).slice(0, 6);
        setRepos(originalRepos);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <section id="projects" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-purple-500 shadow-md">
            <FolderGit2 className="w-6 h-6" />
          </div>
          Project Saya
        </h2>
        
        {loading ? (
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 gap-6 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 md:px-0 md:mx-0 hide-scrollbar">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="w-[85vw] max-w-[320px] sm:w-[400px] sm:max-w-none md:w-auto shrink-0 snap-center md:snap-align-none glass-card rounded-[2rem] p-6 flex flex-col min-h-[280px] animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-secondary rounded-full"></div>
                  <div className="w-8 h-8 bg-secondary rounded-full"></div>
                </div>
                <div className="h-6 w-3/4 bg-secondary rounded mb-2"></div>
                <div className="h-4 w-full bg-secondary rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-secondary rounded mb-6 flex-1"></div>
                <div className="flex gap-2">
                  <div className="w-16 h-4 bg-secondary rounded"></div>
                  <div className="w-10 h-4 bg-secondary rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center p-8 glass-card rounded-[2rem] text-red-500">
            {error}
          </div>
        ) : (
          <div className="flex overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 gap-6 md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 md:px-0 md:mx-0 hide-scrollbar">
            {repos.map((repo) => (
              <div key={repo.id} className="w-[85vw] max-w-[320px] sm:w-[400px] sm:max-w-none md:w-auto shrink-0 snap-center md:snap-align-none group glass-card rounded-[2rem] p-6 flex flex-col min-h-[280px] hover:border-purple-500/50 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full glass bg-purple-500/10 text-purple-500">
                    <GithubIcon className="w-6 h-6" />
                  </div>
                  <div className="flex gap-3">
                    {repo.homepage && (
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-white/10 transition-colors" title="Live Demo">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-full hover:bg-white/10 transition-colors" title="Source Code">
                      <FolderGit2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold group-hover:text-purple-500 transition-colors mb-2 line-clamp-1 uppercase tracking-tight">
                  {repo.name.replace(/-/g, " ")}
                </h3>
                
                <p className="text-muted-foreground mb-6 flex-1 text-sm line-clamp-3">
                  {repo.description || "Project ini tidak memiliki deskripsi."}
                </p>
                
                <div className="flex flex-wrap items-center gap-3 mt-auto pt-4 border-t border-border/50">
                   {repo.language && (
                     <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mr-2">
                       <div className="w-2.5 h-2.5 rounded-full bg-purple-500"></div>
                       {repo.language}
                     </div>
                   )}
                   <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                     <Star className="w-3.5 h-3.5" />
                     {repo.stargazers_count}
                   </div>
                   <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                     <GitFork className="w-3.5 h-3.5" />
                     {repo.forks_count}
                   </div>
                   {repo.topics && repo.topics.length > 0 && (
                       <div className="flex flex-wrap gap-1 border-l border-border/50 pl-3">
                         {repo.topics.slice(0, 2).map((topic) => (
                           <span key={topic} className="text-[10px] font-semibold px-2 py-1 rounded-full bg-secondary text-secondary-foreground border border-border">
                             {topic}
                           </span>
                         ))}
                       </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
