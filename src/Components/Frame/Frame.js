import React from 'react'
import './frame.css'

const Frame = ({children}) => {
  return (
    <div>
      <div class="body dark-background">
      <div class="outer-border">
         <div class="mid-border">
            <div class="inner-border">
              <img class="corner-decoration corner-left-top" src="/assets/frame.png"></img>
              <img class="corner-decoration corner-right-top" src="/assets/frame.png"></img>
              <img class="corner-decoration corner-right-bottom" src="/assets/frame.png"></img>
              <img class="corner-decoration corner-left-bottom" src="/assets/frame.png"></img>
              {/* <img class="vertical-decoration top" src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"></img>
              <img class="vertical-decoration bottom" src="https://i.ibb.co/JRTK9z4/horizontally-centered-vertical-decoration.png"></img> */}

               {/* <!-- Page Content --> */}
               <div class="container">
                  <div class="row social-row">
                   

                  </div>
                  <div class="row">
                     <div class="col-lg-12 text-center">
                     <p class="lead skintone-text">
                           <span class="name skintone-text countach"></span>
                           <span class="place skintone-text tilda-petite"></span>
                        </p>

{children}
                        <p class="lead skintone-text">
                           <span class="name skintone-text countach"></span>
                           <span class="place skintone-text tilda-petite"></span>
                        </p>
                  
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
</div>
    </div>
  )
}

export default Frame
