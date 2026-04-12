import { useState, useEffect } from "react";
import { Music, Disc } from "lucide-react";

interface SpotifyData {
  track_id: string;
  timestamps: { start: number; end: number };
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

export function SongSection() {
  const [spotifyStatus, setSpotifyStatus] = useState<SpotifyData | null>(null);

  useEffect(() => {
    let heartbeatInterval: number;
    const socket = new WebSocket("wss://api.lanyard.rest/socket");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.op === 1) {
        socket.send(JSON.stringify({
          op: 2,
          d: { subscribe_to_id: "743055034136264756" }
        }));
        
        heartbeatInterval = window.setInterval(() => {
          socket.send(JSON.stringify({ op: 3 }));
        }, data.d.heartbeat_interval);
      } else if (data.op === 0) {
        if (data.t === "INIT_STATE" || data.t === "PRESENCE_UPDATE") {
          setSpotifyStatus(data.d.spotify);
        }
      }
    };

    return () => {
      if (heartbeatInterval) clearInterval(heartbeatInterval);
      
      if (socket.readyState === WebSocket.CONNECTING) {
        socket.addEventListener('open', () => socket.close());
      } else if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  return (
    <section id="songs" className="py-20 px-6 bg-secondary/30">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-green-500 shadow-md">
            <Music className="w-6 h-6" />
          </div>
          Lagu Peneman Coding
        </h2>
        <p className="text-muted-foreground mb-8">Playlist andalan dari Spotify untuk menemani sesi coding.</p>
        
        {/* Lanyard Real-time Spotify */}
        <div className="mb-8">
          {spotifyStatus ? (
            <div className="glass-card rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 relative overflow-hidden group border border-green-500/20">
              <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition-colors"></div>
              
              <div className="relative w-32 h-32 shrink-0 rounded-full overflow-hidden shadow-2xl ring-4 ring-black/40 dark:ring-white/10 group-hover:scale-105 transition-transform duration-500">
                <img 
                  src={spotifyStatus.album_art_url} 
                  alt={spotifyStatus.album}
                  className="w-full h-full object-cover animate-[spin_12s_linear_infinite]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent rounded-full mix-blend-overlay"></div>
                {/* Vinyl Center Hole */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full border border-border shadow-inner"></div>
              </div>
              
              <div className="flex-1 text-center sm:text-left z-10 w-full overflow-hidden">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-green-500 font-semibold mb-3">
                  <Disc className="w-4 h-4 animate-spin" />
                  <span className="tracking-wide text-xs uppercase">Currently Listening</span>
                </div>
                <h3 className="text-2xl font-bold mb-1 truncate text-foreground">{spotifyStatus.song}</h3>
                <p className="text-lg text-muted-foreground mb-1 truncate">by {spotifyStatus.artist}</p>
                <p className="text-sm text-muted-foreground/60 truncate">{spotifyStatus.album}</p>
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-[2rem] p-6 flex flex-col items-center justify-center gap-3 text-muted-foreground border border-border/50">
              <Disc className="w-6 h-6 opacity-50" />
              <span className="text-sm">Sedang tidak mendengarkan lagu di Spotify.</span>
            </div>
          )}
        </div>
        
        <div className="w-full mt-4">
          <iframe 
            data-testid="embed-iframe" 
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/playlist/2Pdq2tor4ATv288Z9B2YZv?utm_source=generator" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
            className="shadow-lg"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
