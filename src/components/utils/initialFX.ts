import { gsap } from "gsap";
import SplitType from "split-type";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0].classList.add("main-active");

  gsap.to("body", { backgroundColor: "#0b080c", duration: 0.5, delay: 1 });

  // ✅ FIX 1: "chars, lines" → "chars,lines" (senza spazio — richiesto da TypeScript)
  const landingH3 = new SplitType(".landing-info h3", { types: "chars,lines" });
  const landingH2 = new SplitType(".landing-intro h2", { types: "chars,lines" });
  const landingH1 = new SplitType(".landing-intro h1", { types: "chars,lines" });

  // ✅ FIX 2: null check con ?? [] — chars può essere null
  const landingTextChars = [
    ...(landingH3.chars ?? []),
    ...(landingH2.chars ?? []),
    ...(landingH1.chars ?? []),
  ];

  gsap.fromTo(
    landingTextChars,
    { opacity: 0, y: 80, filter: "blur(5px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.inOut", stagger: 0.025, delay: 0.3 }
  );

  // ✅ FIX 1 + 2 applicati a tutti i SplitType
  const landingText2 = new SplitType(".landing-h2-info", { types: "chars,lines" });
  gsap.fromTo(
    landingText2.chars ?? [],
    { opacity: 0, y: 80, filter: "blur(5px)" },
    { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power3.inOut", stagger: 0.025, delay: 0.3 }
  );

  gsap.fromTo(".landing-info-h2", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.2, ease: "power1.inOut", delay: 0.8 });
  gsap.fromTo([".header", ".icons-section", ".nav-fade"], { opacity: 0 }, { opacity: 1, duration: 1.2, ease: "power1.inOut", delay: 0.1 });

  const landingText3 = new SplitType(".landing-h2-info-1", { types: "chars,lines" });
  const landingText4 = new SplitType(".landing-h2-1", { types: "chars,lines" });
  const landingText5 = new SplitType(".landing-h2-2", { types: "chars,lines" });

  LoopText(landingText2, landingText3);
  LoopText(landingText4, landingText5);
}

function LoopText(Text1: SplitType, Text2: SplitType) {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
  const delay = 4;
  const delay2 = delay * 2 + 1;

  // ✅ FIX 2: null check su tutti i .chars
  tl.fromTo(Text2.chars ?? [], { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay }, 0)
    .fromTo(Text1.chars ?? [], { y: 80 }, { y: 0, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: delay2 }, 1)
    .fromTo(Text1.chars ?? [], { y: 0 }, { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay }, 0)
    .to(Text2.chars ?? [], { y: -80, duration: 1.2, ease: "power3.inOut", stagger: 0.1, delay: delay2 }, 1);
}