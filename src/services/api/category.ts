import authApi, { setMasteriumApiAuthorizationHeader } from "./authInstance"
import qs from 'query-string';
import keys from "../keys";
import AsyncStorage from "@react-native-community/async-storage";
// import {error} from "../../store/actions/loginActions"
// import { useDispatch, useSelector, } from 'react-redux';



interface ICategorySchema {
   // login(login: string, password: string): Promise<ILoginMethodResponse>;
}
// const dispatch = useDispatch();
class Category implements ICategorySchema {
    
    async getCategory() {
        try {
            // const getToken = AsyncStorage.getItem('token').then((a) => {
            //     if(a!==null){
            //       //@ts-ignore
            //       setMasteriumApiAuthorizationHeader(a)
            //     }
            //   });
            // let  data = new FormData()
            // data.append('phone_number',login)
            const response = await authApi.get(`${keys.API_URL}/services/category/`);            
         
            
  return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error="Error"
            return error
            
            // throw new Error(ex);
        }
    }

    async getSubCategoryByCategory(id:number) {
        try {
            
            // let  data = new FormData()
            // data.append('phone_number',login)
            const response = await authApi.get(`${keys.API_URL}/services/subcategories-by-category/${id}`);            
         
            
  return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error="Error"
            return error
            
            // throw new Error(ex);
        }
    }
    async getProduct() {
        try {
            
            // let  data = new FormData()
            // data.append('phone_number',login)
            const response = await authApi.get(`${keys.API_URL}/products/product/`);            
         
            
  return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error="Error"
            return error
            
            // throw new Error(ex);
        }
    }
}

const category = new Category();
export default category;