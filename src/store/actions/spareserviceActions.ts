import { SpareServiceTypes } from "../constants"


export const addSpareService = (payload:any) => {
    return {
        type: SpareServiceTypes.ADD_SPARE_SERVICE,
        payload

    };
};
export const deleteSpareService = (payload:any) => {
    return {
        type: SpareServiceTypes.DELETE_SPARE_SERVICE,
        payload

    };
};


