import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaScroll, FaDragon, FaCrown, FaChessKnight } from "react-icons/fa";

// Timeline event data with fantasy-themed content
const timelineEvents = [
  {
    id: 1,
    title: "GDGSC Orientation",
    date: "March 15, 2024",
    description: "The opening event where we introduced our gallery space and concept to the public.",
    images: [
      "/assets/g_photos/one.jpg",
      "/assets/g_photos/two.jpg",
      "/assets/g_photos/three.jpg",
      "/assets/g_photos/four.jpg",
      "/assets/g_photos/five.jpg",
      "/assets/g_photos/six.jpg"
    ]
  },
  {
    id: 2,
    title: "Gamethon 2024 GDGSC",
    date: "April 22, 2024",
    description: "24-hour gaming marathon featuring competitive and casual gaming sessions.",
    images: [
      "/assets/g_photos/one_g.jpg",
      "/assets/g_photos/two_g.jpg",
      "/assets/g_photos/three_g.jpg"
    ]
  },
  {
    id: 3,
    title: "Fall Guyz Tournament GDGSC",
    date: "May 30, 2024",
    description: "Our annual obstacle course competition with teams battling for the championship.",
    images: [
      "/images/tournament1.jpg",
      "/images/tournament2.jpg",
      "/images/tournament3.jpg"
    ]
  }
];

const Timeline = () => {
  const [activeEvent, setActiveEvent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(null);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating && hoveredDot === null) {
        setDirection(1);
        setActiveEvent((prev) => (prev + 1) % timelineEvents.length);
        setIsAnimating(true);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating, hoveredDot]);

  const handleEventChange = (index) => {
    if (index === activeEvent || isAnimating) return;
    setDirection(index > activeEvent ? 1 : -1);
    setActiveEvent(index);
    setIsAnimating(true);
  };

  const handleDotHover = (index) => {
    setHoveredDot(index);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (index !== activeEvent && !isAnimating) {
        setDirection(index > activeEvent ? 1 : -1);
        setActiveEvent(index);
        setIsAnimating(true);
      }
    }, 600);
  };

  const handleDotLeave = () => {
    setHoveredDot(null);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleAnimationComplete = () => {
    setIsAnimating(false);
  };

  const indicatorPosition = `${(activeEvent / (timelineEvents.length - 1)) * 100}%`;

  return (
    <section className="fantasy-gallery">
      {/* Parchment texture overlay */}
      <div className="parchment-overlay"></div>
      
      {/* Decorative border elements */}
      <div className="border-decoration top"></div>
      <div className="border-decoration bottom"></div>
      
      <div className="timeline-divider"></div>
      
      <div className="galleryT-container">
        <div className="header-section">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="galleryT-title"
          >
            <FaScroll className="title-icon left" />
            Timeline
            <FaScroll className="title-icon right" />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="galleryT-subtitle"
          >
Relive our journey through these memorable events

</motion.p>
        </div>

        {/* Timeline Navigation */}
        <div className="timeline-navigation">
          <div className="timeline-track">
            <motion.div 
              className="timeline-indicator"
              initial={{ width: "0%" }}
              animate={{ width: indicatorPosition }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            <div className="timeline-dots">
              {timelineEvents.map((event, index) => (
                <button
                  key={event.id}
                  onClick={() => handleEventChange(index)}
                  onMouseEnter={() => handleDotHover(index)}
                  onMouseLeave={handleDotLeave}
                  className={`timeline-dot ${index === activeEvent ? 'active-dot' : ''}`}
                  aria-label={`View ${event.title}`}
                >
                  <span className="sr-only">{event.title}</span>
                  {index === activeEvent && <FaCrown className="crown-icon" />}
                </button>
              ))}
            </div>
          </div>
          
          <div className="timeline-labels">
            {timelineEvents.map((event, index) => (
              <div 
                key={event.id}
                className={`timeline-label ${index === activeEvent ? 'active-label' : ''}`}
              >
                <h3 className="eventT-title">{event.title}</h3>
                <p className="eventT-date">{event.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Event Content */}
        <div className="eventT-display">
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={timelineEvents[activeEvent].id}
              custom={direction}
              initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              onAnimationComplete={handleAnimationComplete}
              className="eventT-content"
            >
              <div className="eventT-header">
                <motion.h3 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="eventT-name"
                >
                  <FaDragon className="dragon-icon" />
                  {timelineEvents[activeEvent].title}
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="eventT-time"
                >
                  {timelineEvents[activeEvent].date}
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="eventT-description"
                >
                  {timelineEvents[activeEvent].description}
                </motion.p>
              </div>

              <div className="eventT-gallery">
                <div className="galleryT-grid">
                  {timelineEvents[activeEvent].images.map((img, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ 
                        duration: 0.6,
                        delay: 0.5 + (index * 0.1),
                        ease: "backOut"
                      }}
                      className="galleryT-item"
                    >
                      <img
                        src={img}
                        alt={`${timelineEvents[activeEvent].title} ${index + 1}`}
                        className="galleryT-image"
                        loading="lazy"
                      />
                      <div className="image-caption">
                        <span>{timelineEvents[activeEvent].title} - Memory {index + 1}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="galleryT-controls">
          <button
            onClick={() => {
              if (!isAnimating) {
                setDirection(-1);
                setActiveEvent((prev) => (prev - 1 + timelineEvents.length) % timelineEvents.length);
                setIsAnimating(true);
              }
            }}
            disabled={isAnimating}
            className="nav-button prev"
          >
            <FaChessKnight className="knight-icon" />
            <span>Previous</span>
          </button>
          
          <button
            onClick={() => {
              if (!isAnimating) {
                setDirection(1);
                setActiveEvent((prev) => (prev + 1) % timelineEvents.length);
                setIsAnimating(true);
              }
            }}
            disabled={isAnimating}
            className="nav-button next"
          >
            <span>Next</span>
            <FaChessKnight className="knight-icon flipped" />
          </button>
        </div>
      </div>

      {/* Magical decorative elements */}
      <div className="magic-effects">
        {[...Array(8)].map((_, i) => (
          <motion.div 
            key={i}
            className="magic-orb"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.4, 0],
              scale: [0, 1, 0],
              x: [`${Math.random() * 100 - 50}px`, `${Math.random() * 100 - 50}px`],
              y: [`${Math.random() * 100 - 50}px`, `${Math.random() * 100 - 50}px`]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <style jsx>{`
        .fantasy-gallery {
          position: relative;
          min-height: 100vh;
          padding: 4rem 2rem;
          color: #e8d8a0;
          font-family: 'MedievalSharp', 'Times New Roman', serif;
          background: 
            radial-gradient(ellipse at center, #1a1200 0%, #000 100%),
            url('https://www.transparenttextures.com/patterns/old-map.png');
          overflow: hidden;
        }
        
        .parchment-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('https://www.transparenttextures.com/patterns/parchment.png');
          opacity: 0.08;
          pointer-events: none;
        }
        
        .border-decoration {
          position: absolute;
          left: 0;
          right: 0;
          height: 30px;
          background: url('https://www.transparenttextures.com/patterns/gold-scale.png');
          border-top: 1px solid #d4af37;
          border-bottom: 1px solid #d4af37;
          opacity: 0.3;
        }
        
        .border-decoration.top {
          top: 0;
        }
        
        .border-decoration.bottom {
          bottom: 0;
        }
        
        .timeline-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(to right, transparent, #d4af37, transparent);
          margin: 3rem 0;
          opacity: 0.5;
        }
        
        .galleryT-container {
          position: relative;
          z-index: 1;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .header-section {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .galleryT-title {
          font-size: 3rem;
          font-weight: 700;
          color: #d4af37;
          margin-bottom: 1rem;
          letter-spacing: 3px;
          text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        
        .title-icon {
          color: #d4af37;
          font-size: 2rem;
        }
        
        .galleryT-subtitle {
          font-size: 1.2rem;
          color: #a67c00;
          max-width: 600px;
          margin: 0 auto;
          font-style: italic;
        }
        
        /* Timeline Navigation */
        .timeline-navigation {
          margin-bottom: 3rem;
        }
        
        .timeline-track {
          position: relative;
          height: 4px;
          background-color: #3d2c0d;
          border-radius: 2px;
          margin: 0 2rem;
        }
        
        .timeline-indicator {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(to right, #d4af37, #f1c40f);
          border-radius: 2px;
          box-shadow: 0 0 10px rgba(212, 175, 55, 0.7);
        }
        
        .timeline-dots {
          position: absolute;
          top: -12px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
        }
        
        .timeline-dot {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #3d2c0d;
          border: 2px solid #5a4a1a;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .timeline-dot:hover {
          background: #5a4a1a;
          transform: scale(1.1);
        }
        
        .active-dot {
          background: #d4af37;
          border-color: #f1c40f;
          transform: scale(1.2);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.8);
        }
        
        .crown-icon {
          color: #1a1200;
          font-size: 12px;
        }
        
        .timeline-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
          padding: 0 1rem;
        }
        
        .timeline-label {
          text-align: center;
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }
        
        .active-label {
          opacity: 1;
        }
        
        .eventT-title {
          font-size: 1rem;
          color: #d4af37;
          margin-bottom: 0.3rem;
        }
        
        .eventT-date {
          font-size: 0.8rem;
          color: #a67c00;
          font-style: italic;
        }
        
        /* Event Content */
        .eventT-display {
          position: relative;
          height: 70vh;
          overflow: hidden;
          border-radius: 8px;
          border: 1px solid #5a4a1a;
          background: rgba(26, 18, 0, 0.5);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .eventT-content {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          padding: 2rem;
          display: flex;
          flex-direction: column;
        }
        
        .eventT-header {
          margin-bottom: 1em;
        }
        
        .eventT-name {
          font-size: 2rem;
          color: #d4af37;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .dragon-icon {
          color: #a67c00;
        }
        
        .eventT-time {
          font-size: 1.1rem;
          color: #a67c00;
          font-style: italic;
        }
        
        .eventT-description {
          font-size: 1rem;
          color: #e8d8a0;
          max-width: 800px;
        }
        
        .eventT-gallery {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
        }
        
        .galleryT-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .galleryT-item {
          position: relative;
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid #5a4a1a;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.3s ease;
        }
        
        .galleryT-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.4), 0 0 15px rgba(212, 175, 55, 0.3);
        }
        
        .galleryT-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .galleryT-item:hover .galleryT-image {
          transform: scale(1.05);
        }
        
        .image-caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          padding: 1rem;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
        }
        
        .galleryT-item:hover .image-caption {
          opacity: 1;
          transform: translateY(0);
        }
        
        .image-caption span {
          color: white;
          font-size: 0.9rem;
        }
        
        /* Navigation Controls */
        .galleryT-controls {
          display: flex;
          justify-content: space-between;
          margin-top: 2rem;
          gap: 1rem;
        }
        
        .nav-button {
          flex: 1;
          padding: 1rem 2rem;
          border: none;
          border-radius: 4px;
          font-family: 'MedievalSharp', serif;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          position: relative;
          overflow: hidden;
        }
        
        .nav-button.prev {
          background: linear-gradient(to right, #3d2c0d, #5a4a1a);
          color: #d4af37;
          border: 1px solid #5a4a1a;
        }
        
        .nav-button.next {
          background: linear-gradient(to left, #3d2c0d, #5a4a1a);
          color: #d4af37;
          border: 1px solid #5a4a1a;
        }
        
        .nav-button:hover {
          background: linear-gradient(to right, #5a4a1a, #7a6a3a);
          color: #f1c40f;
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.3);
        }
        
        .nav-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .nav-button:disabled:hover {
          background: linear-gradient(to right, #3d2c0d, #5a4a1a);
          color: #d4af37;
          box-shadow: none;
        }
        
        .knight-icon {
          font-size: 1.2rem;
        }
        
        .knight-icon.flipped {
          transform: scaleX(-1);
        }
        
        /* Magical Effects */
        .magic-effects {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        
        .magic-orb {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.8), transparent 70%);
          filter: blur(15px);
        }
      `}</style>
    </section>
  );
};

export default Timeline;

// import React from 'react'

// const timeline = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default timeline
