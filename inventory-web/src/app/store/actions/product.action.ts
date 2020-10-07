import { Action } from '@ngrx/store'; 

export enum ProductActionTypes {
    GET_PRODUCT = "[Product] GET_PRODUCT",
    GET_PRODUCTS = "[Product] GET_PRODUCTS",
    ADD_PRODUCT = "[Product] Add Product",
    DELETE_PRODUCTS = '[Product] Delete Products',
    ADD_PRODUCT_SUCCESS = '[Auth] Add Product Success',
    ADD_PRODUCT_FAILURE = '[Auth] Add Product Failure',
    DELETE_PRODUCTS_SUCCESS = '[Product] Delete Products Success',
    DELETE_PRODUCTS_FAILURE = '[Product] Delete Products Failure',
    GET_PRODUCTS_SUCCESS = '[Product] Get Products Success',
    GET_PRODUCTS_FAILURE = '[Product] Get Products Failure',
    GET_PRODUCT_SUCCESS = '[Product] Get Product Success',
    GET_PRODUCT_FAILURE = '[Product] Get Product Failure'
};


export class GetProducts implements Action {
    readonly type = ProductActionTypes.GET_PRODUCTS;

    constructor(public payload: any) {}
}

export class GetProduct implements Action {
    readonly type = ProductActionTypes.GET_PRODUCT;

    constructor(public payload: any) {}
}

export class AddProduct implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT;

    constructor(public payload: any) {}
}

export class AddProductSuccess implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT_SUCCESS;

    constructor(public payload: any) {}
}

export class AddProductFailure implements Action {
    readonly type = ProductActionTypes.ADD_PRODUCT_FAILURE;

    constructor(public payload: any) {}
}

export class DeleteProducts implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCTS;

    constructor(public payload: any) {}
}

export class DeleteProductsSuccess implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCTS_SUCCESS;

    constructor(public payload: any) {}
}

export class DeleteProductsFailure implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCTS_FAILURE;

    constructor(public payload: any) {}
}

export class GetProductsSuccess implements Action {
    readonly type = ProductActionTypes.GET_PRODUCTS_SUCCESS;

    constructor(public payload: any) {}
}

export class GetProductsFailure implements Action {
    readonly type = ProductActionTypes.GET_PRODUCTS_FAILURE;

    constructor(public payload: any) {}
}

export class GetProductSuccess implements Action {
    readonly type = ProductActionTypes.GET_PRODUCT_SUCCESS;

    constructor(public payload: any) {}
}

export class GetProductFailure implements Action {
    readonly type = ProductActionTypes.GET_PRODUCT_FAILURE;

    constructor(public payload: any) {}
}


export type All =
    | GetProducts
    | GetProduct
    | AddProduct
    | AddProductSuccess
    | AddProductFailure
    | DeleteProducts
    | DeleteProductsSuccess
    | DeleteProductsFailure
    | GetProductsSuccess
    | GetProductsFailure
    | GetProductFailure
    | GetProductSuccess;