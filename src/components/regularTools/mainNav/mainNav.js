import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from "react-redux";


const MainNav = () => {

    const currentPath = useSelector( state => state.router.location.pathname);

    return (
        <nav className={"main-nav"}>
            <ul className={"main-nav__list"}>
                {currentPath === "/" &&

                    <li className={"main-nav__list-item"}>
                        <Link to="/statistics" className={"main-nav__link"}>
                            <i className={"icon-analytics-1 main-nav__link-icon"} ></i>
                        </Link>
                    </li>

                }
                {currentPath === "/statistics" &&
                    <li className={"main-nav__list-item"}>
                        <Link to="/" className={"main-nav__link"}>
                            <i className={"icon-property main-nav__link-icon"}></i>
                        </Link>
                    </li>
                }
            </ul>
        </nav>

    )
}

export default MainNav;