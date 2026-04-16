
import { useState, useCallback, useMemo } from "react";
import { QUIZ_QUESTIONS, QuizQuestion } from "@/const/quiz";

export type QuizState = "intro" | "questions" | "results";

export function useQuizLogic(roleId?: string | null, onBonusEarned?: (amount: number) => void) {
  const [quizState, setQuizState] = useState<QuizState>("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [waitingForBonus, setWaitingForBonus] = useState(false);

  // Filter questions based on roleId if provided, otherwise show all
  const filteredQuestions = useMemo(() => {
    let questions = [];
    if (!roleId) {
      questions = QUIZ_QUESTIONS;
    } else {
      questions = QUIZ_QUESTIONS.filter(q => q.roleId === roleId || q.roleId === "all");
    }

    // Ensure questions with roleId "all" (Boss) are at the end
    return [...questions].sort((a, b) => {
      if (a.roleId === "all" && b.roleId !== "all") return 1;
      if (a.roleId !== "all" && b.roleId === "all") return -1;
      return 0;
    });
  }, [roleId]);


  const currentQuestion = filteredQuestions[currentQuestionIndex];
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
  }, []);

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

      if (isCorrect && currentQuestion.bonusMoney && currentQuestion.bonusMoney > 0) {
        // Pause here for the card pick game
        setWaitingForBonus(true);
        setIsChecking(false);
      } else {
        // Normal transition
        setIsChecking(false);
        if (isLastQuestion) {
          setQuizState("results");
        } else {
          setCurrentQuestionIndex(prev => prev + 1);
        }
      }
    }, 800);
  }, [currentQuestion, isLastQuestion, isChecking, onBonusEarned]);

  const completeBonus = useCallback(() => {
    setWaitingForBonus(false);
    if (isLastQuestion) {
      setQuizState("results");
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [isLastQuestion]);

  const resetQuiz = useCallback(() => {
    setQuizState("intro");
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setScore(0);
    setIsChecking(false);
    setLastSelected(null);
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
    waitingForBonus
  };
};
