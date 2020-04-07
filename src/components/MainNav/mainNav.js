import React from 'react'
import {Link} from 'react-router-dom'
import './mainNav.css'


const MainNav = () => {



    return (
        <nav className={"mainNav"}>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/statistics">Statistics</Link>
                </li>
            </ul>
        </nav>

    )
}

export default MainNav;