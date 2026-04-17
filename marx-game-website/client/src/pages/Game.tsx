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
  Sparkles,
  History,
  ArrowLeft,
  Crown,
  Medal
} from "lucide-react";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useGlobalLeaderboard } from "@/hooks/useGlobalLeaderboard";
import { useLocation } from "wouter";

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="space-y-3">
      <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200/60">
        {eyebrow}
      </p>
      <h2 className="text-2xl font-bold text-stone-50 md:text-3xl">
        {title}
      </h2>
      <p className="text-base leading-relaxed text-stone-400">
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
    role: "Nông dân",
    trait: "Bền bỉ, sống sót cộng đồng",
    icon: <Users className="h-4 w-4" />,
    color: "amber" as const,
  },
  worker: {
    role: "Công nhân",
    trait: "Kỷ luật, đoàn kết giai cấp",
    icon: <Factory className="h-4 w-4" />,
    color: "stone" as const,
  },
  student: {
    role: "Sinh viên",
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
  
  // Use provided baseAmount or a random one (10-20) if it's 0
  const effectiveBase = useMemo(() => {
    if (baseAmount && baseAmount > 0) return baseAmount;
    return 10 + Math.floor(Math.random() * 11); // Random 10 to 20
  }, [baseAmount]);

  // Create 3 potential rewards: [lower, base, double]
  const cardValues = useMemo(() => {
    const values = [
      Math.floor(effectiveBase * 0.5) || 5, // Lower
      effectiveBase,                        // Base
      effectiveBase * 2                     // Double (Super Lucky)
    ];
    // Add a bit of extra randomness
    return [...values].map(v => v + (Math.random() > 0.7 ? 5 : 0)).sort(() => Math.random() - 0.5);
  }, [effectiveBase]);

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
          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-4 px-4 py-1">BIẾN SỐ LỊCH SỬ</Badge>
          <h2 className="text-4xl font-black text-stone-50 tracking-tighter uppercase leading-tight">
            Chọn một <span className="text-amber-500">Cơ hội khách quan</span>
          </h2>
          <p className="text-stone-400 mt-2 text-lg">Vận động của đời sống thực tiễn đang chờ đợi bạn...</p>
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
                      <History className="h-8 w-8 text-amber-500/50" />
                    </div>
                    <div className="w-12 h-px bg-amber-500/20 mb-2"></div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-amber-500/40">Biến số</span>
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
                        <Badge className="bg-amber-400 text-stone-950 border-none text-[8px] font-black">TÍCH LŨY</Badge>
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
    startQuizPhase,
    makeChoice,
    startPlaying,
    addMoney,
    resetGame,
    changeIdentity,
  } = useGameLogic();

  const [bonusNotice, setBonusNotice] = useState<{ amount: number; id: number } | null>(null);

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
    completeBonus,
    showContextIntro,
    continueToQuestion
  } = useQuizLogic(
    selectedCharacter?.id,
    // onBonusEarned: called when correct answer is given
    (amount) => {
      addMoney(amount);
      setBonusNotice({ amount, id: Date.now() });
      setTimeout(() => setBonusNotice(null), 1500);
    },
    // onPenaltyIncurred: called when wrong answer is given on a question with penaltyMoney
    (amount) => {
      addMoney(-amount);
      setBonusNotice({ amount: -amount, id: Date.now() });
      setTimeout(() => setBonusNotice(null), 1500);
    }
  );

  const { entries: leaderboardEntries, submitScore: addScore, loading: loadingLeaderboard } = useGlobalLeaderboard();
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [leaderboardTab, setLeaderboardTab] = useState<"role" | "total">("role");
  const hasSubmittedScoreRef = useRef(false);

  // Reset the submission flag when the user starts over or retry
  useEffect(() => {
    if (quizState === "questions") {
      hasSubmittedScoreRef.current = false;
    }
  }, [quizState]);

  // Note: We used to submit on gameState === "ended" as well, but that caused double-scoring.
  // Now we only submit once when the quiz results screen is reached.

  // Also submit score when quiz finishes, so the leaderboard is fresh in the results screen
  useEffect(() => {
    if (quizState === "results" && playerName && stats && selectedCharacter && !hasSubmittedScoreRef.current) {
      addScore(playerName, selectedCharacter.id, stats.money);
      hasSubmittedScoreRef.current = true;
    }
  }, [quizState, playerName, stats?.money, selectedCharacter, addScore]);

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

  // Dynamic Header Labels
  const systemFrameLabel = 
    gameState === "registration" ? "Hệ quy chiếu" :
    gameState === "character-select" ? "Hồ sơ" :
    selectedCharacter ? "Chủ thể" : "Định danh";

  const systemFrameValue = 
    gameState === "registration" ? "Triết học Mác - Lênin" :
    selectedCharacter ? selectedCharacter.name : "Đang phân tích...";

  const stateLabel = 
    gameState === "registration" ? "Trạng thái" : "Mô phỏng";

  const stateValue = 
    gameState === "registration" ? "Khai báo" :
    gameState === "character-select" ? "Phân tích hồ sơ" :
    gameState === "quiz" ? "Kiểm soát nhận thức" :
    gameState === "playing" ? "Vận động lịch sử" : "Kết thúc vòng lặp";

  const progressLabel = 
    gameState === "quiz" ? "Nhận thức" : "Chương";

  const progressValueText = 
    gameState === "registration" ? "Khởi tạo: 0%" :
    gameState === "character-select" ? "Chọn nguồn gốc" :
    gameState === "quiz" ? `${currentQuestionIndex + 1}/${totalQuestions}` :
    gameState === "playing" ? `${currentRound + 1}: ${activeScenario?.title?.split(':')[0] || activeScenario?.title}` :
    "Hoàn tất";

  return (
    <div className="game-shell">
      <div className="game-backdrop" />
      <div className="game-grid-overlay" />
      <div className="game-noise" />

      <div className="container relative z-10 pt-24 pb-6 md:pt-28 md:pb-8">
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
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Lý luận Nền tảng
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLeaderboard(true)}
                  className="border-amber-500/30 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Bảng xếp hạng
                </Button>

              </div>
              <div className="space-y-2">
                <h1 className="game-title">Đời sống quyết định ý thức</h1>
                <p className="max-w-2xl text-[15px] leading-relaxed text-stone-300 md:text-base">
                  Chọn một nhân vật, đi qua các biến cố quen thuộc của đời sống
                  và quan sát cách điều kiện vật chất từng bước nhào nặn tư duy,
                  niềm tin cùng hệ giá trị của họ.
                </p>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-3 lg:min-w-[500px]">
              <div className="game-chip">
                <span className="game-chip-label">{systemFrameLabel}</span>
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={systemFrameValue}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="block game-chip-value"
                    >
                      {systemFrameValue}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <div className="game-chip">
                <span className="game-chip-label">{stateLabel}</span>
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={stateValue}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="block game-chip-value"
                    >
                      {stateValue}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              <div className="game-chip">
                <span className="game-chip-label">{progressLabel}</span>
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={progressValueText}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.2 }}
                      className="block truncate game-chip-value"
                      title={progressValueText}
                    >
                      {progressValueText}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
          {gameState === "registration" && (
            <motion.div
              key="registration"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="relative flex min-h-[65vh] flex-col items-center justify-center p-4"
            >
              {/* Decorative Background Elements for Intro */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px]" />
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
              </div>

              <div className="relative z-10 w-full max-w-2xl text-center space-y-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6"
                >
                  <motion.div 
                    animate={{ 
                      boxShadow: ["0 0 20px rgba(245,158,11,0.1)", "0 0 40px rgba(245,158,11,0.2)", "0 0 20px rgba(245,158,11,0.1)"],
                      borderColor: ["rgba(245,158,11,0.2)", "rgba(245,158,11,0.4)", "rgba(245,158,11,0.2)"]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="inline-flex h-20 w-20 items-center justify-center rounded-3xl border border-amber-500/20 bg-amber-500/5 text-amber-500 mb-4"
                  >
                    <Users className="h-10 w-10" />
                  </motion.div>
                  
                  <div className="space-y-4">
                    <motion.h2 
                      initial={{ opacity: 0, letterSpacing: "0.2em" }}
                      animate={{ opacity: 1, letterSpacing: "0em" }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="text-4xl md:text-6xl font-black tracking-tight text-white uppercase"
                    >
                      Xác minh <span className="text-amber-500">Chủ thể</span>
                    </motion.h2>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="max-w-lg mx-auto text-stone-400 text-base md:text-lg leading-relaxed font-medium"
                    >
                      Hệ thống đã sẵn sàng để mô phỏng tiến trình vận động lịch sử. 
                      Hãy thiết lập định danh của bạn để bắt đầu.
                    </motion.p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="w-full max-w-md mx-auto"
                >
                  <div className="game-panel p-8 md:p-10 border-amber-500/10 bg-stone-900/40 backdrop-blur-xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-500/50 scale-y-0 group-focus-within:scale-y-100 transition-transform duration-500 origin-top" />
                    
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const name = formData.get("playerName") as string;
                        if (name.trim()) register(name);
                      }}
                      className="space-y-8"
                    >
                      <div className="space-y-4 text-left">
                        <label htmlFor="playerName" className="block text-[10px] font-black uppercase tracking-widest text-amber-500/50 ml-1">
                          Bí danh Hệ thống
                        </label>
                        <div className="relative">
                          <input
                            id="playerName"
                            name="playerName"
                            type="text"
                            required
                            autoFocus
                            maxLength={20}
                            placeholder="Nhập tên của bạn..."
                            className="w-full bg-transparent border-b-2 border-stone-800 py-4 px-1 text-2xl font-bold text-white placeholder:text-stone-700 focus:border-amber-500 focus:outline-none transition-all duration-300"
                          />
                          <div className="absolute bottom-0 left-0 h-0.5 bg-amber-500 w-0 focus-within:w-full transition-all duration-500" />
                        </div>
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="game-cta w-full h-16 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-lg uppercase tracking-widest shadow-[0_10px_30px_rgba(245,158,11,0.2)]"
                      >
                        Khởi chạy Mô phỏng <ChevronRight className="ml-2 h-6 w-6" />
                      </Button>
                    </form>
                  </div>
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-8 flex items-center justify-center gap-4 text-[9px] uppercase tracking-widest text-stone-600 font-bold"
                  >
                    <div className="h-px w-8 bg-stone-800" />
                    Dữ liệu được mã hóa cục bộ
                    <div className="h-px w-8 bg-stone-800" />
                  </motion.div>
                </motion.div>
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
                  eyebrow="Lựa chọn Chủ thể"
                  title="Xác định vị trí xã hội khởi đầu"
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
                          <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200/60">
                            Hồ sơ 0{index + 1}
                          </p>
                          <h3 className="mt-2 text-2xl font-semibold text-stone-50">
                            {character.name}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-4 text-[15px] leading-relaxed text-stone-300">
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

          {gameState === "character-intro" && selectedCharacter && (
            <motion.div
              key="character-intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="relative flex min-h-[70vh] flex-col items-center justify-center py-12"
            >
              <div className="absolute inset-0 max-w-5xl mx-auto opacity-20 pointer-events-none overflow-hidden">
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] ${
                    getCharacterProfile(selectedCharacter).color === 'amber' ? 'bg-amber-600' : 
                    getCharacterProfile(selectedCharacter).color === 'blue' ? 'bg-blue-600' : 'bg-stone-600'
                 }`} />
              </div>

              <div className="w-full max-w-3xl z-10 text-center">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="space-y-6"
                >
                  <div className="inline-flex h-24 w-24 items-center justify-center rounded-2xl border bg-stone-900/80 backdrop-blur-sm border-stone-700/50 text-stone-100 shadow-[0_0_30px_rgba(0,0,0,0.5)] mb-4">
                    <span className="scale-150 opacity-80">{getCharacterProfile(selectedCharacter).icon}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-stone-400 font-bold">Hồ sơ đã chọn</p>
                    <h2 className="text-5xl font-black text-white tracking-tight uppercase">
                      {selectedCharacter.name}
                    </h2>
                  </div>

                  <div className="w-16 h-1 bg-stone-700/50 mx-auto my-8" />

                  <p className="text-xl md:text-2xl leading-relaxed text-stone-300 font-medium italic max-w-2xl mx-auto px-4">
                    "{selectedCharacter.description}"
                  </p>
                  
                  <div className="grid grid-cols-2 max-w-md mx-auto gap-4 mt-8 text-left bg-stone-900/50 backdrop-blur-md p-6 rounded-2xl border border-stone-800/50">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Môi trường gốc</p>
                      <p className="font-semibold text-stone-200">{selectedCharacter.initialStats.env}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-stone-500 mb-1">Tài sản ban đầu</p>
                      <p className="font-semibold text-stone-200">{selectedCharacter.initialStats.money} điểm</p>
                    </div>
                  </div>

                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, duration: 1 }}
                  className="mt-12"
                >
                  <Button 
                    onClick={startQuizPhase}
                    size="lg" 
                    className={`h-14 px-8 text-lg font-bold uppercase tracking-widest transition-all hover:scale-105 shadow-xl ${
                      getCharacterProfile(selectedCharacter).color === 'amber' ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20' : 
                      getCharacterProfile(selectedCharacter).color === 'blue' ? 'bg-blue-600 hover:bg-blue-500 text-stone-50 shadow-blue-500/20' : 
                      'bg-stone-200 hover:bg-stone-100 text-stone-950 shadow-stone-200/20'
                    }`}
                  >
                    Khởi động Cuộc đời <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </div>
            </motion.div>
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
                      <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
                        Nhân vật kích hoạt
                      </p>
                      <h2 className="mt-2 text-2xl font-semibold text-stone-50">
                        {selectedCharacter.name}
                      </h2>
                    </div>
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
                      <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
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
                    <p className="text-[10px] uppercase tracking-widest text-amber-200/70 mb-4">
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
                        label="Số câu đúng"
                        value={`${score}/${totalQuestions}`}
                        icon={<GraduationCap className="h-3 w-3" />}
                      />
                      <StatRow label="Môi trường" value={stats.env} />
                      <StatRow label="Quan hệ" value={stats.rel} />
                    </div>
                  </div>

                  <div className="pt-2">
                    <p className="text-[10px] uppercase tracking-widest text-amber-200/70 mb-4">
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
                      <>
                        {showContextIntro ? (
                          <motion.div 
                            key="context-intro"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-8 bg-stone-900/80 p-8 rounded-3xl border border-amber-500/20 shadow-[0_0_50px_rgba(245,158,11,0.05)] relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 blur-[100px] -mr-32 -mt-32 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 blur-[100px] -ml-32 -mb-32 pointer-events-none" />
                            
                            <BookOpen className="w-12 h-12 text-amber-500/50 mb-2" />
                            
                            <div className="space-y-4 max-w-2xl z-10">
                              <p className="text-sm font-bold tracking-widest text-amber-500/80 uppercase">
                                Bối cảnh
                              </p>
                              <h3 className="text-2xl md:text-3xl italic text-amber-100 leading-relaxed font-semibold">
                                "{currentQuestion.context}"
                              </h3>
                            </div>

                            <Button 
                              onClick={continueToQuestion}
                              size="lg"
                              className="mt-8 bg-amber-500 text-stone-950 hover:bg-amber-400 font-bold uppercase tracking-widest px-8 rounded-xl z-10 shadow-[0_0_20px_rgba(245,158,11,0.2)] transition-all"
                            >
                              Tiếp tục <ChevronRight className="ml-2 w-5 h-5" />
                            </Button>
                          </motion.div>
                        ) : (
                        <div className="space-y-6">
                          <div className="game-panel game-panel-glow">
                            <div className="flex items-center justify-between mb-4">
                              <Badge className="game-badge">Kiểm tra kiến thức</Badge>
                              <span className="text-xs uppercase tracking-widest text-amber-200/50">Phần kiểm tra tư duy</span>
                            </div>
                            
                            <h3 className="text-xl font-semibold leading-relaxed text-stone-100 md:text-2xl flex items-center justify-between gap-3">
                              <span>{currentQuestion.question}</span>
                            {currentQuestion.bonusMoney && (
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 animate-pulse whitespace-nowrap">
                                <History className="h-3 w-3 mr-1" />
                                Cơ hội Lịch sử
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

                        <AnimatePresence>
                          {bonusNotice && (
                            <motion.div
                              key={bonusNotice.id}
                              initial={{ opacity: 0, y: 20, scale: 0.5 }}
                              animate={{ 
                                opacity: 1, 
                                y: -40, 
                                scale: 1.2,
                                x: bonusNotice.amount < 0 ? [0, -10, 10, -10, 10, 0] : 0 
                              }}
                              exit={{ opacity: 0, scale: 1.5 }}
                              className={`fixed left-1/2 -translate-x-1/2 z-50 pointer-events-none flex items-center gap-2 px-4 py-2 rounded-full font-black text-lg shadow-lg ${
                                bonusNotice.amount >= 0 
                                  ? "bg-amber-500 text-stone-950 shadow-amber-500/50" 
                                  : "bg-red-600 text-white shadow-red-500/50"
                              }`}
                            >
                              {bonusNotice.amount >= 0 ? (
                                <>
                                  <Coins className="h-5 w-5" />
                                  +{bonusNotice.amount} TÍCH LŨY VẬT CHẤT!
                                </>
                              ) : (
                                <>
                                  <XCircle className="h-5 w-5" />
                                  {bonusNotice.amount} NGUỒN LỰC BỊ SUY GIẢM!
                                </>
                              )}
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
                  </>
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
                                <h2 className="text-sm uppercase tracking-[0.2em] text-stone-400 font-bold">
                                  Tổng Nguồn lực vật chất
                                </h2>
                                <span className="text-3xl font-black text-amber-400">{stats.money}đ</span>
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
                                      <p className="text-[10px] uppercase tracking-widest opacity-60">Tích lũy Thực tiễn</p>
                                      <p className="text-lg font-black tracking-tight">+{score * 10} Nguồn lực vật chất</p>
                                    </div>
                                    <BookOpen className="h-5 w-5 animate-pulse text-amber-300" />
                                  </motion.div>

                                  <motion.div 
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="reward-pill bg-stone-800/40 border-stone-700/50 text-stone-300"
                                  >
                                    <div className="h-10 w-10 shrink-0 rounded-xl bg-stone-700/30 flex items-center justify-center border border-stone-600/30">
                                      <History className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-[10px] uppercase tracking-widest opacity-60">Trạng thái Thực thể</p>
                                      <p className="text-sm font-bold">Chuyển hóa: Thực tại xã hội</p>
                                    </div>
                                  </motion.div>
                                </div>
                              </div>

                              <div className="pt-4 flex flex-col sm:flex-row gap-3">
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
                                <Button 
                                  onClick={() => {
                                    resetGame();
                                    setLocation("/");
                                  }} 
                                  variant="ghost" 
                                  className="text-stone-500 hover:text-stone-300 hover:bg-white/5"
                                >
                                  <Home className="mr-2 h-4 w-4" />
                                  Về Trang chủ
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
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
                            <p className="text-xs uppercase tracking-widest text-amber-200/60">
                              Giai đoạn {currentRound + 1}
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
                                  <span className="text-xs uppercase tracking-widest text-amber-100/50">
                                    Chọn
                                  </span>
                                </Button>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                          <div className="game-panel">
                            <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
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
                                      <p className="text-xs uppercase tracking-widest text-amber-200/60">
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
                            <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
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
                    <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
                      Vai trò hoàn thành
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-stone-50">
                      {profile.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1.1fr]">
                <div className="game-panel">
                  <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
                    Tồn tại xã hội cuối cùng
                  </p>
                  <div className="mt-4 space-y-3">
                    <StatRow label="Nguồn lực vật chất" value={`${stats.money}đ`} />
                    <StatRow label="Môi trường" value={stats.env} />
                    <StatRow label="Quan hệ" value={stats.rel} />
                  </div>
                </div>

                <div className="game-panel">
                  <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
                    Ý thức hình thành
                  </p>
                  <div className="mt-4 space-y-3">
                    <StatRow label="Tư duy" value={stats.mind} />
                    <StatRow label="Niềm tin" value={stats.belief} />
                    <StatRow
                      label="Sự tham gia"
                      value={`${history.length} lần chọn`}
                    />
                  </div>
                </div>

                <div className="game-panel">
                  <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
                    Trích đoạn triết học
                  </p>
                  <div className="mt-4 rounded-[22px] border border-amber-300/20 bg-white/5 p-5">
                    <p className="text-base leading-8 text-amber-50">
                      "Không phải ý thức của con người quyết định sự tồn tại của
                      họ, mà ngược lại, chính sự tồn tại xã hội quyết định ý
                      thức của họ."
                    </p>
                    <p className="text-xs uppercase tracking-wider text-amber-200/70 mt-4 font-semibold">
                      Karl Marx
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                <div className="game-panel">
                  <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
                    Lịch sử lựa chọn
                  </p>
                  <div className="mt-4 space-y-3">
                    {history.map((entry, index) => (
                      <div
                        key={`${entry.scenario}-${index}`}
                        className="game-log-entry"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-sm font-medium uppercase tracking-widest text-amber-100/80">
                            Chương {index + 1}
                          </p>
                          <p className="text-xs uppercase tracking-widest text-stone-400">
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
                    <p className="text-[10px] uppercase tracking-widest text-amber-200/70">
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

        {/* HALL OF LEGENDS MODAL OVERLAY - GLOBALLY ACCESSIBLE */}
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
                        <h3 className="text-2xl font-black text-stone-50 tracking-tight">Vinh danh Chủ thể Lịch sử</h3>
                        <p className="text-[10px] text-amber-500/60 uppercase tracking-[0.3em] font-bold">Bảng Vàng Học thuật</p>
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

                    <div className="flex gap-2 mb-6">
                      <button
                        onClick={() => setLeaderboardTab("role")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                          leaderboardTab === "role"
                            ? "bg-amber-500/20 border border-amber-400/40 text-amber-200"
                            : "bg-white/5 border border-white/10 text-stone-400 hover:bg-white/10"
                        }`}
                      >
                        {selectedCharacter?.id === "farmer" && <Factory className="h-3.5 w-3.5" />}
                        {selectedCharacter?.id === "worker" && <Users className="h-3.5 w-3.5" />}
                        {selectedCharacter?.id === "student" && <GraduationCap className="h-3.5 w-3.5" />}
                        {selectedCharacter?.name || "Vai trò"}
                      </button>
                      <button
                        onClick={() => setLeaderboardTab("total")}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all duration-200 ${
                          leaderboardTab === "total"
                            ? "bg-amber-500/20 border border-amber-400/40 text-amber-200"
                            : "bg-white/5 border border-white/10 text-stone-400 hover:bg-white/10"
                        }`}
                      >
                        <Crown className="h-3.5 w-3.5" />
                        Tổng 3 Role
                      </button>
                    </div>

                    <div className="bg-stone-900/50 rounded-2xl border border-stone-800 overflow-hidden min-h-[400px] flex flex-col">
                      {loadingLeaderboard ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-stone-500">
                          <div className="h-10 w-10 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
                          <p className="text-xs font-bold uppercase tracking-widest animate-pulse">Đang tải bảng vàng...</p>
                        </div>
                      ) : (() => {
                          const roleKey = selectedCharacter?.id as "farmer" | "worker" | "student" | undefined;
                          const sorted = leaderboardTab === "role" && roleKey
                            ? [...leaderboardEntries]
                                .filter(e => e[roleKey] > 0)
                                .sort((a, b) => b[roleKey] - a[roleKey])
                                .slice(0, 10)
                            : [...leaderboardEntries]
                                .filter(e => e.total > 0)
                                .sort((a, b) => b.total - a.total)
                                .slice(0, 10);

                          if (sorted.length === 0) {
                            return (
                              <div className="flex-1 flex items-center justify-center p-8">
                                <p className="text-sm text-stone-500 text-center">Chưa có ai lên bảng xếp hạng này.</p>
                              </div>
                            );
                          }

                          return (
                            <table className="w-full text-left text-sm">
                              <thead>
                                <tr className="border-b border-stone-800 bg-black/20">
                                  <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-stone-500">Vị thế</th>
                                  <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-stone-500">Định danh Chủ thể</th>
                                  <th className="px-6 py-4 font-bold uppercase tracking-widest text-[10px] text-stone-500 text-right">
                                    {leaderboardTab === "role" ? "Nguồn lực (đ)" : "Tổng 3 Role (đ)"}
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {sorted.map((entry, idx) => {
                                  const displayScore = leaderboardTab === "role" && roleKey ? entry[roleKey] : entry.total;
                                  return (
                                    <tr 
                                      key={`${entry.name}-${idx}`} 
                                      className={`border-b border-stone-800/50 transition-colors ${entry.name === playerName ? 'bg-amber-500/10' : 'hover:bg-white/5'}`}
                                    >
                                      <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                          <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-black ${
                                            idx === 0 ? 'bg-amber-500 text-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]' :
                                            idx === 1 ? 'bg-stone-300 text-stone-900 shadow-[0_0_10px_rgba(255,255,255,0.3)]' :
                                            idx === 2 ? 'bg-orange-700 text-orange-50 shadow-[0_0_10px_rgba(194,65,12,0.3)]' :
                                            'bg-stone-800 text-stone-400 border border-stone-700'
                                          }`}>
                                            {idx === 0 ? <Crown className="h-4 w-4" /> : 
                                            idx === 1 || idx === 2 ? <Medal className="h-4 w-4" /> : 
                                            idx + 1}
                                          </span>
                                        </div>
                                      </td>
                                      <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                          <div className="flex items-center gap-2">
                                            <span className={`font-bold text-base ${entry.name === playerName ? 'text-amber-400' : 'text-stone-300'}`}>
                                              {entry.name}
                                            </span>
                                            {entry.name === playerName && <Badge className="bg-amber-500/20 text-amber-500 text-[8px] h-4 py-0 border-amber-500/30">Bạn</Badge>}
                                          </div>
                                          
                                          {/* Breakdown for total tab */}
                                          {leaderboardTab === "total" && (
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-stone-500 mt-0.5">
                                              <div className="flex items-center gap-1">
                                                <span className={entry.farmer > 0 ? "text-amber-500/70" : "text-stone-700 font-normal"}>🌾 {entry.farmer}</span>
                                              </div>
                                              <div className="flex items-center gap-1">
                                                <span className={entry.worker > 0 ? "text-blue-400/70" : "text-stone-700 font-normal"}>🛠️ {entry.worker}</span>
                                              </div>
                                              <div className="flex items-center gap-1">
                                                <span className={entry.student > 0 ? "text-emerald-400/70" : "text-stone-700 font-normal"}>🎓 {entry.student}</span>
                                              </div>
                                            </div>
                                          )}
                                        </div>
                                      </td>
                                      <td className="px-6 py-4 text-right">
                                        <span className={`font-mono text-lg font-black ${
                                          displayScore >= 100 ? 'text-amber-400' :
                                          displayScore >= 50 ? 'text-stone-300' :
                                          'text-stone-500'
                                        }`}>
                                          {displayScore.toLocaleString()}đ
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          );
                       })()}
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
                      Đóng
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
