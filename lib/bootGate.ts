// Tiny coordination point between the BootTerminal intro and the homepage
// captions: the intro caption must not start typing until the boot terminal
// has been dismissed, so the user actually watches it type after skipping.

const EVENT = "boot-terminal-dismissed";
const REPLAY_EVENT = "boot-terminal-replay";
const SEEN_KEY = "bootSeen";

// True once the boot terminal is gone (or if it never showed).
let dismissed = false;

export function isBootDismissed(): boolean {
  return dismissed;
}

export function markBootDismissed(): void {
  if (dismissed) return;
  dismissed = true;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(EVENT));
  }
}

// Called when the intro is (re)opened — e.g. the navbar "Intro" replay. Flips
// the gate back to "not dismissed" so the next dismiss fires EVENT again and
// downstream listeners (the homepage caption) restart from scratch.
export function markBootActive(): void {
  dismissed = false;
}

export function onBootDismissed(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  // Fire immediately if already dismissed (caption can type right away), AND
  // stay subscribed so later replays (open → dismiss again) re-trigger it too.
  if (dismissed) cb();
  const handler = () => cb();
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

// --- Per-session gating -----------------------------------------------------

// Intro auto-plays once per browsing session. The "seen" flag lives in
// sessionStorage (not localStorage), so it survives in-session navigation
// between pages but is cleared when the tab/browser is closed — meaning a fresh
// visit replays the intro from the start.
export function hasSeenBoot(): boolean {
  if (typeof window === "undefined") return true;
  return sessionStorage.getItem(SEEN_KEY) === "1";
}

export function markBootSeen(): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SEEN_KEY, "1");
  }
}

const AUTO_SHOW_KEY = "bootAutoShown";

export function hasAutoShownBoot(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTO_SHOW_KEY) === "1";
}

export function markBootAutoShown(): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTO_SHOW_KEY, "1");
  }
}

// --- 3D scene warm-up gating ------------------------------------------------

// The full-screen loading cover (0→100) plays only the FIRST time the 3D scene
// loads this session. After that the assets are cached, so navigating back to
// the homepage (or returning from the intro) should open instantly — just like
// switching between any other pages. Flag lives in sessionStorage so it resets
// on a fresh tab/browser visit.
const SCENE_WARMED_KEY = "sceneWarmed";

export function hasSceneWarmed(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SCENE_WARMED_KEY) === "1";
}

export function markSceneWarmed(): void {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(SCENE_WARMED_KEY, "1");
  }
}

// --- Manual replay (Navbar "Intro" button) --------------------------------

const REPLAY_PENDING_KEY = "bootReplayPending";

// Fire to re-open the intro on demand, regardless of the seen flag. If the
// BootTerminal is already mounted (homepage), the event opens it immediately.
// Otherwise we leave a sessionStorage flag so it opens once the homepage (and
// the terminal) mounts after navigation.
export function replayBoot(): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(REPLAY_PENDING_KEY, "1");
  window.dispatchEvent(new Event(REPLAY_EVENT));
}

// True if a replay was requested before the terminal mounted (cross-page).
// Consumes the flag.
export function consumeReplayPending(): boolean {
  if (typeof window === "undefined") return false;
  const pending = sessionStorage.getItem(REPLAY_PENDING_KEY) === "1";
  if (pending) sessionStorage.removeItem(REPLAY_PENDING_KEY);
  return pending;
}

export function onBootReplay(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(REPLAY_EVENT, handler);
  return () => window.removeEventListener(REPLAY_EVENT, handler);
}
