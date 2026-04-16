
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
      const topScoresQuery = query(scoresRef, orderByChild("scoreRatio"), limitToLast(50));

      const unsubscribe = onValue(topScoresQuery, (snapshot) => {
        try {
          const data = snapshot.val();
          const playerEntries: LeaderboardEntry[] = [];
          
          if (data) {
            Object.keys(data).forEach((key) => {
              playerEntries.push(data[key]);
            });
          }

          // Combine with legends and sort
          const combined = [...LEGENDS, ...playerEntries].sort((a, b) => {
            const ratioA = a.score / a.total;
            const ratioB = b.score / b.total;
            if (ratioB !== ratioA) return ratioB - ratioA;
            return b.date - a.date;
          });

          // Keep only top 50 unique names (excluding legends)
          const uniqueMap = new Map<string, LeaderboardEntry>();
          combined.forEach(entry => {
            if (!uniqueMap.has(entry.name) || (entry.score / entry.total) > (uniqueMap.get(entry.name)!.score / uniqueMap.get(entry.name)!.total)) {
              uniqueMap.set(entry.name, entry);
            }
          });

          setEntries(Array.from(uniqueMap.values()).sort((a, b) => {
            const ratioA = a.score / a.total;
            const ratioB = b.score / b.total;
            if (ratioB !== ratioA) return ratioB - ratioA;
            return b.date - a.date;
          }));
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
    
    const scoresRef = ref(db, `scores/${name.replace(/[.#$[\]]/g, "_")}`);
    const scoreRatio = score / total;

    // Only update if current score is better
    const newEntry: LeaderboardEntry = {
      name,
      score,
      total,
      date: Date.now(),
      // Add a hidden sorting field (ratio * 1000000)
    };

    try {
      await set(scoresRef, {
        ...newEntry,
        scoreRatio: scoreRatio
      });
    } catch (e) {
      console.error("Failed to submit score", e);
    }
  }, []);

  return { entries, submitScore, loading };
}
