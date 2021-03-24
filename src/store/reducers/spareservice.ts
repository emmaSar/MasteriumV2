import { act } from 'react-test-renderer';
import {  SpareServiceTypes, SpareTypes } from '../constants';
interface IReduxAction<T> {
	type: T;
	payload: any;
}
export interface ISpareState{
   spareserviceList:Array< Icontent>
}
interface Icontent{
 [key:string]:string|number
}
export const initialState: ISpareState = {
    spareserviceList:[
  ]
}

  const spareserviceReducer = (state = initialState, action: IReduxAction<SpareServiceTypes>) => {
    switch (action.type) {

          case SpareServiceTypes.ADD_SPARE_SERVICE:
            return {
                ...state,
                spareserviceList:[...state.spareserviceList,action.payload]
            };
            case SpareServiceTypes.DELETE_SPARE_SERVICE:
                let s=[...state.spareserviceList]
                for(var i=0;i<s.length;i++){
                    if(s[i].id==action.payload){
                        s.splice(i,1)
                    }
                }
                return {
                    ...state,
                    spareserviceList:s
                };
      default:
          return state;
  }
     }
export default spareserviceReducer;