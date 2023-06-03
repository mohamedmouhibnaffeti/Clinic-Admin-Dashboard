import React from "react";
import './Footer.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function Footer(){
    return(
        <footer>
            <span>All rights reserved 2023 @ Clinic Manager</span>
            <hr></hr>
                <ul className="footer-icons">
                    <li id="footer-icon"><FontAwesomeIcon icon="fa-brands fa-github" /></li>
                    <li id="footer-icon"><FontAwesomeIcon icon="fa-brands fa-facebook" /></li>
                    <li id="footer-icon"><FontAwesomeIcon icon="fa-brands fa-square-instagram" /></li>
                    <li id="footer-icon"><FontAwesomeIcon icon="fa-brands fa-linkedin" /></li>
                </ul>
        </footer>
    )
}
export default Footer