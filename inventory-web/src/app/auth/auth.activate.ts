// import { CanActivate } from '@angular/router';
// import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { AppState } from '../store/app.states';
// import { Observable } from 'rxjs';

// @Injectable()
// export class AuthActivate implements CanActivate {
//     getState: Observable<any>;

//     constructor(private store: Store<AppState>) {
//         this.getState = this.store.select(selectAuthState);
//     }

//     canActivate(): Observable<boolean> | Promise<boolean> | boolean {
//         this.getState.subscribe((state) => {
//            return state.isAuthenticated;
//         });
//     }
// }