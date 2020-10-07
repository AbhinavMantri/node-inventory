import { Action } from '@ngrx/store'; 

export enum AuthActionTypes {
    LOGIN = "[Auth] Login",
    LOGIN_SUCESS = "[Auth] Login Success",
    LOGIN_FAILURE = '[Auth] Login Failure',
    REGISTER = '[Auth] Register',
    MESSAGE = '[Auth] Message',
    REGISTER_SUCCESS = '[Auth] Register Success',
    REGISTER_FAILURE = '[Auth] Register Failure',
    LOGOUT = '[Auth] Logout',
    LOGOUT_SUCCESS = '[Auth] Logout Success',
};

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;

    constructor(public payload: any) {}
}

export class Register implements Action {
    readonly type = AuthActionTypes.REGISTER;

    constructor(public payload: any) {}
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCESS;

    constructor(public payload: any) {}
}

export class LoginFailure implements Action {
    readonly type = AuthActionTypes.LOGIN_FAILURE;

    constructor(public payload: any) {}
}

export class RegisterSuccess implements Action {
    readonly type = AuthActionTypes.REGISTER_SUCCESS;

    constructor(public payload: any) {}
}

export class RegisterFailure implements Action {
    readonly type = AuthActionTypes.REGISTER_FAILURE;

    constructor(public payload: any) {}
}

export class Message implements Action {
    readonly type = AuthActionTypes.MESSAGE;

    constructor(public payload: any) {}
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;

    constructor(public payload: any) {}
}

export type All = 
    | Login
    | LoginSuccess
    | LoginFailure
    | Register
    | Message
    | RegisterFailure
    | RegisterSuccess
    | Logout;