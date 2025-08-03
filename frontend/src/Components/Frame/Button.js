import React from 'react'
import './button.css'

const Button = ({text}) => {
  return (
    <div>
      <button className="fantasy-btn-3xl fantasy-bone-n-coper">
  <span>{text}</span>
</button>
    </div>
  )
}

export default Button
