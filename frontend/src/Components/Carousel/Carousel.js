import React, { useState, useEffect } from "react";
import "./Carousel.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Carousel = () => {
  return (
    <div class="card-3d">
      <div>
        <img src={"/assets/g_photos/one.webp"} height={200} width={150}></img>
      </div>
      <div>
        <img src={"/assets/g_photos/one_g.jpg"} height={200} width={150}></img>
      </div>
      <div>
        <img src={"/assets/g_photos/photo4.jpeg"} height={200} width={150}></img>
      </div>
      <div>
        <img src={"/assets/g_photos/two.jpg"} height={200} width={150}></img>
      </div>
      <div>
        <img src={"/assets/g_photos/one.webp"} height={200} width={150}></img>
      </div>
      <div>
        <img src={"/assets/g_photos/five.jpg"} height={200} width={150}></img>
      </div>
      <div>
        <img src={"/assets/g_photos/photo7.jpeg"} height={200} width={150}></img>
      </div>
      <div>
        <img src={"/assets/g_photos/photo3.jpeg"} height={200} width={150}></img>
      </div>
      <div>
        <img src={"/assets/g_photos/three.jpg"} height={200} width={150}></img>
      </div>
      <div>
        <img src={"/assets/g_photos/photo2.jpeg"} height={200} width={150}></img>
      </div>
    </div>
  );
};

export default Carousel;
