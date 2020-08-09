import React from 'react';
import MainNav from "./mainNav/mainNav";
import LogOut from "./logOut/logOut";
import {connect} from "react-redux";
import './regularTools.css'


const RegularTools = ({userStatus}) => {
    return (
        <div className={"regular-tools"}>
            <MainNav />
            {userStatus &&
                <LogOut />
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userStatus: state.user.isLogin,
    }
}

export default connect(mapStateToProps)(RegularTools);