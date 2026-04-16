
import { useState, useCallback, useMemo } from "react";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/const/quiz";

export type QuizState = "intro" | "questions" | "results";

export function useQuizLogic(roleId?: string | null, onBonusEarned?: (amount: number) => void) {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [waitingForBonus, setWaitingForBonus] = useState(false);
  const [showContextIntro, setShowContextIntro] = useState(false);

  // Filter and randomize questions based on roleId if provided, otherwise show all
  const filteredQuestions = useMemo(() => {
    let roleQuestions: QuizQuestion[] = [];
    let bossQuestions: QuizQuestion[] = [];

    if (!roleId) {
      roleQuestions = [...QUIZ_QUESTIONS];
    } else {
      roleQuestions = QUIZ_QUESTIONS.filter(q => q.roleId === roleId);
      bossQuestions = QUIZ_QUESTIONS.filter(q => q.roleId === "all");
    }

    // Shuffle only the role-specific questions
    const shuffledRoleQuestions = [...roleQuestions];
    for (let i = shuffledRoleQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledRoleQuestions[i], shuffledRoleQuestions[j]] = [shuffledRoleQuestions[j], shuffledRoleQuestions[i]];
    }

    // Combine shuffled role questions (limit to 5) with boss questions at the end
    return [...shuffledRoleQuestions.slice(0, 5), ...bossQuestions];
  }, [roleId]);


  const currentQuestionRaw = filteredQuestions[currentQuestionIndex];
  
  const currentQuestion = useMemo(() => {
    if (!currentQuestionRaw) return currentQuestionRaw;
    
    const options = [...currentQuestionRaw.options];
    const correctOption = options[currentQuestionRaw.correctAnswerIndex];
    
    // Fisher-Yates shuffle
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    
    return {
      ...currentQuestionRaw,
      options,
      correctAnswerIndex: options.indexOf(correctOption)
    };
  }, [currentQuestionRaw]);

  const isLastQuestion = currentQuestionIndex === filteredQuestions.length - 1;

  const [isChecking, setIsChecking] = useState(false);
  const [lastSelected, setLastSelected] = useState<number | null>(null);

  const startQuiz = useCallback(() => {
    setQuizState("questions");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setIsChecking(false);
    setLastSelected(null);
    setShowContextIntro(!!filteredQuestions[0]?.context);
  }, [filteredQuestions]);

  const submitAnswer = useCallback((answerIndex: number) => {
    if (isChecking) return;

    const isCorrect = answerIndex === currentQuestion.correctAnswerIndex;
    setLastSelected(answerIndex);
    setIsChecking(true);
    
    // Immediate score update if needed, or wait? Let's update at the end of the delay
    // Actually, user wants real-time, so update score immediately
    if (isCorrect) {
      setScore(prev => prev + 1);
      // Award base 10 money for every correct answer
      if (onBonusEarned) {
        onBonusEarned(10);
      }
    }

    setTimeout(() => {
      setAnswers(prev => [...prev, answerIndex]);
      setLastSelected(null);

      // Trigger bonus card system
      // Logic: 100% chance if question has bonusMoney, 70% random chance otherwise for correct answers
      const hasGuaranteedBonus = currentQuestion.bonusMoney && currentQuestion.bonusMoney > 0;
      const randomChance = Math.random() > 0.3; // 70% chance
      
      if (isCorrect && (hasGuaranteedBonus || randomChance)) {
        // Pause here for the card pick game
        setWaitingForBonus(true);
        setIsChecking(false);
      } else {
        // Normal transition
        setIsChecking(false);
        if (isLastQuestion) {
          setQuizState("results");
        } else {
          setCurrentQuestionIndex(prev => {
            const nextIdx = prev + 1;
            setShowContextIntro(!!filteredQuestions[nextIdx]?.context);
            return nextIdx;
          });
        }
      }
    }, 800);
  }, [currentQuestion, isLastQuestion, isChecking, onBonusEarned, filteredQuestions]);

  const completeBonus = useCallback(() => {
    setWaitingForBonus(false);
    if (isLastQuestion) {
      setQuizState("results");
    } else {
      setCurrentQuestionIndex(prev => {
        const nextIdx = prev + 1;
        setShowContextIntro(!!filteredQuestions[nextIdx]?.context);
        return nextIdx;
      });
    }
  }, [isLastQuestion, filteredQuestions]);

  const resetQuiz = useCallback(() => {
    setQuizState("intro");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setIsChecking(false);
    setLastSelected(null);
    setShowContextIntro(false);
  }, []);

  const continueToQuestion = useCallback(() => {
    setShowContextIntro(false);
  }, []);

  return {
    quizState,
    currentQuestion,
    currentQuestionIndex,
    totalQuestions: filteredQuestions.length,
    score,
    answers,
    isLastQuestion,
    startQuiz,
    submitAnswer,
    completeBonus,
    resetQuiz,
    questions: filteredQuestions,
    isChecking,
    lastSelected,
    waitingForBonus,
    showContextIntro,
    continueToQuestion
  };
};
