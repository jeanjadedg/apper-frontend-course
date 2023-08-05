import React from 'react'
import './sidebarButton.css'
import { Link } from 'react-router-dom'
import { IconContext } from 'react-icons'
import { useLocation } from 'react-router-dom'

export default function SidebarButton(props) {
    const location = useLocation()
    const isActive = location.pathname === props.to
    const btnClass = isActive ? "button-body active" : "button-body"

  return (
    <Link to={props.to}>
        <div className={btnClass}>
        <IconContext.Provider value={{size: "24px", className: "button-icon"}}>
            {props.icon}
            <p className='button-title'>{props.title}</p>
        </IconContext.Provider>
        </div>
    </Link>
  )
}
