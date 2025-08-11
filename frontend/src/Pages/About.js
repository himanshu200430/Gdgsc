import React from "react";
import Counter from "../Components/Counter";
import Border from "../Components/Frame/border";


const About = () => {
  return (
    <div style={{ paddingTop: "140px", padding: "60px" }}>
      <div style={{ width: "fit-content" }}>
        <h1 style={{ position: "relative" }}>About GDGSC</h1>
        <div
          style={{
            width: "100%",
            height: "2px",
            background:
              "radial-gradient(transparent,transparent,gold,transparent,transparent)",
          }}
        ></div>
      </div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "60px" }}
        className="about"
      >
        <div>
          <p style={{ paddingBottom: "2rem", color: "white" }}>
            Welcome to GDGSC (GameDev Guild Students Club) at University School
            Of Automation And Robotics, East Delhi Campus! We are a vibrant tech
            society designed for passionate students interested in game
            development, design, and interactive media. Our mission is to foster
            collaboration, innovation, and creativity by bringing together
            like-minded individuals to work on exciting game development
            projects and Game related Events.
          </p>

          <div
            style={{
              fontFamily: "arial",
              display: "flex",
              gap: "40px",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "center",
                textAlign: "center",
                padding: "20px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                transform: "translateY(0)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                animation: "fadeInUp 0.8s ease-out",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-10px) scale(1.05)";
                e.target.style.boxShadow = "0 20px 40px rgba(248, 111, 19, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              <span
                style={{
                  display: "flex",
                  fontSize: "3.2em",
                  fontWeight: "700",
                  color: "white",
                  textShadow: "0 0 20px rgba(248, 111, 19, 0.8), 0 0 40px rgba(248, 111, 19, 0.4)",
                  animation: "glow 2s ease-in-out infinite alternate",
                }}
              >
                <Counter target={60} duration={1000} /> +
              </span>
              <span style={{ 
                color: "rgba(255, 255, 255, 0.9)", 
                fontWeight: "500",
                fontSize: "1.1em",
                letterSpacing: "1px"
              }}> Team members</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "center",
                textAlign: "center",
                padding: "20px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                transform: "translateY(0)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                animation: "fadeInUp 0.8s ease-out 0.2s both",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-10px) scale(1.05)";
                e.target.style.boxShadow = "0 20px 40px rgba(218, 218, 218, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              <span
                style={{
                  display: "flex",
                  fontSize: "3.2em",
                  fontWeight: "700",
                  color: "white",
                  textShadow: "0 0 20px rgba(218, 218, 218, 0.8), 0 0 40px rgba(218, 218, 218, 0.4)",
                  animation: "glow 2s ease-in-out infinite alternate 0.5s",
                }}
              >
                <Counter target={1} duration={500} /> +
              </span>
              <span style={{ 
                color: "rgba(255, 255, 255, 0.9)", 
                fontWeight: "500",
                fontSize: "1.1em",
                letterSpacing: "1px"
              }}> Years of existence</span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                alignItems: "center",
                textAlign: "center",
                padding: "20px",
                borderRadius: "15px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                transform: "translateY(0)",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                animation: "fadeInUp 0.8s ease-out 0.4s both",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-10px) scale(1.05)";
                e.target.style.boxShadow = "0 20px 40px rgba(22, 150, 10, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.3)";
              }}
            >
              <span
                style={{
                  display: "flex",
                  fontSize: "3.2em",
                  fontWeight: "700",
                  color: "white",
                  textShadow: "0 0 20px rgba(22, 150, 10, 0.8), 0 0 40px rgba(22, 150, 10, 0.4)",
                  animation: "glow 2s ease-in-out infinite alternate 1s",
                }}
              >
                <Counter target={200} duration={1000} /> +
              </span>
              <span style={{ 
                color: "rgba(255, 255, 255, 0.9)", 
                fontWeight: "500",
                fontSize: "1.1em",
                letterSpacing: "1px"
              }}> Community Members</span>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/assets/logos/About.jpeg"
            className="discordImage"
            alt="About"
            style={{zIndex: 1}}
          ></img>
        </div>
      </div>

      <div className="contest-container">
  <Border
    h2={"GAMEATHONS"}
    icon={"🎮"}
    p={
      <ul className="list-disc pl-5 space-y-1" style={{ marginTop: "1rem", color: "white" }}>
        <li>Build games under time pressure.</li>
        <li>Collaborate with devs and designers.</li>
        <li>Compete and showcase your talent.</li>
        <li>Boost creativity and teamwork.</li>
        <li>Strengthen your game dev portfolio.</li>
      </ul>
    }
  ></Border>

  <Border
    h2={"CONTESTS"}
    icon={"🏆"}
    p={
      <ul className="list-disc pl-5 space-y-1" style={{ marginTop: "1rem", color: "white" }}>
        <li>Test your game development skills.</li>
        <li>Compete with top talent.</li>
        <li>Win prizes and recognition.</li>
        <li>Solve theme-based challenges.</li>
        <li>Boost resume with achievements.</li>
      </ul>
    }
  ></Border>

  <Border
    h2={"EVENTS"}
    icon={"📃"}
    p={
      <ul className="list-disc pl-5 space-y-1" style={{ marginTop: "1rem", color: "white" }}>
        <li>Learn from industry experts.</li>
        <li>Explore trends and technologies.</li>
        <li>Attend keynotes and panels.</li>
        <li>Participate in Q&As.</li>
        <li>Gain insights into game development.</li>
      </ul>
    }
  ></Border>

  <Border
    h2={"WORKSHOPS"}
    icon={"🗣️"}
    p={
      <ul className="list-disc pl-5 space-y-1" style={{ marginTop: "1rem", color: "white" }}>
        <li>Gain hands-on experience.</li>
        <li>Learn tools and techniques.</li>
        <li>Build mini-projects live.</li>
        <li>Level up your dev skills.</li>
        <li>Get personalized guidance.</li>
        <li>Receive feedback on your projects.</li>
      </ul>
    }
  ></Border>
</div>

    </div>
  );
};

export default About;







