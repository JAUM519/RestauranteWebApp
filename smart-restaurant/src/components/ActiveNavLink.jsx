import React from "react";
import { NavLink } from 'react-router-dom'

export default function ActiveNavLink({ className = '', activeClass = '', ...props }) {
    return (
        <NavLink
            {...props}
            className={({ isActive }) => [className, isActive ? activeClass : ''].filter(Boolean).join(' ')}
            aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
        />
    )
}
