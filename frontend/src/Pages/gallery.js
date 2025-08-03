import React from "react";
import "./gallery.css";

const images = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1517088455889-bfa75135412c?ixlib=rb-0.3.5&auto=format&fit=crop&w=749&q=80",
    alt: "City skyline",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1526656892012-7b336603ed46?ixlib=rb-0.3.5&auto=format&fit=crop&w=334&q=80",
    alt: "Person working",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1521024221340-efe7d7fa239b?ixlib=rb-0.3.5&auto=format&fit=crop&w=750&q=80",
    alt: "Camera equipment",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1523038793606-2fd28f837a85?ixlib=rb-0.3.5&auto=format&fit=crop&w=334&q=80",
    alt: "Workspace",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1516832970803-325be7a92aa5?ixlib=rb-0.3.5&auto=format&fit=crop&w=751&q=80",
    alt: "Office building",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1526938972776-11558ad4de30?ixlib=rb-0.3.5&auto=format&fit=crop&w=750&q=80",
    alt: "Notebook",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1517088455889-bfa75135412c?ixlib=rb-0.3.5&auto=format&fit=crop&w=749&q=80",
    alt: "City skyline",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1526656892012-7b336603ed46?ixlib=rb-0.3.5&auto=format&fit=crop&w=334&q=80",
    alt: "Person working",
  },
];

export default function Gallery() {
  return (
    <div className="gallery-container">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div style={{ width: "fit-content", textAlign: "center" }}>
          <h1
            style={{
              position: "relative",
              color: "rgb(255, 215, 0)",
              marginBottom: "0.5rem", // spacing between text and line
            }}
          >
            Gallery
          </h1>
          <div
            style={{
              width: "100%",
              height: "2px",
              background:
                "radial-gradient(transparent, transparent, gold, transparent, transparent)",
              marginBottom: "2rem", // spacing below the line
            }}
          ></div>
        </div>
      </div>

      <div className="photo-grid">
        {images.map((image) => (
          <div key={image.id} className="photo-item">
            <img src={image.src} alt={image.alt} className="photo-img" />
          </div>
        ))}
      </div>
    </div>
  );
}
