import {  ProductTypes, ServicesTypes, SpareTypes } from '../constants';
interface IReduxAction<T> {
	type: T;
	payload: any;
}
export interface IServices{
    serviceList:Array< any>,
    loading:boolean
}

export const initialState: IServices = {
    serviceList:[],
    loading:false
}

  const serviceReducer = (state = initialState, action: IReduxAction<ServicesTypes>) => {
    switch (action.type) {
        case ServicesTypes.SET_SERVICE_LIST:
            
            return {
                ...state,
                serviceList: action.payload,
                loading:false
            }
            case ServicesTypes.SET_LOADING:
            
                return {
                    ...state,
                    loading:action.payload
                }
      default:
          return state;
  }
     }
export default serviceReducer;