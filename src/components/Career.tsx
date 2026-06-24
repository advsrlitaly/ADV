import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          Our <span>Journey</span>
          <br /> & Growth
        </h2>

        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>

          {/* Fondazione */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Agency Founded</h4>
                <h5>ADV Communication</h5>
              </div>
              <h3>2019</h3>
            </div>
            <p>
              Nasce ADV, un’agenzia di comunicazione specializzata nella creazione
              di siti web professionali e strategie digitali, con un occhio di
              riguardo alla crescita sui social media.
            </p>
          </div>

          {/* Oggi */}
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>ADV Today</h4>
                <h5>Creative & Digital Agency</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Oggi ADV accompagna aziende e professionisti nella gestione completa
              della loro presenza online: siti web moderni, gestione social,
              content creation, branding e strategie digitali che aumentano
              visibilità e engagement.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Career;