import React from 'react'
import Counter from '../Components/Counter'
import Border from '../Components/Frame/border'
import Carousel from '../Components/Carousel/Carousel'

const About = () => {
  return (
    <div style={{paddingTop:"140px",padding:"60px"}}>

<div style={{width:"fit-content"}}>
        <h1 style={{position:"relative"}}>About GDGSC
        </h1>
        <div style={{width:"100%",height:"2px", background:"radial-gradient(transparent,transparent,gold,transparent,transparent)"}}></div>
        </div>
            <div style={{display:"flex",alignItems:"center",marginBottom:"60px"}} className='about'>
        <div>
            <p>Welcome to GDGSC (GameDev Guild Students Club) at University School Of Automation And Robotics, East Delhi Campus! We are a vibrant tech society designed for passionate students interested in game development, design, and interactive media. Our mission is to foster collaboration, innovation, and creativity by bringing together like-minded individuals to work on exciting game development projects and Game related Events.</p>
        
            <div style={{fontFamily:"arial",display:"flex",gap:"40px",width:"100%",justifyContent:"center"}}>
                <div style={{display:"flex",flexDirection:"column",gap:"4px",alignItems:"center",textAlign:"center"}}>
                    <span style={{display:"flex",fontSize:"2.8em",fontWeight:"600",color:"rgb(207, 85, 237)"}}><Counter target={60} duration={1000} /> +</span>
                    <span> Team members</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"4px",alignItems:"center",textAlign:"center"}}>
                    <span style={{display:"flex",fontSize:"2.8em",fontWeight:"600",color:"rgb(207, 85, 237)"}}><Counter target={1} duration={500} /> +</span>
                    <span> Years of existence</span>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:"4px",alignItems:"center",textAlign:"center"}}>
                    <span style={{display:"flex",fontSize:"2.8em",fontWeight:"600",color:"rgb(207, 85, 237)"}}><Counter target={200} duration={1000} /> +</span>
                    <span> Community Members</span>
                </div>
            </div>
        </div>
        <div>
            <img src="/assets/logos/About.jpeg" className="discordImage" alt="About"></img>
        </div>
      
    </div>

    <div className="contest-container">
    <Border h2={"CONTESTS"} p={"Exciting game development competitions"} icon={"🏆"}></Border>
   <Border h2={"GAMEATHONS"} p={"Intensive game creation marathons"} icon={"⚔️"}></Border>
   <Border h2={"EVENTS"} p={"Insightful sessions from experts"} icon={"📜"}></Border>
   <Border h2={"WORKSHOPS"} p={"Hands-on learning experiences"} icon={"🛠️"}></Border>
   </div>
    </div>
  )
}

export default About
