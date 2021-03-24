import authApi, { setMasteriumApiAuthorizationHeader } from "./authInstance"
import qs from 'query-string';
import keys from "../keys";
import { Platform } from "react-native";




interface IMain {
}
class Products implements IMain {
 
    async getProductCategory() {
        try {
            const response = await authApi.get(`${keys.API_URL}/products/product-category/`);
            return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex, "erorrrrrrrrrrrrrrrrrrrrrrr");

            const error = "Error"
            return error

            // throw new Error(ex);
        }
    }
    async getProductSubCategoryByCategory(id:number) {
        try {
            
            // let  data = new FormData()
            // data.append('phone_number',login)
            const response = await authApi.get(`${keys.API_URL}/products/product-subcategories-by-category/${id}/`);            
         
            
  return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error="Error"
            return error
            
            // throw new Error(ex);
        }
    }
    async getProducts(id:number) {
        try {
            const response = await authApi.get(`${keys.API_URL}/products/products-by-subcategory2/${id}/`);
            return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex, "erorrrrrrrrrrrrrrrrrrrrrrr");

            const error = "Error"
            return error

            // throw new Error(ex);
        }
    }
    async getNextProducts(body:string) {
        try {
            const response = await authApi.get(body);
            return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex, "erorrrrrrrrrrrrrrrrrrrrrrr");

            const error = "Error"
            return error

            // throw new Error(ex);
        }
    }
    async getStocks() {
        try {
            const response = await authApi.get(`${keys.API_URL}/advertisements/advertisements/`);
            return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex, "erorrrrrrrrrrrrrrrrrrrrrrr");

            const error = "Error"
            return error

            // throw new Error(ex);
        }
    }
}

const products = new Products();
export default products;