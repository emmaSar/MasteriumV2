import {  SpareTypes } from '../constants';
interface IReduxAction<T> {
	type: T;
	payload: any;
}
export interface ISpareState{
   spareList:Array< Icontent>
}
interface Icontent{
   name:string,
   count:string,
   images:Array<string>,
   countDetal:string,
}
export const initialState: ISpareState = {
  spareList:[
  ]
}

  const spareReducer = (state = initialState, action: IReduxAction<SpareTypes>) => {
    switch (action.type) {
      // case SpareTypes.CHANE_NAME:
      //   let list =[...state.spareList]
      //   list[action.payload.index].name=action.payload.name
      //     return {
      //         ...state,
      //         spareList:list
      //     };
          case SpareTypes.ADD_SPARE:
            return {
                ...state,
                spareList:[...state.spareList,{name:action.payload.name,count:action.payload.count,images:action.payload.images,countDetal:action.payload.countDetal}]
            };
          // case SpareTypes.CHANGE_COUNT:
          //   let list_spare =[...state.spareList]
          //   list_spare[action.payload.index].count=action.payload.count
          //   return {
          //       ...state,
          //       spareList:list_spare
          //     };
          //   case SpareTypes.SET_IMAGES:
          //     let list_images =[...state.spareList]
          //     list_images[action.payload.index].images=action.payload.images
          //     return {
          //         ...state,
          //         spareList:list_images
          //       };
      default:
          return state;
  }
     }
export default spareReducer;