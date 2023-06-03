import React from "react";
import './Nav.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Nav(){
    return(
    <nav>
        <ul className="nav-li">
            <li><FontAwesomeIcon id="doctor-logo" icon="fa-solid fa-stethoscope" /></li>
            <li>Admin Dashboard</li>
        </ul>
    </nav>
    )
}
export default Nav;