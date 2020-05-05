import axios from 'axios';
import * as action_type from "../action_type";
import {fetchStore} from "../actions";
import { push } from 'connected-react-router'


export const loginHandler = user => {
    return dispatch => {
        _doRequest('login',user).then(response => {
            localStorage.setItem("token", response.data.jwt);
            dispatch(setLogIn());
            dispatch(fetchStore());
            dispatch(push('/'))
        });

    }
};

export const registrationHandler = user => {
    return dispatch => {
        _doRequest('create_user',user).then(response => {
        }).then(() => {
            dispatch(setLogIn());
        });
    }
};

export const logOutHandler = () => {
    return dispatch => {
        localStorage.removeItem('token');
        window.location.href = '/login';
        dispatch(setLogOut());
    }
};

export const setLogIn = () => ({
    type: action_type.LOGIN_USER,
});

export const setLogOut = () => ({
    type: action_type.LOGOUT_USER,
});

export const setRedirectToLogIn = () => ({
    type: action_type.SET_REDIRECT_TO_LOGIN,
});

const _doRequest = (type,data) => {
    let url = 'http://vlad6432.zzz.com.ua/time/authentication-jwt/';
    switch (type) {
        case 'login':
            url += 'login.php';
            break;
        case 'create_user':
            url += 'create_user.php';
            break;
        case 'validate_token':
            url += 'validate_token.php';
            break;
    }
    return axios({
                method: 'POST',
                url,
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                data
        })
}