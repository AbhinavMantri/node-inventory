import * as auth from './reducers/auth.reducer';
import * as product from './reducers/product.reducer';
import { createFeatureSelector } from '@ngrx/store';


export interface AppState {
    authState: auth.State,
    productState: product.State,
}

export const reducers = {
    auth: auth.reducer,
    product: product.reducer,
}


export const authState = createFeatureSelector<AppState>('auth');
export const productState = createFeatureSelector<AppState>('product');