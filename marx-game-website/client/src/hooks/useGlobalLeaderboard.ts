
import { useState, useEffect, useCallback } from "react";
import { ref, push, onValue, query, orderByChild, limitToLast, set } from "firebase/database";
import { db } from "@/lib/firebase";

export interface LeaderboardEntry {
  name: string;
  score: number;
  total: number;
  date: number;
  isLegend?: boolean;
}

const LEGENDS: LeaderboardEntry[] = [];

export function useGlobalLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from Firebase
  useEffect(() => {
    // Safety check for database URL
    const dbUrl = db.app.options.databaseURL;
    if (!dbUrl || dbUrl.includes("firebaseio.com")) {
      console.warn("Global Leaderboard is not configured correctly or using default-only US endpoint. Skipping Firebase connection.");
      setLoading(false);
      return;
    }

    try {
      const scoresRef = ref(db, "scores");
      // Order by raw score to get the top performers
      const topScoresQuery = query(scoresRef, orderByChild("score"), limitToLast(100));

      const unsubscribe = onValue(topScoresQuery, (snapshot) => {
        try {
          const data = snapshot.val();
          const playerEntries: LeaderboardEntry[] = [];
          
          if (data) {
            Object.keys(data).forEach((key) => {
              playerEntries.push(data[key]);
            });
          }

          // Combine with legends and sort by score (Primary: score DESC, Secondary: date ASC)
          const combined = [...LEGENDS, ...playerEntries].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.date - b.date; // Earlier achiever wins the tie
          });

          // Keep only top unique names, keeping their best score
          const uniqueMap = new Map<string, LeaderboardEntry>();
          combined.forEach(entry => {
            const existing = uniqueMap.get(entry.name);
            if (!existing || entry.score > existing.score) {
              uniqueMap.set(entry.name, entry);
            }
          });

          // Final sort and slice to top 50
          setEntries(Array.from(uniqueMap.values()).sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            return a.date - b.date;
          }).slice(0, 50));
          setLoading(false);
        } catch (innerError) {
          console.error("Error processing leaderboard snapshot:", innerError);
          setLoading(false);
        }
      }, (error) => {
        console.error("Firebase Realtime Database connection error:", error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (e) {
      console.error("Failed to initialize Firebase database connection:", e);
      setLoading(false);
    }
  }, []);

  const submitScore = useCallback(async (name: string, score: number, total: number) => {
    if (!name) return;
    
    // Clean name for firebase key
    const safeName = name.replace(/[.#$[\]]/g, "_");
    const scoresRef = ref(db, `scores/${safeName}`);
    const scoreRatio = total > 0 ? score / total : 0;

    const newEntry: LeaderboardEntry = {
      name,
      score,
      total,
      date: Date.now(),
    };

    try {
      await set(scoresRef, {
        ...newEntry,
        scoreRatio: scoreRatio // Keep ratio for metadata
      });
    } catch (e) {
      console.error("Failed to submit score", e);
    }
  }, []);

  return { entries, submitScore, loading };
}
