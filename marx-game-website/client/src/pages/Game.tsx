import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  useGameLogic,
  type Character,
  type GameStats,
} from "@/hooks/useGameLogic";
import { hasCompletedTheory } from "@/lib/theoryAccess";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Home } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const characterProfiles: Record<
  string,
  {
    codename: string;
    role: string;
    trait: string;
  }
> = {
  farmer: {
    codename: "HS-01",
    role: "Tuyến nông thôn",
    trait: "Bền bỉ, sống sát cộng đồng",
  },
  worker: {
    codename: "CN-02",
    role: "Tuyến công xưởng máy",
    trait: "Nhanh nhạy, nhạy cảm với bất công",
  },
  student: {
    codename: "SV-03",
    role: "Tuyến trí thức trẻ",
    trait: "Hiếu kỳ, dễ chuyển biến nhận thức",
  },
};

function getCharacterProfile(character?: Character | null) {
  if (!character) {
    return {
      codename: "----",
      role: "Chưa xác lập",
      trait: "Đang chờ lựa chọn nhân vật",
    };
  }

  return (
    characterProfiles[character.id] ?? {
      codename: "HS-00",
      role: "Nhân vật xuất phát",
      trait: "Thích nghi với biến động xã hội",
    }
  );
}

function getMoneyProgress(value: number) {
  return Math.max(5, Math.min(100, value));
}

function getEndingAnalysis(stats: GameStats) {
  if (stats.belief.toLowerCase().includes("công bằng")) {
    return "Bạn trải nghiệm bất công và từ đó hình thành ý thức hướng về hành động tập thể, coi sự đoàn kết là con đường thay đổi thực tại.";
  }

  if (stats.belief.toLowerCase().includes("truyền thống")) {
    return "Môi trường ổn định và các mối liên hệ gần gũi giữ cho ý thức của bạn nghiêng về giá trị quen thuộc, ưu tiên sự bền vững hơn biến động.";
  }

  if (stats.belief.toLowerCase().includes("khoa học")) {
    return "Điều kiện sống gắn với công nghệ và tri thức đẩy ý thức của bạn về phía tiến bộ, xem công cụ mới là động lực cải biến đời sống xã hội.";
  }

  return "Hành trình của bạn cho thấy mọi thay đổi về điều kiện vật chất đều để lại dấu vết lên cách nghĩ, cách tin và cách bạn định vị mình trong xã hội.";
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="game-stat-row">
      <span className="game-stat-label">{label}</span>
      <span className="game-stat-value">{value}</span>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <span className="game-led" />
        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
          {eyebrow}
        </p>
      </div>
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold text-stone-50 md:text-3xl">
          {title}
        </h2>
        <p className="max-w-2xl text-sm leading-7 text-stone-300">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Game() {
  const [, setLocation] = useLocation();
  const [canPlay, setCanPlay] = useState(false);
  const {
    gameState,
    selectedCharacter,
    stats,
    currentRound,
    history,
    lastFeedback,
    scenarios,
    characters,
    selectCharacter,
    makeChoice,
    resetGame,
  } = useGameLogic();

  useEffect(() => {
    if (!hasCompletedTheory()) {
      setLocation("/");
      return;
    }

    setCanPlay(true);
  }, [setLocation]);

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
                  onClick={() => setLocation("/")}
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
                  {gameState === "character-select" && "Chọn hồ sơ"}
                  {gameState === "playing" && "Đang vận hành"}
                  {gameState === "ended" && "Tổng kết"}
                </span>
              </div>
              <div className="game-chip">
                <span className="game-chip-label">Tiến độ</span>
                <span className="game-chip-value">
                  {completedRounds}/{scenarios.length} chương
                </span>
              </div>
            </div>
          </div>
        </motion.header>

        <AnimatePresence mode="wait">
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

          {gameState === "playing" &&
            selectedCharacter &&
            stats &&
            activeScenario && (
              <motion.section
                key="playing"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]"
              >
                <aside className="space-y-6">
                  <div className="game-panel game-panel-glow">
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
                        value={selectedCharacter.initialStats.env}
                      />
                    </div>
                  </div>

                  <div className="game-panel">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                          Tiến trình lịch sử
                        </p>
                        <p className="mt-2 text-lg font-semibold text-stone-50">
                          Chương {currentRound + 1}/{scenarios.length}
                        </p>
                      </div>
                      <span className="text-sm text-amber-100/80">
                        {Math.round(progressValue)}%
                      </span>
                    </div>
                    <Progress
                      value={progressValue}
                      className="mt-4 h-2.5 bg-white/10"
                    />
                  </div>

                  <div className="game-panel space-y-5">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                        Tồn tại xã hội
                      </p>
                      <div className="mt-4 space-y-3">
                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm text-stone-200">
                            <span>Tiền bạc</span>
                            <span>{stats.money}</span>
                          </div>
                          <Progress
                            value={getMoneyProgress(stats.money)}
                            className="h-2.5 bg-white/10"
                          />
                        </div>
                        <StatRow label="Môi trường" value={stats.env} />
                        <StatRow label="Quan hệ" value={stats.rel} />
                      </div>
                    </div>

                    <div className="game-divider" />

                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] text-amber-200/70">
                        Ý thức xã hội
                      </p>
                      <div className="mt-4 space-y-3">
                        <StatRow label="Tư duy" value={stats.mind} />
                        <StatRow label="Niềm tin" value={stats.belief} />
                      </div>
                    </div>
                  </div>
                </aside>

                <div className="space-y-6">
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

                  <Button onClick={resetGame} size="lg" className="game-cta">
                    Chơi lại từ đầu
                  </Button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
