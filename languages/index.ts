// Dil tanımları ve tipleri.
// tr varsayılan/kaynak dildir; Translations tipi tr'den türetilir,
// böylece en.ts eksik veya fazla anahtar içerirse TypeScript hata verir.

import tr from "./tr";
import en from "./en";

export const LANGUAGES = ["tr", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];

export const DEFAULT_LANG: Lang = "tr";

// tr'nin yapısı kaynak şemadır. Literal tipleri string'e genişletiriz,
// böylece en.ts aynı anahtarlara sahip ama farklı metinler içerebilir.
type Widen<T> = T extends string
  ? string
  : T extends readonly (infer U)[]
  ? readonly Widen<U>[]
  : { [K in keyof T]: Widen<T[K]> };
export type Translations = Widen<typeof tr>;

export const dictionaries: Record<Lang, Translations> = { tr, en };
