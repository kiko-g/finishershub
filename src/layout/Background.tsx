import React from 'react'
import '../styles/animation.css'

type Props = {}

export const Background: React.FC<Props> = () => {
  return (
    <div className="background-wrapper">
      <div className="background-area">
        <ul className="background-circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </div>
  )
}
