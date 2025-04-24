import React from 'react'
import Button from '../Components/Button'
// import image from '/ima'

const Home = () => {
  return (
    <div style={{height:"100vh", width:"100vw", display:"flex"}}>
      <div className='home-text'>
        <h1 style={{ fontWeight:"800", color:"white", marginTop:"180px"}}>
            Welcome to
            <br />
            <span>
                GDGSC
            </span>
        </h1>
        <p>
                Where Gamers and creators come together to Build, Play and Grow!
            </p>

<div style={{marginTop:"40px", display:"flex", gap:"60px",marginLeft:"20px"}}>
<Button text="Join Community"></Button>
<Button text="Become Partner"></Button>
</div>
      </div>
      <div className='home-image' style={{position:"absolute",right:"0px",width:"60vw",height:"100vh", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <img src='/images/home.webp' height="100%" width={"100%"} style={{objectFit:"cover",objectPosition:"top"}} alt="home" />
      </div>
    </div>
  )
}

export default Home
