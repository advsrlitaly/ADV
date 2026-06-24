import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    // ScrollTrigger per animazioni di scroll generali
    ScrollTrigger.config({ ignoreMobileResize: true });

    // Scroll dei link della navbar
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          const target = element.getAttribute("data-href");
          const section = target ? document.querySelector(target) : null;
          if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });

    // Aggiorna ScrollTrigger al resize
    window.addEventListener("resize", () => {
      ScrollTrigger.refresh();
    });

    // Pulizia al dismount del componente
    return () => {
      window.removeEventListener("resize", () => ScrollTrigger.refresh());
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          <img src="/images/ADVsrl.png" alt="Logo ADV" className="logo-img" /> 
        </a>
        <a
          href="mailto:advsrlitaly@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          advsrlitaly@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;