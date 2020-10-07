import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/services/auth.service';

import { AuthActionTypes, Login, LoginSuccess, LoginFailure, Register, Message, RegisterFailure, RegisterSuccess } from '../actions/auth.action';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthEffect {
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
        private cookieService: CookieService,
    ) {}

    @Effect()
    Login: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN),
        map((action: Login) => action.payload),
        switchMap(payload => {
            return this.authService.login(payload.email, payload.password).pipe(
                map(user => {
                    // console.log(user);
                    return new LoginSuccess({token: user.token, email: payload.email, message: "User have been logged in successfully." });
                }),
                catchError(err => {
                    return of(new LoginFailure({error: err.error.reason }));
                })
            );
        })  
    );

    @Effect({ dispatch: false })
    LoginSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCESS),
        tap(user => {
            this.cookieService.set("access-token", user.payload.token);
            this.router.navigateByUrl("/");
        })
    );
    
    @Effect({ dispatch: false }) 
    LoginFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect()
    Register: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.REGISTER),
        map((action: Register) => action.payload),
        switchMap(payload => {
            return this.authService.register(payload.name, payload.email, payload.password).pipe(
                map(user => {
                    return new RegisterSuccess({message: "User have been registered successfully" });
                }),
                catchError(err => {
                    return of(new RegisterFailure({error: err.error.reason }));
                })
            )
        })  
    );

    @Effect({ dispatch: false })
    RegisterSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.REGISTER_SUCCESS),
        tap(payload => {
            this.router.navigateByUrl("/login");
        })
    );

    @Effect({ dispatch: false })
    RegisterFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.REGISTER_FAILURE)
    );
    
    @Effect({ dispatch: false })
    Message: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.MESSAGE)
    );

    @Effect({ dispatch: false })
    Logout: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGOUT),
        tap(payload => {
            this.cookieService.delete("access-token");
            this.router.navigateByUrl("/login");
        })
    )
}