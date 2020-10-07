import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState, authState } from '../store/app.states';
import { Login } from '../store/actions/auth.action';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  getState: Observable<any>;
  errorMessage: string;

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(authState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    this.store.dispatch(new Login({email: this.user.email, password: this.user.password}));
  }
}
