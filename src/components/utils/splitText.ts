import { gsap } from "gsap";
import SplitType from "split-type";

interface ParaElement extends HTMLElement {
  anim?: gsap.core.Animation;
  split?: SplitType;
}

export default function setSplitText() {
  const paras: NodeListOf<ParaElement> = document.querySelectorAll(".para");
  const titles: NodeListOf<ParaElement> = document.querySelectorAll(".title");

  paras.forEach((para) => {
    // ✅ FIX 1: "lines, words" → "lines,words" (senza spazio)
    para.split = new SplitType(para, { types: "lines,words" });
    para.anim = gsap.fromTo(
      para.split.words ?? [],  // ✅ FIX 2: null check
      { autoAlpha: 0, y: 80 },
      { autoAlpha: 1, y: 0, stagger: 0.02, duration: 1, ease: "power3.out" }
    );
  });

  titles.forEach((title) => {
    // ✅ FIX 1: "chars, lines" → "chars,lines" (senza spazio)
    title.split = new SplitType(title, { types: "chars,lines" });
    title.anim = gsap.fromTo(
      title.split.chars ?? [],  // ✅ FIX 2: null check
      { autoAlpha: 0, y: 80, rotate: 10 },
      { autoAlpha: 1, y: 0, rotate: 0, stagger: 0.03, duration: 0.8, ease: "power2.inOut" }
    );
  });
}