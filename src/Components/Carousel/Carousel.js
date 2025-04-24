import React, { useState, useEffect } from 'react';
import './Carousel.css';
import { FaChevronLeft,FaChevronRight } from "react-icons/fa";


const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const events = [
    {
      title: 'MIST',
      date: '14 October 2024',
      description: 'The Cryptic Hunt',
      image: 'images/events/past_event_1.jpg'
    },
    {
      title: 'IEEE DAY 2024',
      date: 'TBA',
      description: 'Celebrating the Newest Student Society of USAR GGSIPU EDC!',
      image: 'images/events/past_event_2.jpg'
    },
    {
      title: 'IEEExtreme',
      date: 'TBA',
      description: '24-hour global competition',
      image: 'images/events/past_event_1.jpg'
    },
  ];

  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="events-carousel">
      <div className="carousel-header">
        <h2>Past Events</h2>
        <div className="header-decoration"></div>
      </div>
      
      <div className="carousel-container">
        {events.map((event, index) => (
          <div 
            key={index}
            className={`event-card ${index === activeIndex ? 'active' : ''}`}
          >
            <div className="event-image-container">
              <img 
                src={event.image} 
                alt={event.title} 
                className="event-image"
              />
              <div className="image-overlay"></div>
            </div>
            
            <div className="event-content">
              <div className="event-date">{event.date}</div>
              <h3 className="event-title">{event.title}</h3>
              <p className="event-description">{event.description}</p>
            </div>
          </div>
        ))}

        <button className="carousel-nav prev" onClick={goToPrev}>
<FaChevronLeft></FaChevronLeft>
        </button>
        <button className="carousel-nav next" onClick={goToNext}>
<FaChevronRight />
        </button>

        <div className="carousel-indicators">
          {events.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;