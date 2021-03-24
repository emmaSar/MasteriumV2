import { CategoryTypes, LoginTypes, MainTypes } from '../constants';
import { useReducer } from 'react';
interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface ICategoryState {
    category_list: Array<any>,
    sub_category_list: Array<any>,
    loading: boolean,
    results:Array<any>
}


export const initialState: ICategoryState = {
    category_list: [],
    sub_category_list: [],
    loading: false,
    results:[]
}
const categoryReducer = (state = initialState, action: IReduxAction<CategoryTypes>) => {
    switch (action.type) {
        case CategoryTypes.SET_RESULTS:
            return {
                ...state,
                results: action.payload
            }
        case CategoryTypes.SET_CATEGORY_LIST:
            return {
                ...state,
                category_list: action.payload
            }
        case CategoryTypes.SET_SUB_CATEGORY_LIST:

            let array = [...state.sub_category_list]
            let list = []
            let loading = true
            function compare(a: any, b: any) {
                if (a > b) return 1;
                if (b > a) return -1;

                return 0;
            }


            array.push({ list: action.payload.list, id: action.payload.id })

            if (array.length === state.category_list.length) {

                let a = []

                for (let i = 0; i < array.length; i++) {
                    a.push(array[i].id)
                }
                a = a.sort(compare)

                for (let i = 0; i < a.length; i++) {
                    for (let j = 0; j < array.length; j++) {
                        if (a[i] === array[j].id) {

                            list.push(array[j].list)
                        }
                    }
                }

                array = list
                loading = false
            }



            // array[action.payload.id]=action.payload.list
            return {
                ...state,
                sub_category_list: array,
                loading: loading
            }
        case CategoryTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case CategoryTypes.CLEAN_ALL:
            return {
                category_list: [],
                sub_category_list: [],
                loading: false
            }


        default:
            return state;
    }
}
export default categoryReducer;