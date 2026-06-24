import { MdArrowOutward, MdCopyright } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>

            <p>
              <a
                href="mailto:advsrlitaly@gmail.com"
                data-cursor="disable"
              >
                advsrlitaly@gmail.com
              </a>
            </p>

            <p>
              <a
                href="mailto:amministrazione@advsrlitaly.com"
                data-cursor="disable"
              >
                amministrazione@advsrlitaly.com
              </a>
            </p>

            <h4>Phone</h4>

            <p>
              <a
                href="tel:+393283082492"
                data-cursor="disable"
              >
                +39 328 3082492
              </a>
            </p>

            <a
              href="https://wa.me/393283082492"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              WhatsApp <FaWhatsapp />
            </a>
          </div>

          <div className="contact-box">
            <h4>Social</h4>

            <a
              href="https://www.instagram.com/adv.srl?igsh=MTEzaHdjcHVqbDd1bg=="
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Instagram <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box">
            <h2></h2>

            <h5>
              <MdCopyright /> 2026 ADV SRL
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};
<h1 style={{ color: "red" }}>TEST CONTACT ACTIVE</h1>
export default Contact;