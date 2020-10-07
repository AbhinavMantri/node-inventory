import { Product } from 'src/app/models/product';
import { ProductActionTypes, All } from '../actions/product.action';

export interface State {
    list: Product[] | null;

    detail: Object | null;

    errorMessage: string | null;
}

export const initialState: State = {
    list: null,
    detail: {},
    errorMessage: null,
}

const getUpdatedDetail = (state, payload) => {
    const obj = {};

    for(let id in state) {
        if(!payload.includes(id))
            obj[id] = state[id];
    }

    return obj;
} 

export function reducer(state = initialState, action: All): State {
    const { data, error, id } = action.payload || {};
    switch(action.type) {
        case ProductActionTypes.GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                list: data, 
            };
        case ProductActionTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                detail: {
                    ...state.detail,
                    [id]: data,
                },
            };
        case ProductActionTypes.ADD_PRODUCT_SUCCESS: 
            return {
                ...state,
                list: state.list ? state.list.concat(data) : (data ? [data] : state.list),
                detail: {
                    ...state.detail,
                    [id]: data,
                },
                errorMessage: null,
            };
        case ProductActionTypes.DELETE_PRODUCTS_SUCCESS: 
            return {
                ...state,
                list: state.list.filter(d => !data.includes(d.id)),
                detail: getUpdatedDetail(state.detail, data),  
                errorMessage: null,
            };
        case ProductActionTypes.GET_PRODUCTS_FAILURE:
        case ProductActionTypes.GET_PRODUCT_FAILURE:        
        case ProductActionTypes.ADD_PRODUCT_FAILURE: 
        case ProductActionTypes.DELETE_PRODUCTS_FAILURE: 
            return {
                ...state,
                errorMessage: error,
            };                     
        default:
            return state;    
    }
}