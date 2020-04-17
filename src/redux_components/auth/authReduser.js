const initialState = {
    isLogin:false,
    userInf: {

    },
    redirectToLogIn:false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER': {
            const newState = {
                ...state,
                isLogin:true,
            };
            return newState;
        }
        case 'LOGOUT_USER': {
            const newState = {
                ...state,
                isLogin:false,
            };
            return newState;
        }
        case 'SET_REDIRECT_TO_LOGIN': {
            const newState = {
                ...state,
                redirectToLogIn:true,
            };
            return newState;
        }
        default: return state;

    }
}

export  default authReducer;