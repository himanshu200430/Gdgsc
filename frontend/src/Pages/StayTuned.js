import React, { useEffect, useState } from 'react';
import './StayTuned.css';

const StayTuned = () => {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="stay-tuned-container">
      {/* Animated Background */}
      <div className="cyber-grid"></div>
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': `${i * 0.5}s`,
            '--x': `${Math.random() * 100}%`,
            '--y': `${Math.random() * 100}%`
          }}></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        <div className="main-title">
          <h1 className="simple-text">
            STAY TUNED
          </h1>
        </div>

        <div className="subtitle-container">
          <p className="cyber-subtitle">
            <span className="typing-text">SYSTEM INITIALIZING...</span>
          </p>
        </div>

        <div className="status-bars">
          <div className="status-bar">
            <span>LOADING</span>
            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
            <span>98%</span>
          </div>
        </div>

        <div className="coming-soon-text">
          <p>Epic gaming experiences are being forged in the digital realm</p>
          <p className="highlight-text">Prepare for the ultimate adventure</p>
        </div>

        {/* Holographic Elements */}
        <div className="holo-elements">
          <div className="holo-ring"></div>
          <div className="holo-ring delay-1"></div>
          <div className="holo-ring delay-2"></div>
        </div>
      </div>

      {/* Corner UI Elements */}
      <div className="corner-ui top-left">
        <div className="ui-line"></div>
        <div className="ui-dot"></div>
      </div>
      <div className="corner-ui top-right">
        <div className="ui-line"></div>
        <div className="ui-dot"></div>
      </div>
      <div className="corner-ui bottom-left">
        <div className="ui-line"></div>
        <div className="ui-dot"></div>
      </div>
      <div className="corner-ui bottom-right">
        <div className="ui-line"></div>
        <div className="ui-dot"></div>
      </div>
    </div>
  );
};

export default StayTuned;
