
import { useState, useEffect, useCallback } from "react";
import { ref, get, set, onValue, query, orderByChild, limitToLast } from "firebase/database";
import { db } from "@/lib/firebase";

export interface LeaderboardEntry {
  name: string;
  farmer: number;
  worker: number;
  student: number;
  total: number;
  date: number;
  isLegend?: boolean;
}

const LEGENDS: LeaderboardEntry[] = [];

export function useGlobalLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from Firebase, sorted by total cumulative score
  useEffect(() => {
    const dbUrl = db.app.options.databaseURL;
    if (!dbUrl || dbUrl.includes("firebaseio.com")) {
      console.warn("Global Leaderboard is not configured correctly. Skipping Firebase connection.");
      setLoading(false);
      return;
    }

    try {
      const scoresRef = ref(db, "scores");
      const topScoresQuery = query(scoresRef, orderByChild("total"), limitToLast(100));

      const unsubscribe = onValue(topScoresQuery, (snapshot) => {
        try {
          const data = snapshot.val();
          const playerEntries: LeaderboardEntry[] = [];

          if (data) {
            Object.keys(data).forEach((key) => {
              const entry = data[key];
              // Normalize old entries that might not have per-role fields
              playerEntries.push({
                name: entry.name || key,
                farmer: entry.farmer || 0,
                worker: entry.worker || 0,
                student: entry.student || 0,
                total: entry.total || entry.score || 0,
                date: entry.date || 0,
              });
            });
          }

          // Combine with legends and sort by total DESC, tie-break by earlier date
          const combined = [...LEGENDS, ...playerEntries].sort((a, b) => {
            if (b.total !== a.total) return b.total - a.total;
            return a.date - b.date;
          });

          // Deduplicate by name, keep only best (highest total) per player
          const uniqueMap = new Map<string, LeaderboardEntry>();
          combined.forEach(entry => {
            const existing = uniqueMap.get(entry.name);
            if (!existing || entry.total > existing.total) {
              uniqueMap.set(entry.name, entry);
            }
          });

          setEntries(
            Array.from(uniqueMap.values())
              .sort((a, b) => {
                if (b.total !== a.total) return b.total - a.total;
                return a.date - b.date;
              })
              .slice(0, 50)
          );
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

  /**
   * Submit a score for a specific role. The score is ACCUMULATED (added on top of
   * any previous score for that role). The `total` field is always the sum of all 3 roles.
   */
  const submitScore = useCallback(async (name: string, roleId: string, newScore: number) => {
    if (!name || !roleId) return;

    const safeName = name.replace(/[.#$[\]]/g, "_");
    const playerRef = ref(db, `scores/${safeName}`);

    try {
      // Read existing data first
      const snapshot = await get(playerRef);
      const existing = snapshot.val() || {
        name,
        farmer: 0,
        worker: 0,
        student: 0,
        total: 0,
        date: Date.now(),
      };

      // Accumulate the score for the specific role
      const updated: LeaderboardEntry = {
        name,
        farmer: existing.farmer || 0,
        worker: existing.worker || 0,
        student: existing.student || 0,
        date: Date.now(),
        total: 0,
      };

      if (roleId === "farmer" || roleId === "worker" || roleId === "student") {
        updated[roleId] = (existing[roleId] || 0) + newScore;
      }

      // Recalculate total from all 3 roles
      updated.total = updated.farmer + updated.worker + updated.student;

      await set(playerRef, updated);
    } catch (e) {
      console.error("Failed to submit score:", e);
    }
  }, []);

  return { entries, submitScore, loading };
}
