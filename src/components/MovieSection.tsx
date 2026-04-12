import { useState, useEffect, useRef } from "react";
import { Film, ExternalLink } from "lucide-react";

interface LetterboxdMovie {
  id: string;
  title: string;
  year: string;
  rating: string;
  poster: string;
  link: string;
}

export function MovieSection() {
  const [movies, setMovies] = useState<LetterboxdMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [dragged, setDragged] = useState(false);

  useEffect(() => {
    async function fetchLetterboxd() {
      try {
        const res = await fetch("https://api.rss2json.com/v1/api.json?rss_url=https://letterboxd.com/damisaviola/rss/");
        const data = await res.json();
        
        if (data.status === "ok") {
          const fetchedMovies: LetterboxdMovie[] = [];
          
          for (const item of data.items) {
            if (!item.link.includes('/film/')) continue;
            
            const imgMatch = item.description.match(/src="([^"]+)"/);
            const poster = imgMatch ? imgMatch[1] : '';
            
            let title = item.title;
            let year = "";
            let rating = "";
            
            if (title.includes(' - ')) {
              const parts = title.split(' - ');
              rating = parts.pop() || '';
              title = parts.join(' - ');
            }
            
            const yearMatch = title.match(/, (\d{4})$/);
            if (yearMatch) {
              year = yearMatch[1];
              title = title.replace(yearMatch[0], '');
            }
            
            fetchedMovies.push({
              id: item.guid,
              title: title.trim(),
              year,
              rating,
              poster,
              link: item.link
            });
            
            if (fetchedMovies.length >= 8) break;
          }
          
          setMovies(fetchedMovies);
        }
      } catch (error) {
        console.error("Error fetching Letterboxd RSS:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchLetterboxd();
  }, []);

  // Handle Wheel Scrolling for Desktop
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (e.deltaY === 0) return;
      
      const isScrollableLeft = el.scrollLeft > 0;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      const isScrollableRight = Math.ceil(el.scrollLeft) < maxScrollLeft;
      
      const isScrollingLeft = e.deltaY < 0;
      const isScrollingRight = e.deltaY > 0;
      
      if ((isScrollingLeft && isScrollableLeft) || (isScrollingRight && isScrollableRight)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, [loading, movies]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setDragged(false);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    setDragged(true);
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; 
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="movies" className="py-20 pl-6 md:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        <h2 className="text-3xl font-bold mb-2 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-[#00E054] shadow-md">
            <Film className="w-6 h-6" />
          </div>
          Aktivitas Letterboxd
        </h2>
        <p className="text-muted-foreground mb-10 pr-6">Film-film terbaru yang saya tonton, diambil langsung dari Letterboxd.</p>
        
        {loading || movies.length > 0 ? (
          <div 
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex overflow-x-auto hide-scrollbar gap-6 pb-8 pr-6 -mx-2 px-2 
              ${!loading && !isDragging ? 'snap-x snap-mandatory' : 'snap-none'} 
              ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
          >
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="shrink-0 w-[240px] aspect-[2/3] animate-pulse rounded-3xl glass border border-white/5 dark:border-white/10" />
              ))
            ) : (
              movies.map((movie) => (
                <a 
                  key={movie.id} 
                  href={movie.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onClick={(e) => dragged && e.preventDefault()}
                  className="snap-start shrink-0 w-[240px] group relative rounded-3xl overflow-hidden glass hover:shadow-xl transition-all duration-300 block border border-white/5 dark:border-white/10"
                >
                  <div className="aspect-[2/3] w-full relative pointer-events-none">
                    <img 
                      src={movie.poster} 
                      alt={movie.title} 
                      draggable={false}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-[2px]">
                      <div className="w-12 h-12 rounded-full glass flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-100">
                          <ExternalLink className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform pointer-events-none">
                    <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2">{movie.title}</h3>
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-white/70 tracking-wider mix-blend-screen">{movie.year}</span>
                      <span className="text-[#00E054] drop-shadow-md">{movie.rating}</span>
                    </div>
                  </div>
                </a>
              ))
            )}
          </div>
        ) : (
          <div className="glass-card rounded-[2rem] p-8 text-center text-muted-foreground border border-border/50">
             Tidak ada data film saat ini.
          </div>
        )}
      </div>
    </section>
  );
}
