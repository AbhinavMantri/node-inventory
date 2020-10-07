import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, authState } from '../store/app.states';
import { Message } from '../store/actions/auth.action';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  getState: Observable<any>;
  successMessage: string;
  
  constructor(private store: Store<AppState>) { 
    this.getState = this.store.select(authState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      this.successMessage = state.successMessage;
    }); 
  }

  messageClose(): void {
    this.store.dispatch(new Message({message: null}));
  }
}
