
import { useState, useEffect, useCallback } from "react";

export interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  date: number;
  isLegend?: boolean;
}

const LEGENDS: LeaderboardEntry[] = [
  { name: "Karl Marx", score: 10, total: 10, date: 0, isLegend: true },
  { name: "Friedrich Engels", score: 10, total: 10, date: 0, isLegend: true },
  { name: "V.I. Lenin", score: 9, total: 10, date: 0, isLegend: true },
  { name: "Rosa Luxemburg", score: 8, total: 10, date: 0, isLegend: true },
  { name: "Antonio Gramsci", score: 7, total: 10, date: 0, isLegend: true },
];

const STORAGE_KEY = "marx_game_leaderboard";

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let playerEntries: LeaderboardEntry[] = [];
    if (saved) {
      try {
        playerEntries = JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse leaderboard", e);
      }
    }
    
    // Combine with legends and sort
    const combined = [...LEGENDS, ...playerEntries].sort((a, b) => {
      // Sort by percentage (score/total)
      const ratioA = a.score / a.total;
      const ratioB = b.score / b.total;
      if (ratioB !== ratioA) return ratioB - ratioA;
      // If same ratio, sort by date (newer first) for players
      return b.date - a.date;
    });

    setEntries(combined);
  }, []);

  const addScore = useCallback((name: string, score: number, total: number) => {
    const newEntry: LeaderboardEntry = {
      name,
      score,
      total,
      date: Date.now(),
    };

    setEntries(prev => {
      // Check if this player already has an entry with the same or better score
      const existingEntries = prev.filter(e => !e.isLegend);
      const betterEntryExists = existingEntries.some(
        e => e.name === name && (e.score / e.total) >= (score / total)
      );

      if (betterEntryExists) return prev;

      // Update player's record (replace old one if exists)
      const updatedPlayerEntries = [
        ...existingEntries.filter(e => e.name !== name),
        newEntry
      ];

      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPlayerEntries));

      // Return combined with legends
      return [...LEGENDS, ...updatedPlayerEntries].sort((a, b) => {
        const ratioA = a.score / a.total;
        const ratioB = b.score / b.total;
        if (ratioB !== ratioA) return ratioB - ratioA;
        return b.date - a.date;
      });
    });
  }, []);

  return { entries, addScore };
}
