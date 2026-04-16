import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  useGameLogic,
  type Character,
  type GameStats,
} from "@/hooks/useGameLogic";
import { useQuizLogic } from "@/hooks/useQuizLogic";
import { hasCompletedTheory } from "@/lib/theoryAccess";
import { AnimatePresence, motion } from "framer-motion";
import { 
  BookOpen, 
  Home, 
  GraduationCap, 
  ChevronRight, 
  CheckCircle2, 
  XCircle,
  RotateCcw,
  BookMarked,
  Coins,
  Factory,
  Users,
  Trophy,
  Zap,
  Sparkles
} from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { useLocation } from "wouter";

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold text-stone-50 md:text-3xl">
        {title}
      </h2>
      <p className="text-sm leading-7 text-stone-400">
        {description}
      </p>
    </div>
  );
}

function StatRow({ label, value, max, icon, variant = "amber" }: { label: string; value: string | number; max?: number; icon?: React.ReactNode; variant?: "amber" | "stone" | "blue" }) {
  const isNumeric = typeof value === "number";
  const percentage = isNumeric && max ? (value / max) * 100 : 0;
  
  return (
    <div className="game-stat-row">
      <div className="flex items-center gap-2">
        {icon && <span className="text-amber-400/60">{icon}</span>}
        <span className="game-stat-label">{label}</span>
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <span className="game-stat-value font-bold">{value}</span>
        {isNumeric && max && (
          <div className="h-1 w-24 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              className={`h-full ${variant === 'amber' ? 'bg-amber-500' : variant === 'blue' ? 'bg-blue-500' : 'bg-stone-500'}`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

const characterProfiles = {
  farmer: {
    codename: "H5-01",
    role: "Tuyến nông thôn",
    trait: "Bền bỉ, sống sót cộng đồng",
    icon: <Users className="h-4 w-4" />,
    color: "amber" as const,
  },
  worker: {
    codename: "W2-02",
    role: "Tuyến công nhân",
    trait: "Kỷ luật, đoàn kết giai cấp",
    icon: <Factory className="h-4 w-4" />,
    color: "stone" as const,
  },
  student: {
    codename: "S3-03",
    role: "Tuyến trí thức",
    trait: "Nhạy bén, khao khát đổi mới",
    icon: <GraduationCap className="h-4 w-4" />,
    color: "blue" as const,
  },
};

function getCharacterProfile(character: Character | null) {
  if (!character) return characterProfiles.farmer;
  return (characterProfiles as any)[character.id] || characterProfiles.farmer;
}

function getEndingAnalysis(stats: GameStats | null) {
  if (!stats) return "";
  const { money } = stats;
  if (money >= 60) return "Bạn đã đạt được sự tích lũy vật chất đáng kể, chuyển hóa ý thức sang tư duy quản trị và ổn định xã hội.";
  if (money <= 20) return "Sự thiếu hụt nguồn lực kéo dài khiến ý thức luôn tập trung vào các nhu cầu cơ bản nhất của sự tồn tại.";
  return "Mức sống trung bình giúp bạn duy trì sự cân bằng giữa các mục tiêu cá nhân và trách nhiệm cộng đồng.";
}

function getMoneyProgress(money: number) {
  return (money / 100) * 100;
}

// --- BONUS CARD SELECTION COMPONENT ---
interface BonusCardSelectionProps {
  baseAmount: number;
  onSelect: (amount: number) => void;
}

const BonusCardSelection = ({ baseAmount, onSelect }: BonusCardSelectionProps) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  
  // Create 3 potential rewards: [lower, base, double]
  const cardValues = useMemo(() => {
    const values = [
      Math.floor(baseAmount * 0.5) || 5, // Lower
      baseAmount,                        // Base
      baseAmount * 2                     // Double (Super Lucky)
    ];
    return [...values].sort(() => Math.random() - 0.5);
  }, [baseAmount]);

  const handleCardClick = (index: number) => {
    if (selectedIdx !== null) return;
    setSelectedIdx(index);
    
    // Smooth transition
    setTimeout(() => {
      setRevealed(true);
      // Wait a bit to let the user see the result before continuing
      setTimeout(() => {
        onSelect(cardValues[index]);
      }, 1500);
    }, 600);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md"
    >
      <div className="max-w-3xl w-full text-center space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4 px-4 py-1">PHẦN THƯỞNG MAY MẮN</Badge>
          <h2 className="text-4xl font-black text-stone-50 tracking-tighter uppercase leading-tight">
            Chọn một <span className="text-amber-500">Lá Bài Ma Thuật</span>
          </h2>
          <p className="text-stone-400 mt-2 text-lg">Vận may của nhà tư tưởng đang chờ đợi bạn...</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 pt-8">
          {cardValues.map((val, idx) => {
            const isSelected = selectedIdx === idx;
            const isRevealed = revealed || isSelected;
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={!revealed ? { y: -10, scale: 1.05 } : {}}
                className="relative h-64 w-44 cursor-pointer perspective-1000"
                onClick={() => handleCardClick(idx)}
              >
                <div className={`relative w-full h-full transition-all duration-700 transform-style-3d ${isRevealed ? "rotate-y-180" : ""}`}>
                  {/* Front (Face down) */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl border-2 border-amber-500/30 bg-gradient-to-br from-stone-900 to-stone-950 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="absolute inset-0 bg-amber-500/5 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 30%, rgba(245,158,11,0.1) 70%)' }}></div>
                    <div className="h-16 w-16 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 mb-4">
                      <Sparkles className="h-8 w-8 text-amber-500/50" />
                    </div>
                    <div className="w-12 h-px bg-amber-500/20 mb-2"></div>
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-amber-500/40">Magic Card</span>
                  </div>
                  
                  {/* Back (Face up) */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border-2 border-amber-500/50 bg-gradient-to-br from-amber-900/40 to-stone-900 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay"></div>
                    <div className="relative z-10 text-center">
                      <Coins className={`h-12 w-12 mx-auto mb-4 ${val > baseAmount ? 'text-amber-400 animate-bounce' : 'text-amber-500/70'}`} />
                      <p className="text-[10px] uppercase tracking-widest text-amber-200/50 mb-1">Nhận ngay</p>
                      <p className={`text-3xl font-black ${val > baseAmount ? 'text-amber-400 text-shadow-glow' : 'text-stone-100'}`}>
                        +{val}
                      </p>
                      <p className="text-[8px] uppercase tracking-widest text-amber-500/60 mt-2 font-bold whitespace-nowrap">Tiền bạc</p>
                    </div>
                    {val >= baseAmount * 2 && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-amber-400 text-stone-950 border-none text-[8px] font-black">SUPER</Badge>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

export default function Game() {
  const [, setLocation] = useLocation();
  const [canPlay, setCanPlay] = useState(false);
  const {
    gameState,
    playerName,
    selectedCharacter,
    stats,
    currentRound,
    history,
    lastFeedback,
    scenarios,
    characters,
    register,
    selectCharacter,
    makeChoice,
    startPlaying,
    addMoney,
    resetGame,
    changeIdentity,
  } = useGameLogic();

  const [bonusNotice, setBonusNotice] = useState<{ amount: number; id: number } | null>(null);

  // Integrated Quiz Logic
  const {
    quizState,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    score,
    startQuiz,
    submitAnswer,
    resetQuiz,
    questions: quizQuestions,
    isChecking,
    lastSelected,
    waitingForBonus,
    completeBonus
  } = useQuizLogic(selectedCharacter?.id, (amount) => {
    addMoney(amount);
    setBonusNotice({ amount, id: Date.now() });
    setTimeout(() => setBonusNotice(null), 1500);
  });

  const [showLeaderboard, setShowLeaderboard] = useState(false);

  useEffect(() => {
    if (!hasCompletedTheory()) {
      setLocation("/");
      return;
    }

    setCanPlay(true);
  }, [setLocation]);

  // Auto-start quiz when game state becomes 'quiz'
  useEffect(() => {
    if (gameState === "quiz" && quizState === "intro") {
      startQuiz();
    }
  }, [gameState, quizState, startQuiz]);

  if (!canPlay) {
    return null;
  }

  const profile = getCharacterProfile(selectedCharacter);
  const completedRounds = history.length;
  const progressValue = (completedRounds / scenarios.length) * 100;
  const activeScenario = scenarios[currentRound];

  return (
    <div className="game-shell">
      <div className="game-backdrop" />
      <div className="game-grid-overlay" />
      <div className="game-noise" />

      <div className="container relative z-10 py-6 md:py-8">
        <motion.header
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          className="game-panel game-panel-glow mb-6 overflow-hidden"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="game-badge">Hồ sơ vận động lịch sử</Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation("/")}
                  className="border-amber-300/20 bg-white/5 text-amber-50 hover:bg-white/10"
                >
                  <Home className="h-4 w-4" />
                  Trang chủ
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setLocation("/ly-thuyet")}
                  className="border-amber-300/20 bg-white/5 text-amber-50 hover:bg-white/10"
                >
                  <BookOpen className="h-4 w-4" />
                  Xem lại lý thuyết
                </Button>
              </div>
              <div className="space-y-2">
                <h1 className="game-title">Đời sống quyết định ý thức</h1>
                <p className="max-w-2xl text-sm leading-7 text-stone-300 md:text-base">
                  Chọn một nhân vật, đi qua các biến cố quen thuộc của đời sống
                  và quan sát cách điều kiện vật chất từng bước nhào nặn tư duy,
                  niềm tin cùng hệ giá trị của họ.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              <div className="game-chip">
                <span className="game-chip-label">Hệ quy chiếu</span>
                <span className="game-chip-value">Triết học Mác - Lênin</span>
              </div>
              <div className="game-chip">
                <span className="game-chip-label">Trạng thái</span>
                <span className="game-chip-value">
                  {gameState === "registration" && "Khai báo"}
                  {gameState === "character-select" && "Chọn hồ sơ"}
                  {gameState === "quiz" && "Kiểm tra kiến thức"}
                  {gameState === "playing" && "Đang vận hành"}
                  {gameState === "ended" && "Tổng kết"}
                </span>
              </div>
              <div className="game-chip">
                <span className="game-chip-label">Tiến độ</span>
                <span className="game-chip-value">
                  {gameState === "quiz" ? `${currentQuestionIndex + 1}/${totalQuestions} câu` : `${completedRounds}/${scenarios.length} chương`}
                </span>
              </div>
            </div>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          {gameState === "registration" && (
            <motion.div
              key="registration"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex min-h-[50vh] flex-col items-center justify-center space-y-8 py-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                  <Users className="h-8 w-8" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-stone-50 md:text-4xl">
                  Xác minh Danh tính
                </h2>
                <p className="max-w-md mx-auto text-sm leading-7 text-stone-400">
                  Chào mừng bạn đến với hệ thống mô phỏng vận động lịch sử. Hãy nhập bí danh của bạn để bắt đầu xây dựng hồ sơ tư tưởng.
                </p>
              </div>

              <div className="w-full max-w-md">
                <div className="game-panel game-panel-glow p-8">
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get("playerName") as string;
                      if (name.trim()) register(name);
                    }}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <label htmlFor="playerName" className="text-xs font-bold uppercase tracking-[0.3em] text-amber-200/50">
                        Bí danh Nhà tư tưởng
                      </label>
                      <input
                        id="playerName"
                        name="playerName"
                        type="text"
                        required
                        autoFocus
                        maxLength={20}
                        placeholder="Nhập tên của bạn..."
                        className="w-full rounded-xl border border-stone-800 bg-stone-900/50 p-4 text-stone-100 placeholder:text-stone-700 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all font-sans"
                      />
                    </div>
                    <Button type="submit" size="lg" className="game-cta w-full bg-amber-500 hover:bg-amber-600">
                      Bắt đầu hành trình <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </div>
                <p className="mt-8 text-center text-[10px] uppercase tracking-[0.4em] text-stone-600">
                  Tiến trình sẽ được lưu cục bộ trên trình duyệt
                </p>
              </div>
            </motion.div>
          )}

          {gameState === "character-select" && (
            <motion.section
              key="character-select"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              className="space-y-6"
            >
              <div className="game-panel">
                <SectionTitle
                  eyebrow="Roster Select"
                  title="Chọn nhân vật để bắt đầu mô phỏng"
                  description="Mỗi hồ sơ khởi đầu ở một vị trí xã hội khác nhau. Chính điểm xuất phát vật chất đó sẽ ảnh hưởng đến cách nhân vật tiếp nhận các biến động kế tiếp."
                />
              </div>

              <div className="grid gap-5 lg:grid-cols-3">
                {characters.map((character, index) => {
                  const summary = getCharacterProfile(character);

                  return (
                    <motion.button
                      key={character.id}
                      type="button"
                      whileHover={{ y: -6 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => selectCharacter(character.id)}
                      className="game-character-card text-left"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                            Hồ sơ 0{index + 1}
                          </p>
                          <h3 className="mt-2 text-2xl font-semibold text-stone-50">
                            {character.name}
                          </h3>
                        </div>
                        <Badge className="game-badge">{summary.codename}</Badge>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-stone-300">
                        {character.description}
                      </p>

                      <div className="game-divider" />

                      <div className="space-y-3">
                        <StatRow label="Vai trò" value={summary.role} />
                        <StatRow label="Phẩm chất" value={summary.trait} />
                        <StatRow
                          label="Khởi điểm vật chất"
                          value={`${character.initialStats.money} điểm`}
                        />
                        <StatRow
                          label="Hệ giá trị"
                          value={character.initialStats.belief}
                        />
                      </div>

                      <div className="mt-6 flex items-center justify-between text-sm text-amber-100">
                        <span>Chọn nhân vật</span>
                        <span className="tracking-[0.3em]">ENTER</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.section>
          )}

          {(gameState === "quiz" || gameState === "playing") && selectedCharacter && stats && (
            <motion.section
              key="game-active"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]"
            >
              {/* SIDEBAR: Constant across both Quiz and Playing */}
              <aside className="space-y-6">
                {/* Identity Card */}
                <div className="game-panel game-panel-glow border-amber-500/20 bg-amber-500/5">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.3em] text-amber-500/60 font-bold">
                          Nhà tư tưởng
                        </p>
                        <h3 className="text-base font-bold text-stone-100">
                          {playerName}
                        </h3>
                      </div>
                    </div>
                    <Button 
                      onClick={changeIdentity}
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-stone-600 hover:text-amber-500 hover:bg-amber-500/10"
                      title="Thay đổi danh tính"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="game-panel">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                        Nhân vật kích hoạt
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-stone-50">
                        {selectedCharacter.name}
                      </h2>
                    </div>
                    <Badge className="game-badge">{profile.codename}</Badge>
                  </div>

                  <div className="mt-5 space-y-3">
                    <StatRow label="Vị trí xã hội" value={profile.role} />
                    <StatRow label="Tính cách nền" value={profile.trait} />
                    <StatRow
                      label="Môi trường gốc"
                      value="Nông thôn, thiếu thốn"
                    />
                  </div>
                </div>

                <div className="game-panel">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                        {gameState === "quiz" ? "Kiểm tra kiến thức" : "Tiến trình lịch sử"}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-stone-50">
                        {gameState === "quiz" 
                          ? `Câu ${currentQuestionIndex + 1}/${totalQuestions}`
                          : `Chương ${currentRound + 1}/${scenarios.length}`}
                      </p>
                    </div>
                    <span className="text-sm text-amber-100/80">
                      {gameState === "quiz"
                        ? Math.round(((currentQuestionIndex + (quizState === 'results' ? 1 : 0)) / totalQuestions) * 100)
                        : Math.round(progressValue)}%
                    </span>
                  </div>
                  <Progress
                    value={gameState === "quiz" 
                      ? ((currentQuestionIndex + (quizState === 'results' ? 1 : 0)) / totalQuestions) * 100 
                      : progressValue}
                    className="mt-4 h-2.5 bg-white/10"
                  />
                </div>

                <div className="game-panel space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70 mb-4">
                      Tồn tại xã hội
                    </p>
                    <div className="space-y-3">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm text-stone-200 uppercase tracking-widest text-[10px]">
                          <span className="opacity-70">Tiền bạc</span>
                          <span className="font-bold">
                            {stats.money}
                          </span>
                        </div>
                        <Progress
                          value={getMoneyProgress(stats.money)}
                          className="h-1.5 bg-white/10"
                        />
                      </div>
                      <StatRow
                        label="Điểm số"
                        value={`${score}/${totalQuestions}đ`}
                        icon={<GraduationCap className="h-3 w-3" />}
                      />
                      <StatRow label="Môi trường" value={stats.env} />
                      <StatRow label="Quan hệ" value={stats.rel} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70 mb-4">
                      Ý thức xã hội
                    </p>
                    <div className="space-y-3">
                      <StatRow label="Tư duy" value={stats.mind} />
                      <StatRow label="Niềm tin" value={stats.belief} />
                    </div>
                  </div>
                </div>
              </aside>

              {/* MAIN CONTENT AREA */}
              <div className="space-y-6">
                {gameState === "quiz" ? (
                  <div className="space-y-6">
                    {quizState === "questions" && (
                      <div className="space-y-6">
                        <div className="game-panel game-panel-glow">
                          <div className="flex items-center justify-between mb-4">
                            <Badge className="game-badge">Kiểm tra kiến thức</Badge>
                            <span className="text-xs uppercase tracking-widest text-amber-200/50">Phần kiểm tra tư duy</span>
                          </div>
                          
                          {currentQuestion.context && (
                            <div className="mb-6 rounded-xl bg-amber-500/5 p-5 border border-amber-500/10">
                              <p className="text-sm italic leading-relaxed text-amber-100/80">
                                <span className="mr-2 not-italic font-bold tracking-wider text-amber-500/60 uppercase text-[10px]">Bối cảnh lịch sử</span>
                                {currentQuestion.context}
                              </p>
                            </div>
                          )}
                          
                          <h3 className="text-xl font-semibold leading-relaxed text-stone-100 md:text-2xl flex items-center justify-between gap-3">
                            <span>{currentQuestion.question}</span>
                            {currentQuestion.bonusMoney && (
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse whitespace-nowrap">
                                <Sparkles className="h-3 w-3 mr-1" />
                                Bonus May Mắn
                              </Badge>
                            )}
                          </h3>
                        </div>

                        {/* Bonus Card Selection Overlay */}
                        <AnimatePresence>
                          {waitingForBonus && (
                            <BonusCardSelection 
                              baseAmount={currentQuestion.bonusMoney || 0}
                              onSelect={(finalAmount) => {
                                addMoney(finalAmount);
                                setBonusNotice({ amount: finalAmount, id: Date.now() });
                                setTimeout(() => setBonusNotice(null), 1500);
                                completeBonus();
                              }}
                            />
                          )}
                        </AnimatePresence>

                        {/* Floating Bonus Notification */}
                        <AnimatePresence>
                          {bonusNotice && (
                            <motion.div
                              key={bonusNotice.id}
                              initial={{ opacity: 0, y: 20, scale: 0.5 }}
                              animate={{ opacity: 1, y: -40, scale: 1.2 }}
                              exit={{ opacity: 0, scale: 1.5 }}
                              className="fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 bg-amber-500 text-stone-950 px-4 py-2 rounded-full font-black text-lg shadow-[0_0_20px_rgba(245,158,11,0.5)]"
                            >
                              <Coins className="h-5 w-5" />
                              +{bonusNotice.amount} TIỀN BẠC!
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="grid gap-4">
                          {currentQuestion.options.map((option, index) => {
                            const isSelected = lastSelected === index;
                            const isCorrect = index === currentQuestion.correctAnswerIndex;
                            let statusClass = "";
                            
                            if (isChecking && isSelected) {
                              statusClass = isCorrect 
                                ? "bg-green-600/40 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.3)]" 
                                : "bg-red-600/40 border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
                            }

                            return (
                              <motion.div
                                key={index}
                                whileHover={!isChecking ? { x: 6 } : {}}
                                whileTap={!isChecking ? { scale: 0.99 } : {}}
                              >
                                <Button
                                  onClick={() => submitAnswer(index)}
                                  disabled={isChecking}
                                  className={`game-choice h-auto py-5 transition-all duration-300 ${statusClass} ${isChecking && !isSelected ? "opacity-50" : ""}`}
                                >
                                  <span className="game-choice-index">
                                    0{index + 1}
                                  </span>
                                  <span className="flex-1 text-left text-base">
                                    {option}
                                  </span>
                                  {isChecking && isSelected && (
                                    <span className="ml-2">
                                      {isCorrect ? (
                                        <CheckCircle2 className="h-5 w-5 text-green-400 animate-in zoom-in duration-300" />
                                      ) : (
                                        <XCircle className="h-5 w-5 text-red-400 animate-in zoom-in duration-300" />
                                      )}
                                    </span>
                                  )}
                                </Button>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {quizState === "results" && (
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                      >
                        <div className="rpg-result-card relative overflow-hidden">
                          {/* Background Glows */}
                          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] -mr-32 -mt-32" />
                          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 blur-[100px] -ml-32 -mb-32" />

                          <div className="relative grid gap-8 lg:grid-cols-[0.8fr_1fr]">
                            {/* LEFT: RANK & SCORE */}
                            <div className="flex flex-col items-center justify-center border-b border-white/5 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8">
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                                className={`rank-display mb-2 ${(() => {
                                  const percent = (score / totalQuestions) * 100;
                                  if (percent >= 100) return "rank-s";
                                  if (percent >= 80) return "rank-a";
                                  if (percent >= 60) return "rank-b";
                                  if (percent >= 40) return "rank-c";
                                  return "rank-d";
                                })()}`}
                              >
                                {(() => {
                                  const percent = (score / totalQuestions) * 100;
                                  if (percent >= 100) return "S";
                                  if (percent >= 80) return "A";
                                  if (percent >= 60) return "B";
                                  if (percent >= 40) return "C";
                                  return "D";
                                })()}
                              </motion.div>
                              
                              <div className="text-center">
                                <p className="text-[10px] uppercase tracking-[0.4em] text-amber-200/50 mb-1">Xếp hạng tiềm năng</p>
                                <h2 className="text-2xl font-black text-stone-50 uppercase tracking-widest">
                                  {score === totalQuestions ? "Huyền thoại" : score >= totalQuestions/2 ? "Ưu tú" : "Cần rèn luyện"}
                                </h2>
                                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 border border-white/10">
                                  <span className="text-xl font-bold text-amber-400">{score}</span>
                                  <span className="text-stone-500">/</span>
                                  <span className="text-stone-400 font-medium">{totalQuestions}đ</span>
                                </div>
                              </div>
                            </div>

                            {/* RIGHT: REWARDS & ACTION */}
                            <div className="flex flex-col justify-center space-y-6">
                              <div>
                                <h3 className="text-sm uppercase tracking-[0.2em] text-stone-400 font-bold mb-4 flex items-center gap-2">
                                  <Trophy className="h-4 w-4 text-amber-500" />
                                  Tài sản nhận được
                                </h3>
                                <div className="grid gap-3">
                                  <motion.div 
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="reward-pill reward-pill-gold reward-pill-active"
                                  >
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                                      <Coins className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-[10px] uppercase tracking-widest opacity-60">Thưởng Tiềm lực</p>
                                      <p className="text-lg font-black tracking-tight">+{score * 10} Tiền bạc</p>
                                    </div>
                                    <Sparkles className="h-5 w-5 animate-pulse text-amber-300" />
                                  </motion.div>

                                  <motion.div 
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="reward-pill bg-stone-800/40 border-stone-700/50 text-stone-300"
                                  >
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-stone-700/30 flex items-center justify-center border border-stone-600/30">
                                      <Zap className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-[10px] uppercase tracking-widest opacity-60">Trạng thái Game</p>
                                      <p className="text-sm font-bold">Mở khóa: Thực tại xã hội</p>
                                    </div>
                                  </motion.div>
                                </div>
                              </div>

                              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                                <Button onClick={() => startPlaying(score)} className="game-cta flex-1 group">
                                  Bắt đầu cuộc đời thực tế
                                  <ChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                                <Button onClick={resetQuiz} variant="outline" className="border-white/5 bg-white/5 text-stone-400 hover:bg-white/10 hover:text-stone-200">
                                  <RotateCcw className="mr-2 h-4 w-4" />
                                  Thử lại
                                </Button>
                                <Button 
                                  onClick={() => setShowLeaderboard(true)} 
                                  variant="outline" 
                                  className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                                >
                                  <Trophy className="mr-2 h-4 w-4" />
                                  Xem Bảng Vàng
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* HALL OF LEGENDS MODAL OVERLAY */}
                        <AnimatePresence>
                          {showLeaderboard && (
                            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowLeaderboard(false)}
                                className="absolute inset-0 bg-stone-950/90 backdrop-blur-xl" 
                              />
                              <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="relative w-full max-w-2xl bg-[#1a1a1a] border border-amber-500/20 rounded-[32px] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                              >
                                <div className="p-8 space-y-6">
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                                        <Trophy className="h-7 w-7" />
                                      </div>
                                      <div>
                                        <h3 className="text-2xl font-black text-stone-50 tracking-tight">Hall of Legends</h3>
                                        <p className="text-[10px] text-amber-500/60 uppercase tracking-[0.3em] font-bold">Bảng Vàng Nhà Tư Duy</p>
                                      </div>
                                    </div>
                                    <Button 
                                      onClick={() => setShowLeaderboard(false)}
                                      variant="ghost" 
                                      size="icon" 
                                      className="rounded-full hover:bg-white/5 text-stone-500"
                                    >
                                      <XCircle className="h-7 w-7" />
                                    </Button>
                                  </div>

                                  <div className="bg-stone-900/50 rounded-2xl border border-stone-800 overflow-hidden">
                                    <table className="w-full text-left text-sm">
                                      <thead>
                                        <tr className="border-b border-stone-800 bg-black/20">
                                          <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-stone-500">Hạng</th>
                                          <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-stone-500">Bí danh</th>
                                          <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-stone-500 text-right">Tiềm lực</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {[
                                          { name: "Karl Marx", score: 10, isLegend: true },
                                          { name: "Friedrich Engels", score: 10, isLegend: true },
                                          { name: "V.I. Lenin", score: 9, isLegend: true },
                                          { name: playerName || "Người vô danh", score: score, isPlayer: true },
                                          { name: "Rosa Luxemburg", score: 8, isLegend: true },
                                          { name: "Antonio Gramsci", score: 7, isLegend: true },
                                        ].sort((a,b) => b.score - a.score).map((entry, idx) => (
                                          <tr 
                                            key={entry.name} 
                                            className={`border-b border-stone-800/50 transition-colors ${entry.isPlayer ? 'bg-amber-500/10' : 'hover:bg-white/5'}`}
                                          >
                                            <td className="px-6 py-4">
                                              <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${
                                                idx === 0 ? 'bg-gradient-to-br from-amber-300 to-amber-600 text-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 
                                                idx === 1 ? 'bg-gradient-to-br from-stone-200 to-stone-400 text-stone-900' :
                                                idx === 2 ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-amber-50' :
                                                'bg-stone-800 text-stone-400'
                                              }`}>
                                                {idx + 1}
                                              </span>
                                            </td>
                                            <td className="px-6 py-4">
                                              <div className="flex items-center gap-2">
                                                <span className={`font-bold text-base ${entry.isPlayer ? 'text-amber-400' : 'text-stone-300'}`}>
                                                  {entry.name}
                                                </span>
                                                {entry.isLegend && <Sparkles className="h-3 w-3 text-amber-500/50" />}
                                              </div>
                                            </td>
                                            <td className="px-6 py-4 text-right font-mono font-bold">
                                              <span className={`${
                                                entry.score >= 9 ? 'text-amber-400' :
                                                entry.score >= 7 ? 'text-stone-400' :
                                                'text-red-400'
                                              }`}>
                                                {Math.round((entry.score / 10) * 100)}%
                                              </span>
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>

                                  <div className="pt-2 text-center">
                                    <p className="text-[11px] text-stone-500 italic">
                                      "Tồn tại xã hội quyết định ý thức xã hội" — Karl Marx
                                    </p>
                                  </div>

                                  <div className="flex justify-center pt-4">
                                    <Button 
                                      onClick={() => setShowLeaderboard(false)}
                                      className="game-cta bg-amber-500 hover:bg-amber-600 px-12 h-14 text-base font-black uppercase tracking-widest shadow-[0_0_30px_rgba(245,158,11,0.2)]"
                                    >
                                      Trở về Kết quả
                                    </Button>
                                  </div>
                                </div>
                              </motion.div>
                            </div>
                          )}
                        </AnimatePresence>


                      </motion.div>
                    )}
                  </div>
                ) : (
                  /* PLAYING STATE: Scenario UI */
                  <div className="space-y-6">
                    {activeScenario && (
                      <>
                        <div className="game-panel game-panel-glow">
                          <div className="flex flex-wrap items-center gap-3">
                            <Badge className="game-badge">
                              Tình huống đang xử lý
                            </Badge>
                            <p className="text-xs uppercase tracking-[0.28em] text-amber-200/60">
                              Phase {currentRound + 1}
                            </p>
                          </div>

                          <h2 className="mt-4 text-3xl font-semibold text-stone-50">
                            {activeScenario.title}
                          </h2>
                          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-300">
                            {activeScenario.description}
                          </p>

                          <div className="mt-8 space-y-4">
                            {activeScenario.choices.map((choice, index) => (
                              <motion.div
                                key={`${activeScenario.title}-${index}`}
                                whileHover={{ x: 6 }}
                                whileTap={{ scale: 0.99 }}
                              >
                                <Button
                                  onClick={() => makeChoice(index)}
                                  className="game-choice"
                                >
                                  <span className="game-choice-index">
                                    0{index + 1}
                                  </span>
                                  <span className="flex-1 text-left">
                                    {choice.text}
                                  </span>
                                  <span className="text-xs uppercase tracking-[0.3em] text-amber-100/50">
                                    Chọn
                                  </span>
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                          <div className="game-panel">
                            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                              Nhật ký tác động
                            </p>

                            {history.length === 0 ? (
                              <p className="mt-4 text-sm leading-7 text-stone-400">
                                Chưa có biến động nào được ghi lại. Lựa chọn đầu tiên
                                sẽ mở khóa nhật ký diễn biến của nhân vật.
                              </p>
                            ) : (
                              <div className="mt-4 space-y-3">
                                {history
                                  .slice(-3)
                                  .reverse()
                                  .map((entry, index) => (
                                    <div
                                      key={`${entry.scenario}-${index}`}
                                      className="game-log-entry"
                                    >
                                      <p className="text-xs uppercase tracking-[0.28em] text-amber-200/60">
                                        {entry.scenario}
                                      </p>
                                      <p className="mt-2 text-sm font-medium text-stone-100">
                                        {entry.choice}
                                      </p>
                                      <p className="mt-2 text-sm leading-7 text-stone-300">
                                        {entry.feedback}
                                      </p>
                                    </div>
                                  ))}
                              </div>
                            )}
                          </div>

                          <div className="game-panel">
                            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                              Phản hồi gần nhất
                            </p>
                            <div className="mt-4 min-h-[180px] rounded-[22px] border border-white/10 bg-white/5 p-5">
                              <p className="text-sm leading-8 text-stone-200">
                                {lastFeedback ||
                                  "Hệ thống đang chờ quyết định tiếp theo. Mỗi lựa chọn sẽ cập nhật lại cân bằng giữa tồn tại và ý thức."}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.section>
          )}

          {gameState === "ended" && selectedCharacter && stats && (
            <motion.section
              key="ended"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              className="space-y-6"
            >
              <div className="game-panel game-panel-glow">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="space-y-3">
                    <Badge className="game-badge">Tổng kết hành trình</Badge>
                    <h2 className="text-3xl font-semibold text-stone-50 md:text-4xl">
                      Hồ sơ ý thức của {selectedCharacter.name} đã hoàn thành
                    </h2>
                    <p className="max-w-3xl text-sm leading-8 text-stone-300 md:text-base">
                      {getEndingAnalysis(stats)}
                    </p>
                  </div>

                  <div className="min-w-[220px] rounded-[24px] border border-amber-300/20 bg-black/20 p-5">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                      Mã hồ sơ
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-stone-50">
                      {profile.codename}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-stone-300">
                      {profile.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1.1fr]">
                <div className="game-panel">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                    Tồn tại xã hội cuối cùng
                  </p>
                  <div className="mt-4 space-y-3">
                    <StatRow label="Tiền bạc" value={String(stats.money)} />
                    <StatRow label="Môi trường" value={stats.env} />
                    <StatRow label="Quan hệ" value={stats.rel} />
                  </div>
                </div>

                <div className="game-panel">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                    Ý thức hình thành
                  </p>
                  <div className="mt-4 space-y-3">
                    <StatRow label="Tư duy" value={stats.mind} />
                    <StatRow label="Niềm tin" value={stats.belief} />
                    <StatRow
                      label="Điểm kiến thức"
                      value={`${score}/${totalQuestions}`}
                    />
                    <StatRow
                      label="Số sự kiện"
                      value={`${history.length} lần chọn`}
                    />
                  </div>
                </div>

                <div className="game-panel">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                    Trích đoạn triết học
                  </p>
                  <div className="mt-4 rounded-[22px] border border-amber-300/20 bg-white/5 p-5">
                    <p className="text-base leading-8 text-amber-50">
                      "Không phải ý thức của con người quyết định sự tồn tại của
                      họ, mà ngược lại, chính sự tồn tại xã hội quyết định ý
                      thức của họ."
                    </p>
                    <p className="mt-4 text-xs uppercase tracking-[0.3em] text-amber-200/70">
                      Karl Marx
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="game-panel">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                    Lịch sử lựa chọn
                  </p>
                  <div className="mt-4 space-y-3">
                    {history.map((entry, index) => (
                      <div
                        key={`${entry.scenario}-${index}`}
                        className="game-log-entry"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-medium uppercase tracking-[0.18em] text-amber-100/80">
                            Chương {index + 1}
                          </p>
                          <p className="text-xs uppercase tracking-[0.25em] text-stone-400">
                            {entry.scenario}
                          </p>
                        </div>
                        <p className="mt-3 text-sm font-medium text-stone-100">
                          {entry.choice}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-stone-300">
                          {entry.feedback}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="game-panel space-y-6">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                      Tổng quan tác động
                    </p>
                    <Progress value={100} className="mt-4 h-2.5 bg-white/10" />
                    <p className="mt-4 text-sm leading-7 text-stone-300">
                      Toàn bộ chương đã hoàn thành. Hồ sơ này cho thấy ý thức
                      không hình thành trong chân không, mà được nhào nặn bởi
                      môi trường sống cụ thể.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button onClick={resetGame} size="lg" className="game-cta bg-amber-500 hover:bg-amber-600">
                      Chơi lại từ đầu
                    </Button>
                  </div>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
