import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, productState } from '../store/app.states';
import { Logout } from '../store/actions/auth.action';
import { GetProducts, DeleteProducts } from '../store/actions/product.action';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: Product[] | null;
  getState: Observable<any>;
  selected: number[] = [];
  showForm: boolean = false;
  errorMessage: string | null;

  constructor(private store: Store<AppState>) { 
    this.getState = this.store.select(productState);
  }

  ngOnInit(): void {
    this.getState.subscribe(state => {
      this.products = state.list;
    });

    this.requestProducts();
  }

  requestProducts(): void {
    this.store.dispatch(new GetProducts({}));
  }

  onProductSelect(id): void {
    if(this.selected.includes(id)) {
      this.selected.splice(id);
    } else {
      this.selected.push(id);
    }
  }

  isSelected(id: number): boolean {
    return this.selected.includes(id);
  }

  logout(): void {
    this.store.dispatch(new Logout({}));
  }

  displayForm(show): void {
    this.showForm = show;
  }

  deleteProducts(): void {
    if(this.selected.length > 0) {
      this.setErrorMessage(null);
      this.store.dispatch(new DeleteProducts({ ids: this.selected }));
    } else {
      this.setErrorMessage("No Product is selected.");
    }
  }

  setErrorMessage(error): void {
    this.errorMessage = error;
  }
}
