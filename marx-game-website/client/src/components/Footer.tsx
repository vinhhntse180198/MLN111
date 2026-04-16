import { Cpu } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-amber-500/10 bg-stone-950/80 backdrop-blur-md py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/5 border border-amber-500/10">
            <Cpu className="h-5 w-5 text-amber-500/50" />
          </div>
          
          <div className="space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-amber-200/40">
              Công nghệ & Tư tưởng
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="text-center">
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mb-1">Xử lý Ngôn ngữ</p>
                <p className="text-xs text-stone-300">Gemini 1.5 Pro</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mb-1">Phát triển UI</p>
                <p className="text-xs text-stone-300">Antigravity Agent</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider mb-1">Xử lý Hình ảnh</p>
                <p className="text-xs text-stone-300">Imagen 3 / DALL-E</p>
              </div>
            </div>
            <p className="max-w-md mx-auto text-[10px] leading-relaxed text-stone-500 italic">
              Minh chứng thực tiễn cho sự phát triển vượt bậc của Lực lượng Sản xuất hiện đại trong việc truyền tải tri thức.
            </p>
          </div>

          <div className="pt-4 flex flex-col items-center gap-2">
            <div className="h-px w-12 bg-amber-500/20" />
            <p className="text-[10px] text-stone-600 font-medium">
              © 2026 Luận điểm & Thực tiễn. Mọi nỗ lực vì sự tiến bộ của nhận thức.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
