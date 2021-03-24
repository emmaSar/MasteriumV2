import { ProductTypes, SpareTypes } from '../constants';
interface IReduxAction<T> {
    type: T;
    payload: any;
}
export interface IProducts {
    productsList: Array<any>,
    loading: boolean,
    product_sub_category_list: Array<any>,
    list: any,
    stocks: Array<any>

}

export const initialState: IProducts = {
    productsList: [],
    loading: false,
    product_sub_category_list: [],
    list: {},
    stocks: [],
}

const productsReducer = (state = initialState, action: IReduxAction<ProductTypes>) => {
    switch (action.type) {
        case ProductTypes.SET_PRODUCT_LIST:
            return {
                ...state,
                productsList: action.payload,
                loading: false
            }
        case ProductTypes.SET_STOCKS:
            return {
                ...state,
                stocks: action.payload,
            }
        case ProductTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case ProductTypes.SET_PRODUCT_SUB_CATEGORY_LIST:

            return {
                ...state,
                product_sub_category_list: action.payload,
                loading: false
            }
        case ProductTypes.SET_PRODUCT_LIST_BY_SUB:
            console.log(action.payload,"//////////////////////////////");
            
            return {
                ...state,
                list: action.payload,
                loading: false
            }
        case ProductTypes.SET_NEXT_PRODUCT_LIST:
            let array=[...state.list.results,action.payload.results]
            let n = action.payload.next
            let p = action.payload.previous
            return {
                ...state,
                list: {...state.list,results:array,next:n,previous:p},
                loading: false
            }
        default:
            return state;
    }
}
export default productsReducer;