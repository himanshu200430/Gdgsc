import React from 'react'
import Frame from './Frame/Frame'
import Button from './Frame/Button'

const Faculty = () => {
  return (
    <div style={{padding:"60px"}}>
        <div style={{width:"fit-content"}}>
        <h1 style={{position:"relative"}}>Our Faculty Council
        </h1>
        <div style={{width:"100%",height:"2px", background:"radial-gradient(transparent,transparent,gold,transparent,transparent)"}}></div>
        </div>


        <div style={{marginTop:"50px",width:"100%",justifyContent:"center",display:"flex",position:"relative",gap:"60px",flexWrap:"wrap"}}>
            <Frame>
                <div style={{padding:"10px 40px", display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",textAlign:"center"}}>
                <img src='/images/mam/jyoti_mam.jpg' width={"200px"}></img>
                <div style={{fontSize:"1.2em",fontWeight:"600"}}>
                    Dr. Jyoti
                </div>
                <div>
                Faculty Coordinator 1


                </div>
                </div>
            </Frame>

            <Frame>
                <div style={{padding:"10px 40px", display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",textAlign:"center"}}>
                <img src='/images/mam/renu_mam.jpg' width={"200px"}></img>
                <div style={{fontSize:"1.2em",fontWeight:"600"}}>
                    Dr. Renu Dalal
                </div>
                <div>
                Faculty Coordinator 2


                </div>
                </div>
            </Frame>

        </div>
        <div style={{width:"100%",display:"flex",justifyContent:"center",marginTop:"40px"}}>
<Button text="View all teams"></Button>
</div>

    </div>
  )
}

export default Faculty
