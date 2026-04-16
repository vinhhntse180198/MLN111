import { useCallback, useState } from "react";

export interface GameStats {
  money: number;
  env: string;
  rel: string;
  mind: string;
  belief: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  initialStats: GameStats;
}

export interface Choice {
  text: string;
  impact: GameStats;
  feedback: string;
}

export interface Scenario {
  title: string;
  description: string;
  choices: Choice[];
}

export interface GameHistory {
  scenario: string;
  choice: string;
  feedback: string;
}

const CHARACTERS: Character[] = [
  {
    id: "farmer",
    name: "Nông dân nghèo",
    description:
      "Bạn sinh ra trong một gia đình thuần nông, cuộc sống vất vả nhưng giàu tình làng nghĩa xóm.",
    initialStats: {
      money: 10,
      env: "Nông thôn, thiếu thốn",
      rel: "Gia đình, làng xóm",
      mind: "Chăm chỉ, chấp nhận số phận",
      belief: "Truyền thống, cộng đồng",
    },
  },
  {
    id: "worker",
    name: "Công nhân",
    description:
      "Bạn làm việc tại một nhà máy dệt ở thành phố lớn, đối mặt với tiếng máy nổ và khói bụi hằng ngày.",
    initialStats: {
      money: 30,
      env: "Thành phố, nhà máy",
      rel: "Đồng nghiệp, chủ xưởng",
      mind: "Lao động, cải thiện đời sống",
      belief: "Công bằng, đoàn kết",
    },
  },
  {
    id: "student",
    name: "Sinh viên thành phố",
    description:
      "Bạn là một trí thức trẻ, khao khát kiến thức nhưng luôn lo lắng về chi phí sinh hoạt đắt đỏ.",
    initialStats: {
      money: 20,
      env: "Thành phố, trường học",
      rel: "Bạn bè, thầy cô",
      mind: "Học hỏi, khám phá",
      belief: "Tri thức, tương lai",
    },
  },
];

const SCENARIOS: Scenario[] = [
  {
    title: "Gia đình thiếu tiền",
    description:
      "Gia đình bạn đang gặp khó khăn tài chính đột ngột. Bạn cần đưa ra một quyết định quan trọng.",
    choices: [
      {
        text: "Đi làm thêm, tạm gác việc học hoặc nghỉ ngơi",
        impact: {
          money: 15,
          env: "Môi trường làm việc bận rộn",
          rel: "Mở rộng quan hệ xã hội",
          mind: "Thực dụng, trách nhiệm",
          belief: "Lao động là trên hết",
        },
        feedback:
          "Bạn kiếm được tiền nhưng cũng cảm thấy mệt mỏi, tư duy bắt đầu xoay quanh việc mưu sinh.",
      },
      {
        text: "Vay tiền để tiếp tục con đường hiện tại",
        impact: {
          money: -10,
          env: "Áp lực nợ nần",
          rel: "Phụ thuộc người thân",
          mind: "Kiên trì nhưng lo âu",
          belief: "Tri thức là lối thoát",
        },
        feedback:
          "Bạn giữ được mục tiêu ban đầu nhưng gánh nặng tài chính bắt đầu đè nặng lên tâm trí.",
      },
    ],
  },
  {
    title: "Cơ hội thăng tiến",
    description:
      "Một cơ hội thăng tiến hoặc học bổng xuất hiện, nhưng đòi hỏi bạn phải chuyển đến một môi trường xa lạ.",
    choices: [
      {
        text: "Chấp nhận thử thách, đi đến nơi mới",
        impact: {
          money: 20,
          env: "Đô thị phát triển, hiện đại",
          rel: "Mạng lưới chuyên nghiệp",
          mind: "Sáng tạo, thích nghi",
          belief: "Cá nhân, phát triển",
        },
        feedback:
          "Môi trường mới năng động giúp bạn thay đổi rõ rệt cách nhìn nhận thế giới.",
      },
      {
        text: "Từ chối để ở lại gần gia đình và bạn bè",
        impact: {
          money: 0,
          env: "Ổn định, quen thuộc",
          rel: "Gắn kết cộng đồng cũ",
          mind: "An phận, tình cảm",
          belief: "Truyền thống, gia đình",
        },
        feedback:
          "Sự ổn định giúp bạn yên tâm hơn, nhưng tư duy vẫn thiên về những giá trị quen thuộc.",
      },
    ],
  },
  {
    title: "Xung đột lợi ích",
    description:
      "Nơi làm việc hoặc học tập của bạn xảy ra bất công. Mọi người đang kêu gọi cùng nhau lên tiếng.",
    choices: [
      {
        text: "Tham gia đấu tranh đòi quyền lợi",
        impact: {
          money: -5,
          env: "Môi trường căng thẳng",
          rel: "Đoàn kết tập thể",
          mind: "Đấu tranh, phản biện",
          belief: "Công bằng xã hội",
        },
        feedback:
          "Hành động tập thể giúp bạn cảm nhận rõ sức mạnh đoàn kết và ý thức về quyền lợi chung.",
      },
      {
        text: "Im lặng và tập trung vào việc của mình",
        impact: {
          money: 5,
          env: "An toàn, cá nhân",
          rel: "Khoảng cách xã hội",
          mind: "Thận trọng, cá nhân",
          belief: "Tự thân vận động",
        },
        feedback:
          "Bạn an toàn hơn về vật chất, nhưng cũng thấy mình tách khỏi các vấn đề chung của tập thể.",
      },
    ],
  },
  {
    title: "Sự thay đổi công nghệ",
    description:
      "Công nghệ mới như AI và tự động hóa đang thay đổi cách mọi người làm việc. Bạn sẽ phản ứng thế nào?",
    choices: [
      {
        text: "Dành thời gian học cách sử dụng công nghệ mới",
        impact: {
          money: 10,
          env: "Thời đại số, kết nối",
          rel: "Cộng đồng công nghệ",
          mind: "Tư duy số, hiện đại",
          belief: "Khoa học, tiến bộ",
        },
        feedback:
          "Công cụ mới không chỉ giúp bạn làm việc mà còn làm thay đổi cách bạn hiểu về xã hội đang vận động.",
      },
      {
        text: "Giữ vững phương pháp truyền thống",
        impact: {
          money: -5,
          env: "Lạc hậu dần",
          rel: "Nhóm người bảo thủ",
          mind: "Bảo thủ, kinh nghiệm",
          belief: "Giá trị cũ, truyền thống",
        },
        feedback:
          "Bạn cảm thấy khó thích nghi hơn khi bối cảnh xã hội xung quanh thay đổi quá nhanh.",
      },
    ],
  },
];

export function useGameLogic() {
  const [gameState, setGameState] = useState<
    "registration" | "character-select" | "quiz" | "playing" | "ended"
  >(() => {
    // Start at registration if no name exists in localStorage
    return localStorage.getItem("rpg_player_name") ? "character-select" : "registration";
  });
  
  const [playerName, setPlayerName] = useState<string>(() => {
    return localStorage.getItem("rpg_player_name") || "";
  });
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [stats, setStats] = useState<GameStats | null>(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [history, setHistory] = useState<GameHistory[]>([]);
  const [lastFeedback, setLastFeedback] = useState("");

  const register = useCallback((name: string) => {
    const trimmedName = name.trim();
    if (trimmedName) {
      setPlayerName(trimmedName);
      localStorage.setItem("rpg_player_name", trimmedName);
      setGameState("character-select");
    }
  }, []);

  const selectCharacter = useCallback((charId: string) => {
    const character = CHARACTERS.find((item) => item.id === charId);

    if (!character) {
      return;
    }

    setSelectedCharacter(character);
    setStats({ ...character.initialStats });
    setCurrentRound(0);
    setHistory([]);
    setLastFeedback("");
    setGameState("quiz");
  }, []);

  const startPlaying = useCallback((quizScore: number) => {
    // Money is now added real-time during the quiz via addMoney callback
    setGameState("playing");
  }, []);

  const addMoney = useCallback((amount: number) => {
    setStats(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        money: prev.money + amount
      };
    });
  }, []);

  const makeChoice = useCallback(
    (choiceIndex: number) => {
      if (!selectedCharacter || !stats || currentRound >= SCENARIOS.length) {
        return;
      }

      const scenario = SCENARIOS[currentRound];
      const choice = scenario.choices[choiceIndex];

      const newStats: GameStats = {
        money: stats.money + choice.impact.money,
        env: choice.impact.env,
        rel: choice.impact.rel,
        mind: choice.impact.mind,
        belief: choice.impact.belief,
      };

      setStats(newStats);
      setLastFeedback(choice.feedback);
      setHistory((prev) => [
        ...prev,
        {
          scenario: scenario.title,
          choice: choice.text,
          feedback: choice.feedback,
        },
      ]);

      if (currentRound + 1 >= SCENARIOS.length) {
        setGameState("ended");
        return;
      }

      setCurrentRound((prev) => prev + 1);
    },
    [currentRound, selectedCharacter, stats]
  );

  const resetGame = useCallback(() => {
    // Keep the player name but reset progress
    setGameState("character-select");
    setSelectedCharacter(null);
    setStats(null);
    setCurrentRound(0);
    setHistory([]);
    setLastFeedback("");
  }, []);

  const changeIdentity = useCallback(() => {
    localStorage.removeItem("rpg_player_name");
    setPlayerName("");
    setGameState("registration");
    setSelectedCharacter(null);
    setStats(null);
    setCurrentRound(0);
    setHistory([]);
    setLastFeedback("");
  }, []);

  return {
    gameState,
    playerName,
    selectedCharacter,
    stats,
    currentRound,
    history,
    lastFeedback,
    scenarios: SCENARIOS,
    characters: CHARACTERS,
    register,
    selectCharacter,
    makeChoice,
    startPlaying,
    addMoney,
    resetGame,
    changeIdentity,
  };
}
