import { useState } from "react";
import { favoriteManga, favoriteComics } from "../data/content";
import { BookOpen, LibraryBig } from "lucide-react";

export function ComicSection() {
  const [activeTab, setActiveTab] = useState<"manga" | "western">("manga");

  const currentData = activeTab === "manga" ? favoriteManga : favoriteComics;

  return (
    <section id="comics" className="py-20 px-6">
      <div className="max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-yellow-500 shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          Pojok Komik & Manga
        </h2>
        <p className="text-muted-foreground mb-12">Koleksi mahakarya fiksi favorit saya, dikurasi menjadi satu layar interaktif.</p>

        {/* Unified Single Glass Card */}
        <div className="glass-card p-6 md:p-10 rounded-[2.5rem] relative overflow-hidden min-h-[450px]">
          
          {/* Native-like Segmented Pill Control */}
          <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-[1.25rem] mb-10 w-full relative z-20 border border-white/10 shadow-inner">
            <button 
              onClick={() => setActiveTab("manga")}
              className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                activeTab === "manga" 
                  ? "bg-white dark:bg-zinc-800 text-red-500 shadow-md transform scale-[1.02]" 
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              }`}
            >
              Manga Comic
            </button>
            <button 
              onClick={() => setActiveTab("western")}
              className={`flex-1 py-3.5 text-sm font-bold rounded-xl transition-all duration-300 ${
                activeTab === "western" 
                  ? "bg-white dark:bg-zinc-800 text-blue-500 shadow-md transform scale-[1.02]" 
                  : "text-muted-foreground hover:text-foreground active:scale-95"
              }`}
            >
              Western Comic
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {currentData.map((item, index) => (
              <div 
                key={`${activeTab}-${item.id}`} 
                className="flex gap-5 group items-center animate-pulse" 
                style={{ animation: `fade-in 0.4s ease-out forwards ${index * 0.1}s`, opacity: 0 }}
              >
                <div className="w-[5rem] h-[7rem] rounded-xl overflow-hidden shrink-0 border border-white/10 relative shadow-sm">
                  <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div className="flex flex-col py-1">
                  <span className={`text-[10px] font-black tracking-widest uppercase mb-1.5 ${activeTab === 'manga' ? 'text-red-500' : 'text-blue-500'}`}>
                    {item.status}
                  </span>
                  <h4 className={`font-bold text-lg leading-tight md:text-xl transition-colors mb-1.5 ${activeTab === 'manga' ? 'group-hover:text-red-500' : 'group-hover:text-blue-500'}`}>
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium text-muted-foreground">{item.author}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Minimalist Background Decoration that changes contextually */}
          <div className={`absolute bottom-[-5%] right-[-5%] p-4 z-0 pointer-events-none transform rotate-12 transition-all duration-700 ease-out ${activeTab === 'western' ? 'opacity-[0.04] scale-100' : 'opacity-0 scale-50'}`}>
            <LibraryBig className="w-64 h-64" />
          </div>
          <div className={`absolute bottom-[-5%] right-[-5%] p-4 z-0 pointer-events-none transform -rotate-12 transition-all duration-700 ease-out ${activeTab === 'manga' ? 'opacity-[0.04] scale-100' : 'opacity-0 scale-50'}`}>
            <BookOpen className="w-64 h-64" />
          </div>

          <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
