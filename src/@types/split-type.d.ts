declare module "split-type" {
  // ✅ FIX 1: TypesList con valori esatti accettati — senza spazi
  type TypesList =
    | "chars"
    | "words"
    | "lines"
    | "chars,words"
    | "chars,lines"
    | "words,lines"
    | "chars,words,lines";

  type SplitTypeOptions = {
    types?: TypesList;
    linesClass?: string;
    wordsClass?: string;
    charsClass?: string;
  };

  export default class SplitType {
    constructor(target: string | HTMLElement, options?: SplitTypeOptions);
    // ✅ FIX 2: null check corretto — possono essere null se il tipo non è richiesto
    lines: HTMLElement[] | null;
    words: HTMLElement[] | null;
    chars: HTMLElement[] | null;
  }
}