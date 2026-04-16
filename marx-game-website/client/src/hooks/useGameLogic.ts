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
    title: "Mâu thuẫn Kinh tế: Sự áp đặt của Tồn tại xã hội",
    description:
      "Gia đình bạn đang gặp áp lực vật chất đột ngột do biến động thị trường. Là một thực thể kinh tế, bạn phải đưa ra quyết định để duy trì sự tồn tại.",
    choices: [
      {
        text: "Ưu tiên tích lũy vật chất, tạm gác các hoạt động tinh thần",
        impact: {
          money: 15,
          env: "Môi trường lao động thực tiễn",
          rel: "Quan hệ sản xuất mới",
          mind: "Thực chứng, trách nhiệm",
          belief: "Vật chất quyết định ý thức",
        },
        feedback:
          "Việc ưu tiên lao động giúp bạn ổn định vật chất, nhưng cũng làm thu hẹp không gian phản ánh tư duy lý luận phi thực tế.",
      },
      {
        text: "Vay mượn tư liệu để duy trì tiến trình định hình tư duy",
        impact: {
          money: -10,
          env: "Áp lực phụ thuộc kinh tế",
          rel: "Quan hệ ràng buộc nợ nần",
          mind: "Kiên định nhưng lo âu",
          belief: "Ý thức nỗ lực tác động ngược lại tồn tại",
        },
        feedback:
          "Bạn giữ được mục tiêu phát triển tư duy, nhưng sự lệ thuộc vào nguồn lực bên ngoài tạo ra một mâu thuẫn nội tại trong đời sống.",
      },
    ],
  },
  {
    title: "Biến động Địa vị: Sự vận động của Quan hệ sản xuất",
    description:
      "Một cơ hội dịch chuyển vị trí trong hệ thống phân công lao động xã hội xuất hiện, yêu cầu bạn phải thay đổi hoàn toàn môi trường sinh tồn.",
    choices: [
      {
        text: "Dịch chuyển đến trung tâm vận động mới",
        impact: {
          money: 20,
          env: "Đô thị hiện đại, động năng cao",
          rel: "Mạng lưới chuyên nghiệp",
          mind: "Sáng tạo, thích nghi biện chứng",
          belief: "Sự thay đổi môi trường thay đổi tư duy",
        },
        feedback:
          "Sự thay đổi trong Tồn tại xã hội mới đã kéo theo sự biến đổi rõ rệt trong Ý thức của bạn về thế giới.",
      },
      {
        text: "Bảo trì trạng thái ổn định tại môi trường cũ",
        impact: {
          money: 0,
          env: "Tĩnh tại, quy ước",
          rel: "Gắn kết cộng đồng truyền thống",
          mind: "Bảo tồn, ổn định tâm lý",
          belief: "Tính kế thừa của văn hóa cũ",
        },
        feedback:
          "Sự ổn định giúp bạn an toàn nhưng cũng hạn chế khả năng va chạm với những quy luật vận động mới của thời đại.",
      },
    ],
  },
  {
    title: "Ý thức Giai cấp: Đấu tranh xã hội trong thực tiễn",
    description:
      "Nơi làm việc hoặc học tập của bạn xảy ra bất công. Mọi người đang kêu gọi cùng nhau lên tiếng.",
    choices: [
      {
        text: "Tham gia đấu tranh đòi quyền lợi",
        impact: {
          money: -5,
          env: "Môi trường đối kháng giai cấp",
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
    title: "Cách mạng Kỹ thuật: Sự phát triển của Lực lượng sản xuất",
    description:
      "Những công cụ sản xuất mới (AI, tự động hóa) đang làm thay đổi căn bản cơ sở kinh tế của xã hội. Phản ứng của bạn là gì?",
    choices: [
      {
        text: "Làm chủ phương tiện sản xuất mới",
        impact: {
          money: 10,
          env: "Kỷ nguyên công nghiệp mới",
          rel: "Tương tác người - máy phức tạp",
          mind: "Tư duy hệ thống hiện đại",
          belief: "Khoa học trở thành lực lượng sản xuất trực tiếp",
        },
        feedback:
          "Việc làm chủ công cụ mới giúp bạn nhận thức được sự biến đổi không ngừng của thế giới vật chất quanh mình.",
      },
      {
        text: "Duy trì phương thức tương tác truyền thống",
        impact: {
          money: -5,
          env: "Lạc hậu tương đối",
          rel: "Nhóm giá trị kinh nghiệm cũ",
          mind: "Bảo thủ, kinh nghiệm chủ nghĩa",
          belief: "Bản chất phi vật chất của lao động",
        },
        feedback:
          "Sự chậm trễ trong việc thích nghi với lực lượng sản xuất mới khiến bạn gặp khó khăn khi bối cảnh vật chất đã thay đổi.",
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
          impact: choice.impact
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
