"use client";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_42%,#eef6ff_100%)] dark:bg-[linear-gradient(180deg,#030712_0%,#0a0a0a_46%,#07111f_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(rgba(148,163,184,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)]" />
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_0%,rgba(14,165,233,0.10)_28%,transparent_54%,rgba(20,184,166,0.08)_76%,transparent_100%)] dark:bg-[linear-gradient(115deg,transparent_0%,rgba(14,165,233,0.10)_28%,transparent_54%,rgba(45,212,191,0.07)_76%,transparent_100%)]" />
      <div className="absolute inset-y-0 left-[-20%] w-[140%] bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.35)_44%,rgba(125,211,252,0.12)_50%,transparent_58%)] opacity-60 dark:bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.04)_44%,rgba(56,189,248,0.08)_50%,transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),transparent_28%,rgba(255,255,255,0.6)_100%)] dark:bg-[linear-gradient(180deg,rgba(3,7,18,0.72),transparent_35%,rgba(3,7,18,0.82)_100%)]" />
    </div>
  );
}
