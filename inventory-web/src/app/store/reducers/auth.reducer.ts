import { User } from 'src/app/models/user';
import { All, AuthActionTypes } from '../actions/auth.action';

export interface State {
    isAuthenticated: boolean;

    user: User | null;

    errorMessage: string | null;

    successMessage: string | null;
}

export const initialState: State = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    successMessage: null,
}

export function reducer(state = initialState, action: All): State {
    const { token, email, error, message } = action.payload || {};
    switch(action.type) {
        case AuthActionTypes.LOGIN_SUCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: {
                    ...(state.user || {}),
                    token, email,
                },
                errorMessage: null,
                successMessage: message,
            };
        case AuthActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                errorMessage: error,
            };
        case AuthActionTypes.MESSAGE:
        case AuthActionTypes.REGISTER_SUCCESS:    
            return {
                ...state,
                successMessage: message, 
            };  
        case AuthActionTypes.LOGOUT:
            return {
                ...state,
                ...initialState,
                successMessage: "User have been logged out successfully",
            };              
        default:
            return state;    
    }
}