import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Is it free to participate in this hackathon?",
      answer: "Yes, you can register and participate for free.",
    },
    {
      question: "What is the eligibility criteria for participation?",
      answer:
        "The hackathon is open to all undergraduate and graduate students from recognized institutions",
    },
    {
      question: "Can students from other colleges participate?",
      answer:
        "Absolutely! We encourage participation from students across different colleges and universities.",
    },
    {
      question: "Are non-USAR students allowed to attend on-campus events?",
      answer:
        "Yes, non-USAR students can attend on-campus events with valid student ID and prior registration.",
    },
    {
      question: "Can we form inter-college teams?",
      answer:
        "Yes, you're welcome to form teams with participants from different colleges.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container" style={{ padding: "60px" }}>
      {/* Background elements */}
      <div className="background-elements">
        <div className="bg-element bg-purple-1"></div>
        <div className="bg-element bg-purple-2"></div>
        <div className="bg-element bg-purple-3"></div>
        <div className="bg-element bg-purple-4"></div>
      </div>

      {/* Separator line */}
      <div className="separator-line"></div>

      {/* FAQ Content */}
      <div className="faq-content">
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: "fit-content" }}>
            <h1 style={{ position: "relative" }}>Frequently Asked (FAQ's)</h1>
            <div
              style={{
                width: "100%",
                height: "2px",
                background:
                  "radial-gradient(transparent, transparent, gold, transparent, transparent)",
              }}
            ></div>
          </div>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
            >
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                <div className="question-content">
                  <svg
                    className="question-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="question-text">{faq.question}</h3>
                </div>
                <span className="question-arrow">
                  {activeIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                </span>
              </button>

              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom separator line */}
        <div className="separator-line bottom"></div>
      </div>

      <style jsx>{`
        .faq-container {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
        }

        .bg-element {
          position: absolute;
          border-radius: 50%;
        }

        .faq-content {
          position: relative;
          z-index: 10;
          margin: 0 auto;
        }

        @media (min-width: 640px) {
          .faq-content {
            padding: 3rem 1.5rem;
          }
        }

        @media (min-width: 1024px) {
          .faq-content {
            padding: 3rem 2rem;
          }
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          margin-top: 40px;
        }

        .faq-item {
          background-color: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(24px);
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06);
          overflow: hidden;
          transition: all 0.3s ease;
          width: 100%;
          max-width: 500px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .faq-item:hover {
          border-color: gold;
        }

        .faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          text-align: left;
          min-height: 40px;
          background: none;
          border: none;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .faq-question:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .question-content {
          display: flex;
        }

        .question-icon {
          width: 1.25rem;
          height: 1.25rem;
          margin-right: 0.75rem;
          color: rgba(255, 215, 0, 0.8);
          transition: color 0.2s ease;
        }

        .faq-item:hover .question-icon {
          color: rgb(255, 215, 0);
        }

        .question-text {
          font-size: 1rem;
          font-weight: 500;
          color: white;
          padding-right: 0.5rem;
          flex: 1;
          transition: color 0.2s ease;
        }

        .faq-item:hover .question-text {
          color: rgba(243, 232, 255, 1);
        }

        .question-arrow {
          color: rgba(255, 215, 0, 0.8);
          font-size: 1.125rem;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .faq-item:hover .question-arrow {
          color: rgb(255, 215, 0);
        }

        .faq-answer {
          padding: 1rem;
          padding-top: 0.5rem;
          background-color: rgba(255, 215, 0, 0.2);
          border-top: 1px solid rgba(192, 132, 252, 0.2);
          color: rgba(243, 232, 255, 1);
          font-size: 0.875rem;
          max-height: 200px;
        }

        .faq-answer p {
          line-height: 1.625;
        }
      `}</style>
    </div>
  );
};

export default FAQ;
