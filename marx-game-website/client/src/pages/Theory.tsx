import { Button } from "@/components/ui/button";
import { markTheoryComplete } from "@/lib/theoryAccess";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  Play,
  Radar,
  Scale,
  Sparkles,
  Home,
  RotateCcw,
  GraduationCap
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const presentationBlocks = [
  {
    icon: Scale,
    title: "Luận điểm chính",
    body: "Ý thức không xuất hiện từ hư vô. Nó được nảy sinh và biến đổi từ hoàn cảnh sinh hoạt, lao động và các quan hệ xã hội cụ thể.",
  },
  {
    icon: Radar,
    title: "Biểu hiện trong game",
    body: "Tiền bạc, môi trường sống và quan hệ xã hội sẽ thay đổi trước; từ đó kéo theo tư duy và niềm tin của nhân vật.",
  },
  {
    icon: Sparkles,
    title: "Điều cần quan sát",
    body: "Đừng chỉ xem nhân vật chọn gì, hãy xem vì sao họ chọn như vậy trong một bối cảnh vật chất nhất định.",
  },
];

const demoFlow = [
  {
    title: "Bước 1",
    body: "Chọn nhân vật có xuất phát điểm khác nhau để cho thấy điều kiện vật chất ban đầu không giống nhau.",
  },
  {
    title: "Bước 2",
    body: "Theo dõi các biến đổi ở tiền bạc, môi trường và quan hệ trước khi tư duy, niềm tin thay đổi.",
  },
  {
    title: "Bước 3",
    body: "Kết nối phần tổng kết cuối game với luận điểm triết học đã trình bày ở trang đầu.",
  },
];

export default function Theory() {
  const [, setLocation] = useLocation();
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  useEffect(() => {
    // Check if there's an active game session
    const gameState = localStorage.getItem("gameState");
    const selectedCharacter = localStorage.getItem("selectedCharacter");
    setIsGameInProgress(!!gameState && !!selectedCharacter);
  }, []);

  const handleStartGame = () => {
    // Clear previous simulation identity and progress for a fresh start
    localStorage.removeItem("rpg_player_name");
    localStorage.removeItem("gameState");
    localStorage.removeItem("selectedCharacter");
    markTheoryComplete();
    setLocation("/game");
  };

  const handleContinueGame = () => {
    setLocation("/game");
  };

  return (
    <div className="game-shell">
      <div className="game-backdrop" />
      <div className="game-grid-overlay" />
      <div className="game-noise" />

      {/* Sticky Continue Game Banner */}
      {isGameInProgress && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600/90 to-blue-700/90 backdrop-blur-sm border-b border-blue-400/30"
        >
          <div className="container px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-100">
                Bạn có một ván game đang chơi dở
              </p>
            </div>
            <Button
              onClick={handleContinueGame}
              size="sm"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              <Play className="h-4 w-4 mr-2" />
              Tiếp tục ngay
            </Button>
          </div>
        </motion.div>
      )}

      <main
        className="container relative z-10 space-y-6 py-6 md:space-y-8 md:py-8"
        style={isGameInProgress ? { paddingTop: "120px" } : {}}
      >
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="game-panel game-panel-glow min-h-[78vh]">
            <div className="flex h-full flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                    Trang 2/2 • Giải thích cách game minh họa lý thuyết
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setLocation("/")}
                    className="border-amber-300/20 bg-white/5 text-amber-50 hover:bg-white/10"
                  >
                    <Home className="h-4 w-4" />
                    Trang chủ
                  </Button>
                </div>
                <h1 className="game-title">
                  Từ lý thuyết sang trải nghiệm: game sẽ minh họa điều đó như
                  thế nào?
                </h1>
                <p className="max-w-3xl text-sm leading-8 text-stone-300 md:text-base">
                  Đây là một trang dài riêng. Bạn cứ kéo xuống như đang đi tiếp
                  một chương mới của bài thuyết trình: từ nguyên lý chung, sang
                  cơ chế mô phỏng, rồi chốt lại bằng cách demo và vào chơi.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="game-chip">
                  <span className="game-chip-label">Đầu vào</span>
                  <span className="game-chip-value">
                    Hoàn cảnh, thu nhập, quan hệ
                  </span>
                </div>
                <div className="game-chip">
                  <span className="game-chip-label">Biến đổi</span>
                  <span className="game-chip-value">
                    Tư duy, niềm tin, thái độ
                  </span>
                </div>
                <div className="game-chip">
                  <span className="game-chip-label">Kết quả</span>
                  <span className="game-chip-value">
                    Một hồ sơ ý thức sau mỗi chương
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-amber-100/80">
                <ArrowDown className="h-4 w-4" />
                <span>Kéo xuống để xem phần cơ chế và cách demo</span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          <div className="game-panel">
            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
              Cơ chế minh họa
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-stone-50">
              Game không giảng lý thuyết bằng chữ, mà cho người chơi tự thấy sự
              vận động đó qua lựa chọn
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {presentationBlocks.map(({ icon: Icon, title, body }) => (
              <div key={title} className="game-panel min-h-[240px]">
                <Icon className="h-5 w-5 text-amber-200" />
                <p className="game-subpanel-title mt-4">{title}</p>
                <p className="game-subpanel-body">{body}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-6 lg:grid-cols-[1fr_0.95fr]"
        >
          <div className="game-panel game-panel-glow">
            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
              Gợi ý khi demo
            </p>
            <div className="mt-5 space-y-4">
              {demoFlow.map(item => (
                <div key={item.title} className="game-chip">
                  <span className="game-chip-label">{item.title}</span>
                  <span className="game-chip-value">{item.body}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="game-panel">
            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
              Chốt phần lý thuyết
            </p>
            <div className="mt-4 space-y-3 text-sm leading-8 text-stone-300">
              <p>
                Trang 1 giúp người xem hiểu luận điểm. Trang 2 giúp họ hiểu vì
                sao game là một minh họa trực quan cho luận điểm đó.
              </p>
              <p>
                Từ đây bạn có thể vào game như một phần demo thực nghiệm: hoàn
                cảnh vật chất thay đổi ra sao thì ý thức của nhân vật cũng đổi
                theo như vậy.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          <Button
            variant="outline"
            size="lg"
            onClick={() => setLocation("/")}
            className="border-amber-300/20 bg-white/5 text-amber-50 hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Trang 1
          </Button>



          {isGameInProgress && (
            <Button
              onClick={handleContinueGame}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300"
            >
              <Play className="h-4 w-4" />
              Tiếp tục chơi
            </Button>
          )}

          <Button onClick={handleStartGame} size="lg" className="game-cta">
            Bắt đầu chơi
            <Play className="h-4 w-4" />
          </Button>
        </motion.section>
      </main>
    </div>
  );
}
