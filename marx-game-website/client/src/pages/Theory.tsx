import { Button } from "@/components/ui/button";
import { markTheoryComplete } from "@/lib/theoryAccess";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  Play,
  RotateCcw,
  Scale,
  BookOpen,
  Home,
  GraduationCap
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const presentationBlocks = [
  {
    icon: GraduationCap,
    title: "Khái niệm Ý thức xã hội",
    body: "Ý thức xã hội là khái niệm triết học dùng để chỉ các mặt, các bộ phận khác nhau của lĩnh vực tinh thần xã hội như quan điểm, tư tưởng, tình cảm, tâm trạng, truyền thống... của cộng đồng xã hội; mà những bộ phận này nảy sinh từ tồn tại xã hội và phản ánh tồn tại xã hội trong những giai đoạn phát triển nhất định.",
  },
  {
    icon: Scale,
    title: "Luận điểm chính",
    body: "Ý thức không xuất hiện từ hư vô. Nó được nảy sinh và biến đổi từ hoàn cảnh sinh hoạt, lao động và các quan hệ xã hội cụ thể.",
  },
  {
    icon: RotateCcw,
    title: "Biểu hiện trong game",
    body: "Tiền bạc, môi trường sống và quan hệ xã hội sẽ thay đổi trước; từ đó kéo theo tư duy và niềm tin của nhân vật.",
  },
  {
    icon: BookOpen,
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
          className="fixed top-0 left-0 right-0 z-50 bg-stone-900/90 backdrop-blur-md border-b border-amber-500/20"
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
              className="bg-amber-600 text-amber-50 hover:bg-amber-500 font-semibold border-none"
            >
              <Play className="h-4 w-4 mr-2" />
              Tiếp tục ngay
            </Button>
          </div>
        </motion.div>
      )}

      <main
        className="container relative z-10 space-y-6 pt-24 pb-6 md:space-y-8 md:pt-28 md:pb-8"
        style={isGameInProgress ? { paddingTop: "140px" } : {}}
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
                    Chương II: Vận động xã hội & Biện chứng thực tiễn
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
                  Hệ thống được thiết kế để theo dõi sự tương tác biện chứng giữa các yếu tố vật chất và tinh thần. 
                  Hãy quan sát cách các biến đổi khách quan trong đời sống sản xuất dẫn dắt sự thay đổi trong chiều sâu tư tưởng của chủ thể.
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
                    Tổng kết tư duy nhân vật
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-amber-100/80">
                <ArrowDown className="h-4 w-4" />
                <span>Tìm hiểu về sự vận động khách quan qua các giai đoạn mô phỏng</span>
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
              Nguyên lý Mô phỏng
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
              Tiến trình Biện chứng
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
              Tổng kết Luận điểm
            </p>
            <div className="mt-4 space-y-3 text-sm leading-8 text-stone-300">
              <p>
                Hệ thống mô phỏng này đóng vai trò là nhịp cầu tri thức, giúp
                hiện thực hóa các luận điểm trừu tượng thành những biến số thực
                tiễn sinh động.
              </p>
              <p>
                Từ đây bạn có thể vào game như một phần thực nghiệm: quan sát 
                sự biến đổi của ý thức chủ thể dưới tác động trực tiếp từ 
                những điều kiện vật chất khách quan.
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
            Lý luận Nền tảng
          </Button>



          {isGameInProgress && (
            <Button
              onClick={handleContinueGame}
              size="lg"
              className="bg-amber-700 hover:bg-amber-600 text-white font-semibold transition-all duration-300 border-none"
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
