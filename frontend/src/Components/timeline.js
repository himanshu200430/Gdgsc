import React from "react";
import Carousel from "./Carousel/Carousel";
import "./Carousel/Carousel.css";
const Timeline = () => {
  const timelineEvents = [
    {
      id: 1,
      title: "GDGSC Orientation",
      date: "March 15, 2024",
      description:
        "The opening event where we introduced our gallery space and concept to the public.",
      images: [
        "/assets/g_photos/one.jpg",
        "/assets/g_photos/two.jpg",
        "/assets/g_photos/three.jpg",
        "/assets/g_photos/four.jpg",
        "/assets/g_photos/five.jpg",
        "/assets/g_photos/six.jpg",
      ],
    },
    {
      id: 2,
      title: "Gamethon 2024 GDGSC",
      date: "April 22, 2024",
      description:
        "24-hour gaming marathon featuring competitive and casual gaming sessions.",
      images: [
        "/assets/g_photos/one_g.jpg",
        "/assets/g_photos/two_g.jpg",
        "/assets/g_photos/three_g.jpg",
      ],
    },
    {
      id: 3,
      title: "Fall Guyz Tournament GDGSC",
      date: "May 30, 2024",
      description:
        "Our annual obstacle course competition with teams battling for the championship.",
      images: [],
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "fit-content" }}>
          <h1 style={{ position: "relative" }}>Past Events</h1>
          <div
            style={{
              width: "100%",
              height: "2px",
              background:
                "radial-gradient(transparent, transparent, gold, transparent, transparent)",
              marginBottom: "2rem",
            }}
          ></div>
        </div>
      </div>
      <Carousel />
    </div>
  );
};

export default Timeline;
