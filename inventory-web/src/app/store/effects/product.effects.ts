import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductActionTypes, GetProductsSuccess, GetProductsFailure, GetProductSuccess, GetProductFailure, AddProductSuccess, AddProductFailure, DeleteProductsSuccess, DeleteProductsFailure } from '../actions/product.action';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ProductEffect {
    constructor(
        private actions: Actions,
        private productService: ProductsService,
        private router: Router,
    ) {}
    
    @Effect()
    GetProducts: Observable<any> = this.actions.pipe(
        ofType(ProductActionTypes.GET_PRODUCTS),
        map((action: any) => action.payload),
        switchMap(payload => {
            return this.productService.getProducts().pipe(
                map(products => {
                    return new GetProductsSuccess({data: products});
                }),
                catchError(err => {
                    return of(new GetProductsFailure({error: err.error.reason }));
                })
            );
        })  
    );

    @Effect()
    GetProduct: Observable<any> = this.actions.pipe(
        ofType(ProductActionTypes.GET_PRODUCT),
        map((action: any) => action.payload),
        switchMap(payload => {
            return this.productService.getProduct(payload.id).pipe(
                map(product => {
                    // console.log(user);
                    return new GetProductSuccess({data: product, id: payload.id});
                }),
                catchError(err => {
                    return of(new GetProductFailure({error: err.error.reason }));
                })
            );
        })  
    );

    @Effect()
    AddProduct: Observable<any> = this.actions.pipe(
        ofType(ProductActionTypes.ADD_PRODUCT),
        map((action: any) => action.payload),
        switchMap(payload => {
            return this.productService.addProduct(payload.title, payload.description).pipe(
                map(product => {
                    // console.log(user);
                    return new AddProductSuccess(product);
                }),
                catchError(err => {
                    return of(new AddProductFailure({error: err.error.reason }));
                })
            );
        })  
    );

    @Effect()
    DeleteProducts: Observable<any> = this.actions.pipe(
        ofType(ProductActionTypes.DELETE_PRODUCTS),
        map((action: any) => action.payload),
        switchMap(payload => {
            return this.productService.deleteProducts(payload.ids).pipe(
                map(product => {
                    // console.log(user);
                    return new DeleteProductsSuccess(product);
                }),
                catchError(err => {
                    return of(new DeleteProductsFailure({error: err.error.reason }));
                })
            );
        })  
    );
}    