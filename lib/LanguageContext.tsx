"use client";

// LanguageProvider: tüm uygulamayı sarar, seçili dili localStorage'da saklar.
// useLanguage() hook'u ile { lang, setLang, t } erişilir.
// t("navbar.home") gibi nokta-yollu anahtarlarla çeviri döner.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANG,
  LANGUAGES,
  dictionaries,
  type Lang,
} from "@/languages";

const STORAGE_KEY = "lang";

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

// "navbar.home" -> ilgili sözlükten string çeker. Bulunamazsa anahtarı döner.
function translate(lang: Lang, key: string): string {
  const parts = key.split(".");
  let value: unknown = dictionaries[lang];
  for (const part of parts) {
    if (value && typeof value === "object" && part in value) {
      value = (value as Record<string, unknown>)[part];
    } else {
      return key;
    }
  }
  return typeof value === "string" ? value : key;
}

function isLang(value: string | null): value is Lang {
  return value !== null && (LANGUAGES as readonly string[]).includes(value);
}

// İlk ziyarette (kayıtlı seçim yokken) tarayıcı dilini kullan: locale "tr"
// ile başlıyorsa Türkçe, aksi halde varsayılan dil.
function detectBrowserLang(): Lang {
  if (typeof navigator === "undefined") return DEFAULT_LANG;
  const nav = (navigator.language || "").toLowerCase();
  return nav.startsWith("tr") ? "tr" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  // SSR ile uyum için her zaman DEFAULT_LANG ile başla; localStorage'ı
  // mount sonrası oku (hydration mismatch'i önler).
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) {
      // Kullanıcı daha önce dil seçmiş — onu kullan.
      setLangState(stored);
      document.documentElement.lang = stored;
    } else {
      // İlk ziyaret — tarayıcı diline düş (kalıcı kaydetmeden).
      const detected = detectBrowserLang();
      setLangState(detected);
      document.documentElement.lang = detected;
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(STORAGE_KEY, next);
    document.documentElement.lang = next;
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "tr" ? "en" : "tr");
  }, [lang, setLang]);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
