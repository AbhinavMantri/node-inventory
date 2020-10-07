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
    for(let i = 0; i < payload.length; i++) {
        if(state[payload[i]])
            delete state[payload[i]];
    }

    return state;
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
                errorMessage: null,
            };
        case ProductActionTypes.DELETE_PRODUCTS_SUCCESS:
            return {
                ...state,
                list: state.list.concat(data),
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
        case ProductActionTypes.DELETE_PRODUCTS_FAILURE:                      
        default:
            return state;    
    }
}