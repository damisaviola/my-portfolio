import { Gamepad2 } from "lucide-react";
import { favoriteGames } from "../data/content";

export function GameSection() {
  return (
    <section id="games" className="py-20 px-6">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-teal-500 shadow-md">
            <Gamepad2 className="w-6 h-6" />
          </div>
          Dunia Game
        </h2>
        <p className="text-muted-foreground mb-12">Beberapa judul game yang selalu berhasil menyita waktu luang saya.</p>

        {/* Swipeable Container for Mobile Native Feel */}
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 pb-8 md:pb-0 pr-6 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-2">
          {favoriteGames.map((game, index) => (
            <div 
              key={game.id} 
              className="snap-center shrink-0 w-[85vw] md:w-auto glass-card rounded-[2rem] overflow-hidden group md:hover:-translate-y-2 transition-all duration-300 relative border border-white/10"
              style={{ animation: `fade-in-up 0.5s ease-out forwards ${index * 0.1}s`, opacity: 0 }}
            >
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={game.cover} 
                  alt={game.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                {/* Platform Badge */}
                <div className="absolute top-4 right-4 bg-teal-500/80 backdrop-blur-md text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg">
                  {game.platform}
                </div>
              </div>
              
              <div className="p-6 relative z-10 bg-background/50 backdrop-blur-sm">
                <span className="text-xs font-bold text-teal-500 tracking-wider uppercase mb-2 block">{game.genre}</span>
                <h3 className="text-xl font-bold mb-1 group-hover:text-teal-500 transition-colors line-clamp-1">{game.title}</h3>
              </div>
              
              {/* Neon Glow Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-teal-500/30 rounded-[2rem] pointer-events-none transition-colors duration-500"></div>
            </div>
          ))}
        </div>

        <style>{`
          @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    </section>
  );
}
