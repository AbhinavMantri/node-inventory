import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { productState } from '../store/app.states';
import { ActivatedRoute } from '@angular/router';
import { GetProduct } from '../store/actions/product.action';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Product | null;
  getState: Observable<any>;

  constructor(private store: Store<Product>, private route: ActivatedRoute, private location: Location) { 
    this.getState = this.store.select(productState);
  }

  ngOnInit(): void {
    const id: number = this.getId();
    this.getState.subscribe(state => {
      this.product = state.detail[id];
    });

    this.requestProduct(id);
  }

  getId(): number {
    return  +this.route.snapshot.paramMap.get("id");
  } 

  requestProduct(id: number =  this.getId()): void {
    this.store.dispatch(new GetProduct({ id }));
  }

  goBack(): void {
    this.location.back();
  }
}
