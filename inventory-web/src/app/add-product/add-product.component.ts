import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { AppState, productState } from '../store/app.states';
import { Store } from '@ngrx/store';
import { AddProduct } from '../store/actions/product.action';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product();
  getState: Observable<any>;
  errorMessage: string;

  @Output() displayForm = new EventEmitter();
  @Output() hideError = new EventEmitter();

  constructor(private store: Store<AppState>) { 
    this.getState = this.store.select(productState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      this.errorMessage = state.errorMessage;
    }); 
  }

  onSubmit(): void {
    this.store.dispatch(new AddProduct({...this.product}));
    this.displayForm.emit();
    this.hideError.emit();
  }
}
