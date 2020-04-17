import React from 'react';
import MainNav from "./MainNav/mainNav";
import LogOut from "./logOut/logOut";
import {connect} from "react-redux";


const Header = ({userStatus}) => {
    return (
        <header>
            <MainNav />
            {userStatus &&
                <LogOut />
            }

        </header>
    )
}

const mapStateToProps = (state) => {
    return {
        userStatus: state.user.isLogin,
    }
}

export default connect(mapStateToProps)(Header);