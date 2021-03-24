import { SpareTypes } from "../constants"

export const changeName = (payload:{name:string,index:number}) => {
    return {
        type:SpareTypes.CHANE_NAME ,
        payload
    };
};
export const chnageCount = (payload:{count:string,index:number}) => {
    return {
        type: SpareTypes.CHANGE_COUNT,
        payload

    };
};
export const setImage = (payload:{images:Array<string>,index:number}) => {
    return {
        type: SpareTypes.SET_IMAGES,
        payload

    };
};
export const addSpare = (payload:{name:string,count:string,images:Array<string>,countDetal:string}) => {
    return {
        type: SpareTypes.ADD_SPARE,
        payload

    };
};


