const THEORY_ACCESS_KEY = "marx-game-theory-complete";

export function hasCompletedTheory() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.sessionStorage.getItem(THEORY_ACCESS_KEY) === "true";
}

export function markTheoryComplete() {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(THEORY_ACCESS_KEY, "true");
}
