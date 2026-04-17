import { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User as UserIcon } from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { personalInfo } from "../data/content";

// Setup gemini
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || "");

interface Message {
  role: "user" | "bot";
  text: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: `Halo! Saya asisten AI ${personalInfo.name}. Ada yang ingin ditanyakan tentang portofolio atau pengalaman Dami?` }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Apa tech stack favorit Dami?",
    "Tunjukkan project paling sulit.",
    "Gimana cara kontak Dami?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || !apiKey) return;

    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-flash-latest",
        systemInstruction: `Kamu adalah asisten virtual untuk portofolio Dami (${personalInfo.username}).
Pendidikan: S1 Universitas Amikom Yogyakarta Fakultas Ilmu Komputer.
Minat: Tertarik pada bidang Software Engineering, AI, dan Data Science.
Bio Dami: ${personalInfo.bio}

Tech Stack Dami (Jawab dengan antusias bahwa ini adalah favorit Dami):
- Bahasa Pemrograman: JavaScript, TypeScript, Golang, PHP, Python, Kotlin, Dart, Java.
- Frontend & Mobile: React.js, Next.js, Vue.js, Tailwind CSS, Bootstrap.
- Backend & Framework: Express.js, NestJS, Laravel, CodeIgniter, Golang (Fiber, Gin).
- Database, Caching & BaaS: PostgreSQL, MySQL, MongoDB, Redis, Supabase.

Data Science & Analytics:
- Tools: Google Colab, Jupyter Notebook.
- Library: NumPy, Pandas, Matplotlib (digunakan Dami untuk riset data dan proyek astronomi).

DevOps & Development Environment:
- Tools: Docker (untuk kontainerisasi aplikasi), Laragon (untuk local development server).

Tools Kelola Data & Ide:
- Dokumentasi & Ide: Notion.
- Manajemen Proyek: GitHub Projects.
- Desain & Prototype: Figma.
Semau tools dan stack yang dami sering belajar seiring waktu.

Project paling sulit: Dami pernah merasa bahwa membangun UI portal eazy.id atau rekayasa data adalah hal yang rumit dan menantang.
Film Terakhir Ditonton: "Star Trek (2009)" (Dami rutin membagikan film yang ia tonton di Letterboxd).
Lagu/Playlist Kesukaan: Playlist bernama "kerjaaa" di Spotify yang biasa Dami pakai untuk menemani sesi coding.
Komik/Manga Favorit: 
- Manga: Fullmetal Alchemist, Berserk, Vinland Saga, dan Monster. 
- Komik Barat: Watchmen, Batman: The Dark Knight Returns, Daredevil: Born Again, dan Kingdom Come.

Kontak: Dami bisa dihubungi melalui email di damimaturbongs@gmail.com atau melalui DM di Github/Instagram dengan username ${personalInfo.username}.
Jawablah dengan bahasa Indonesia yang santai, profesional, dan to the point.

PENTING: 
1. Jawablah dengan teks biasa (plain text) saja. 
2. JANGAN gunakan format Markdown seperti tanda bintang (**), hashtag (#), atau bullet points. 
3. JANGAN menebalkan atau memiringkan kata apa pun.
4. Gunakan spasi atau baris baru untuk memisahkan poin jika diperlukan, tapi tanpa simbol list.`,
      });

      // Prepare history for Gemini
      const chatHistory = newMessages.slice(1, -1).map(msg => ({
        role: msg.role === "bot" ? "model" : "user",
        parts: [{ text: msg.text }]
      }));

      const chat = model.startChat({
        history: chatHistory
      });

      const result = await chat.sendMessage(text);
      const responseText = result.response.text();

      setMessages(prev => [...prev, { role: "bot", text: responseText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "bot", text: "Maaf, terjadi kesalahan saat menghubungi AI. Pastikan API key sudah valid." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 md:bottom-8 right-6 z-[60] p-4 rounded-full glass bg-white/90 dark:bg-blue-500/80 text-blue-500 dark:text-white border border-blue-500/20 dark:border-transparent shadow-[0_0_20px_rgba(59,130,246,0.2)] dark:shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all outline-none ${isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 md:bottom-8 right-6 z-[60] w-[350px] max-w-[calc(100vw-3rem)] flex flex-col glass-card rounded-2xl shadow-xl transition-all origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 dark:bg-black/20 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full shadow-md bg-blue-500 text-white">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm">Dami's Assistant</h3>
              <p className="text-xs text-green-500 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
              </p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 text-muted-foreground hover:text-foreground transition-colors hover:bg-white/10 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="p-4 h-[380px] overflow-y-auto flex flex-col gap-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 flex-none ${msg.role === 'user' ? 'bg-purple-500/20 text-purple-500' : 'bg-blue-500 text-white shadow-md'}`}>
                {msg.role === 'user' ? <UserIcon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${msg.role === 'user' ? 'bg-purple-500/20 border border-purple-500/30 text-foreground rounded-tr-sm' : 'glass bg-secondary/30 text-foreground rounded-tl-sm shadow-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white shadow-md flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl glass bg-secondary/30 text-foreground rounded-tl-sm flex gap-1 items-center">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.2s" }}></span>
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0.4s" }}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-white/5 dark:bg-black/20 rounded-b-2xl">
          {messages.length === 1 && (
            <div className="flex flex-col gap-2 mb-4">
              <p className="text-xs text-muted-foreground font-medium ml-1">Suggested:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all text-left shadow-sm hover:shadow-md"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tanya sesuatu..."
              className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all font-medium"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 w-10 h-10 rounded-full bg-blue-500 text-white disabled:opacity-50 hover:bg-blue-600 transition-colors shrink-0 flex flex-center items-center justify-center shadow-md active:scale-95"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
          {!apiKey && (
            <p className="text-[10px] text-red-500 mt-2 text-center font-medium bg-red-500/10 p-1.5 rounded-md border border-red-500/20">Google API Key belum di-set di .env</p>
          )}
        </div>
      </div>
    </>
  );
}
