import authApi, { setMasteriumApiAuthorizationHeader } from "./authInstance"
import qs from 'query-string';
import keys from "../keys";
import { Platform } from "react-native";




interface IServices {
}
class Services implements IServices {
   
    async getServices(index:number) {
        try {
            const response = await authApi.get(`${keys.API_URL}/services/services-by-subcategory-with-discount/${index}/`);    
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
}

const services = new Services();
export default services;