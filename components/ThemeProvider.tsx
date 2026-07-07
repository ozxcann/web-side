
// ThemeProvider: Tüm uygulamayı sarar, tema state'ini yönetir (context)


"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="theme"
      enableColorScheme
    >
      {children}
    </NextThemesProvider>
  );
}
