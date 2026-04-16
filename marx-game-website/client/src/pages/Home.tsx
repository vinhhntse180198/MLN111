import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Factory,
  Landmark,
  Users,
  Repeat,
  Layers,
  Play,
  GraduationCap,
  History
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const coreIdeas = [
  {
    icon: Factory,
    title: "Tồn tại xã hội",
    body: "Điều kiện sống, lao động, thu nhập và môi trường vật chất tạo ra nền của đời sống con người.",
  },
  {
    icon: BookOpen,
    title: "Ý thức xã hội",
    body: "Cách nghĩ, niềm tin và hệ giá trị không đứng riêng lẻ mà luôn chịu tác động từ hoàn cảnh sống.",
  },
  {
    icon: Users,
    title: "Quan hệ con người",
    body: "Gia đình, đồng nghiệp và cộng đồng là nơi những tác động vật chất trở thành trải nghiệm xã hội cụ thể.",
  },
];

const presentationOutline = [
  "Điều kiện vật chất tạo nên giới hạn và cơ hội trong đời sống.",
  "Trải nghiệm sống lặp lại dần hình thành cách nhìn nhận thế giới.",
  "Khi hoàn cảnh thay đổi, ý thức cũng có thể vận động và biến đổi theo.",
];

const basicElements = [
  {
    title: "Điều kiện tự nhiên",
    description: "Hoàn cảnh địa lý, khí hậu, tài nguyên thiên nhiên",
  },
  {
    title: "Điều kiện dân số",
    description: "Quy mô, cấu thành, mật độ dân cư của xã hội",
  },
  {
    title: "Phương thức sản xuất",
    description: "Cách thức con người sản xuất vật chất để tồn tại",
  },
];

const relationshipAspects = [
  {
    icon: Factory,
    title: "TTXH quyết định YTXH",
    points: [
      "Ý thức xã hội phản ánh tồn tại xã hội",
      "TTXH thay đổi → YTXH cũng thay đổi",
      "(Đặc biệt: phương thức sản xuất)",
    ],
  },
  {
    icon: Layers,
    title: "YTXH có tính độc lập tương đối",
    points: [
      "Không phụ thuộc hoàn toàn vào TTXH",
      "Có thể lạc hậu hoặc vượt trước TTXH",
      "Kế thừa các yếu tố cũ từ quá khứ",
    ],
  },
  {
    icon: Repeat,
    title: "YTXH tác động trở lại TTXH",
    points: [
      "✅ Thúc đẩy: khi phù hợp xu hướng phát triển",
      "❌ Kìm hãm: khi không phù hợp",
      "Tạo thành mối quan hệ biện chứng",
    ],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Home() {
  const [, setLocation] = useLocation();
  const [isGameInProgress, setIsGameInProgress] = useState(false);

  useEffect(() => {
    // Check if there's an active game session
    const gameState = localStorage.getItem("gameState");
    const selectedCharacter = localStorage.getItem("selectedCharacter");
    setIsGameInProgress(!!gameState && !!selectedCharacter);
  }, []);

  return (
    <div
      className="game-shell relative scroll-smooth"
    >
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
              onClick={() => setLocation("/game")}
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
        className="relative z-10 pt-0"
        style={isGameInProgress ? { paddingTop: "80px" } : {}}
      >
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen px-6 pt-24 pb-8 md:px-8 md:pt-28 md:pb-12 flex items-center"
        >
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid min-h-full gap-6 lg:grid-cols-[1.15fr_0.85fr]"
            >
              <motion.div
                variants={itemVariants}
                className="game-panel game-panel-glow flex flex-col justify-between space-y-12"
              >
                <div className="space-y-8">
                  <div className="flex flex-wrap items-center gap-3">
                    <History className="h-4 w-4 text-amber-200/60" />
                    <p className="text-[11px] font-medium uppercase tracking-[0.4em] text-amber-200/60">
                      Chương I: Quy luật của Tồn tại
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="inline-flex rounded-lg border border-amber-300/30 bg-amber-300/5 px-5 py-2 backdrop-blur-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-100">
                        Triết học Mác - Lênin
                      </p>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight text-amber-50 tracking-tight">
                      Vì sao tồn tại xã hội lại tác động đến ý thức của con
                      người?
                    </h1>
                    <p className="max-w-2xl text-base leading-relaxed text-stone-400 md:text-lg">
                      Khám phá chiều sâu của mối quan hệ biện chứng giữa đời sống vật chất và tinh thần. 
                      Tìm hiểu cách những điều kiện khách quan nhào nặn nên thế giới quan của mỗi con người.
                    </p>
                  </div>
                </div>

                <div className="space-y-6 pt-4 border-t border-amber-300/10">
                  <div className="game-quote py-6 px-6 rounded-lg border border-amber-300/20 bg-amber-300/5 backdrop-blur-sm">
                    <p className="text-xl leading-relaxed text-amber-50 font-medium">
                      "Không phải ý thức quyết định đời sống mà chính đời sống
                      quyết định ý thức."
                    </p>
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-200/70 mt-3 font-semibold">
                      Karl Marx
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-amber-100/70 font-medium">
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </motion.div>
                    <span>Phân tích cấu trúc Hệ quy luật Xã hội</span>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-5">
                <div className="game-panel p-7 rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/[0.02] backdrop-blur-sm hover:border-amber-300/40 transition-all duration-300">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-amber-200/70 mb-6">
                    Cơ sở Lý luận
                  </p>
                  <div className="space-y-4">
                    {[
                      "Làm rõ vai trò quyết định của đời sống vật chất đối với nhận thức con người.",
                      "Phân tích các yếu tố khách quan cấu thành nên nền tảng xã hội.",
                      "Tạo tiền đề lý luận vững chắc trước khi bước vào hành trình mô phỏng thực tế.",
                    ].map((text, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="game-chip p-4 rounded-lg border border-amber-300/20 bg-amber-300/5 hover:bg-amber-300/10 transition-all duration-300"
                      >
                        <span className="game-chip-label text-xs font-bold uppercase tracking-wider text-amber-200">
                          Mục tiêu {i + 1}
                        </span>
                        <span className="game-chip-value text-sm leading-relaxed text-stone-300">
                          {text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="game-panel p-7 rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/[0.02] backdrop-blur-sm">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-amber-200/70 mb-5">
                    Diễn giải tính quy luật
                  </p>
                  <div className="space-y-4 text-sm leading-relaxed text-stone-400">
                    <p>
                      Hệ thống lý luận Mác-Lênin chỉ ra rằng, để hiểu được một thời đại hay một con người, 
                      ta không thể chỉ dựa vào những gì họ tự nghĩ về mình.
                    </p>
                    <p>
                      Ngược lại, ta phải giải thích tư duy đó dựa trên những mâu thuẫn của đời sống vật chất 
                      và sự vận động của các phương thức sản xuất.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="min-h-screen px-6 py-8 md:px-8 md:py-12 flex flex-col justify-center"
        >
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-6"
            >
              <motion.div
                variants={itemVariants}
                className="game-panel p-8 rounded-xl border border-amber-300/20"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-amber-300/10 rounded-lg">
                    <Landmark className="h-5 w-5 text-amber-200" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-amber-200/70">
                    Ba trụ cột nền tảng
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-amber-50 mb-5">
                  Muốn hiểu ý thức, trước hết phải nhìn vào đời sống cụ thể
                </h2>
                <p className="text-base leading-relaxed text-stone-400 md:text-lg">
                  Lý luận về Tồn tại xã hội và Ý thức xã hội cung cấp cái nhìn khoa học về nguồn gốc của nhận thức, 
                  khẳng định rằng vật chất luôn là cái có trước và quyết định tinh thần.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="grid gap-6 lg:grid-cols-3 w-full"
              >
                {coreIdeas.map(({ icon: Icon, title, body }) => (
                  <motion.div
                    key={title}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="group relative p-7 rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/[0.02] backdrop-blur-sm hover:border-amber-300/40 hover:bg-amber-300/10 transition-all duration-300 cursor-default"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-3 bg-amber-300/10 group-hover:bg-amber-300/20 rounded-lg transition-colors duration-300">
                        <Icon className="h-6 w-6 text-amber-200" />
                      </div>
                      <div className="w-8 h-8 bg-amber-300/5 rounded-full" />
                    </div>
                    <p className="text-lg font-bold text-amber-50 mb-4">
                      {title}
                    </p>
                    <p className="text-sm leading-relaxed text-stone-400">
                      {body}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="min-h-screen px-6 py-8 md:px-8 md:py-12 flex flex-col justify-center"
        >
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                variants={itemVariants}
                className="game-panel p-8 rounded-xl border border-amber-300/20"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-amber-300/10 rounded-lg">
                    <BookOpen className="h-6 w-6 text-amber-200" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-amber-200/70">
                    Khái niệm nền tảng
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-amber-50 mb-6">
                  Tồn tại xã hội là gì?
                </h2>
                <p className="text-lg leading-relaxed text-amber-50 font-medium mb-6 py-5 px-6 border-l-4 border-amber-400 bg-amber-300/5">
                  Toàn bộ những sinh hoạt vật chất và những điều kiện sinh hoạt
                  vật chất của xã hội trong những giai đoạn lịch sử nhất định.
                </p>
                <p className="text-base leading-relaxed text-stone-400">
                  Nói cách khác, tồn tại xã hội bao gồm tất cả các yếu tố khách
                  quan tác động đến sự tồn tại và phát triển của con người, từ
                  môi trường tự nhiên cho đến cách thức mà họ sản xuất những thứ
                  cần thiết để sống.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="min-h-screen px-6 py-8 md:px-8 md:py-12 flex flex-col justify-center"
        >
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                variants={itemVariants}
                className="game-panel p-8 rounded-xl border border-amber-300/20"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-amber-300/10 rounded-lg">
                    <History className="h-6 w-6 text-amber-200" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-amber-200/70">
                    Các yếu tố cơ bản
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-amber-50 mb-12">
                  Tồn tại xã hội gồm những gì?
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {basicElements.map((element, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      className="group p-7 rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/[0.02] backdrop-blur-sm hover:border-amber-300/40 hover:bg-amber-300/10 transition-all duration-300"
                    >
                      <div className="mb-4">
                        <span className="inline-flex items-center justify-center w-10 h-10 bg-amber-300/15 group-hover:bg-amber-300/25 rounded-lg transition-colors duration-300">
                          <span className="text-xl font-bold text-amber-200">
                            {index + 1}
                          </span>
                        </span>
                      </div>
                      <p className="text-lg font-bold text-amber-50 mb-3">
                        {element.title}
                      </p>
                      <p className="text-sm leading-relaxed text-stone-400">
                        {element.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="min-h-screen px-6 py-8 md:px-8 md:py-12 flex flex-col justify-center"
        >
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="space-y-8"
            >
              <motion.div
                variants={itemVariants}
                className="game-panel p-8 rounded-xl border border-amber-300/20"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-amber-300/10 rounded-lg">
                    <Repeat className="h-6 w-6 text-amber-200" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-amber-200/70">
                    Mối quan hệ biện chứng
                  </p>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-amber-50 mb-12">
                  Tồn tại xã hội & Ý thức xã hội
                </h2>
                <div className="grid gap-6 lg:grid-cols-3">
                  {relationshipAspects.map((aspect, index) => {
                    const IconComponent = aspect.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -6 }}
                        className="group relative p-7 rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/[0.02] backdrop-blur-sm hover:border-amber-300/40 hover:bg-amber-300/10 transition-all duration-300"
                      >
                        <div className="mb-6">
                          <div className="p-3 w-fit bg-amber-300/10 group-hover:bg-amber-300/20 rounded-lg transition-colors duration-300">
                            <IconComponent className="h-6 w-6 text-amber-200" />
                          </div>
                        </div>
                        <p className="text-lg font-bold text-amber-50 mb-5">
                          {aspect.title}
                        </p>
                        <ul className="space-y-3">
                          {aspect.points.map((point, i) => (
                            <li
                              key={i}
                              className="text-sm leading-relaxed text-stone-400 flex gap-3"
                            >
                              <span className="text-amber-300 font-bold mt-0.5 flex-shrink-0">
                                •
                              </span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="min-h-screen px-6 py-8 md:px-8 md:py-12 flex items-center"
        >
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
            >
              <motion.div
                variants={itemVariants}
                className="game-panel p-8 rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/[0.02] backdrop-blur-sm"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-amber-200/70 mb-8">
                  Hệ thống Luận điểm
                </p>
                <div className="space-y-3">
                  {presentationOutline.map((item, index) => (
                    <motion.div
                      key={item}
                      variants={itemVariants}
                      whileHover={{ x: 4 }}
                      className="game-chip p-5 rounded-lg border border-amber-300/25 bg-amber-300/8 hover:bg-amber-300/15 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <span className="game-chip-label inline-flex items-center justify-center w-8 h-8 bg-amber-300/20 rounded-full text-xs font-bold text-amber-100 flex-shrink-0">
                          {index + 1}
                        </span>
                        <span className="game-chip-value text-sm leading-relaxed text-stone-300 pt-1">
                          {item}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="game-panel p-8 rounded-xl border border-amber-300/20 bg-gradient-to-br from-amber-300/5 to-amber-300/[0.02] backdrop-blur-sm flex flex-col justify-between"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-amber-200/70 mb-8">
                    Hiện thực hóa Vận động
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight text-amber-50 mb-6">
                    Khi nền lý thuyết đã rõ, trang tiếp theo sẽ trả lời: game
                    minh họa điều này như thế nào?
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed text-stone-400">
                    <p>
                      Sau khi đã nắm vững các nguyên lý cơ bản, chúng ta sẽ chuyển sang phần mô phỏng 
                      để quan sát sự vận động này trong những tình huống cụ thể.
                    </p>
                    <p>
                      Hãy chuẩn bị tâm thế để đối mặt với những biến chuyển của hoàn cảnh và xem chúng 
                      thay đổi ý chí con người như thế nào.
                    </p>
                  </div>
                </div>

                <div
                  className={`flex flex-col ${isGameInProgress ? "md:flex-row" : ""} gap-4 items-start md:items-center`}
                >
                  {isGameInProgress && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => setLocation("/game")}
                        size="lg"
                        className="w-full md:w-auto px-8 py-3 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all duration-300 border-none"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        Tiếp tục chơi
                      </Button>
                    </motion.div>
                  )}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={() => setLocation("/ly-thuyet")}
                      size="lg"
                      className="game-cta w-full md:w-auto px-8 py-3 bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-lg transition-all duration-300 border-none"
                    >
                      Bắt đầu chơi game
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
