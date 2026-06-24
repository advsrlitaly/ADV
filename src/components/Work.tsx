import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const clients = [
  {
    name: "Vanilla",
    service: "Branding , Siti Web & Social",
    tools: "PS , Ai , WordPress , Instagram, Facebook, Tik Tok",
    logo: "/images/logo-vanilla.png",
  },
  {
    name: "Miki Sushi",
    service: "Social",
    tools: "Instagram, Facebook",
    logo: "/images/miki sushi.png",
  },
  {
    name: "MF Burger",
    service: "Branding & Social",
    tools: "Ai, Ps, Instagram, Facebook",
    logo: "/images/mfburger.png",
  },
  {
    name: "IN TEGLIA",
    service: "Branding & Social",
    tools: "Ps, Ai, Instagram, Facebook",
    logo: "/images/integlia.png",
  },
  {
    name: "Fugu",
    service: "Social",
    tools: "Instagram, Facebook",
    logo: "/images/logo-fugu-bianca.png",
  },
  {
    name: "Hanami",
    service: "Social",
    tools: "Instagram, Facebook",
    logo: "/images/logo-hanami.png",
  },
  {
    name: "BiancaDi",
    service: "Siti Web & Social",
    tools: "Wordpress, Instagram, Facebook",
    logo: "/images/logo-bianca.png",
  },
  {
    name: "Fabrica",
    service: "Social",
    tools: "Instagram & Facebook",
    logo: "/images/logo-fabrica.png",
  },
  {
    name: "Okay",
    service: "Siti Web & Social",
    tools: "Wordpress , Instagram, Facebook",
    logo: "/images/logo-okay.png",
  },
];

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const flex = flexRef.current;
    if (!section || !flex) return;

    const isMobile = window.innerWidth <= 768;

    ScrollTrigger.refresh();

    const getTranslateX = () => flex.scrollWidth - flex.clientWidth;

    const ctx = gsap.context(() => {
      if (isMobile) return;

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTranslateX()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      }).to(flex, {
        x: () => -getTranslateX(),
        ease: "none",
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div className="work-section" id="work" ref={sectionRef}>
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="work-flex" ref={flexRef}>
          {clients.map((client, index) => (
            <div className="work-box" key={client.name}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{String(index + 1).padStart(2, "0")}</h3>
                  <div>
                    <h4>{client.name}</h4>
                    <p>{client.service}</p>
                  </div>
                </div>

                <h4>Tools & Features</h4>
                <p>{client.tools}</p>
              </div>

              <div className="work-logo-wrap">
                <WorkImage image={client.logo} alt={client.name} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;