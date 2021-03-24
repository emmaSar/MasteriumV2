import authApi, { setMasteriumApiAuthorizationHeader } from "./authInstance"
import qs from 'query-string';
import keys from "../keys";
// import {error} from "../../store/actions/loginActions"
// import { useDispatch, useSelector, } from 'react-redux';

export interface ILoginMethodResponse {
    TYPE?: string,
    USER_DATA?: IUserData,
    MESSAGE?: string
}
interface IUserData {
    NAME: string,
    SURNAME: string,
    PATRONYMIC: string,
    PHONE: number,
    EMAIL: string,
    LOGIN: string,
    HASH: string
}
interface IAuthSchema {
    login(login: string, password: string): Promise<ILoginMethodResponse>;
}
// const dispatch = useDispatch();
class Auth implements IAuthSchema {
    
    async login(login: string,) {
        try {
            
            // let  data = new FormData()
            // data.append('phone_number',login)
            let data={phone_number:login}
            let d=JSON.stringify(data)
            const response = await authApi.post(`${keys.API_URL}/login/send-login-code/`,d);                     
  return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error="Error"
            return error
            
            // throw new Error(ex);
        }
    }
    async verification(phone: string,code:string) {
        try {
            
            // let  data = new FormData()
            // data.append('phone_number',phone)
            // data.append('code',code)
            phone='+995'+phone
            let d={phone_number:phone,code:code,token:""}
            
            let data=JSON.stringify(d)
            const response = await authApi.post(`${keys.API_URL}/login/login-or-register/`,data);            
         return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error={error:"Not found"}
            return error
            
            // throw new Error(ex);
        }
    }
    async setName(name: string,surname:string,token:string,is_cooperative_user:boolean,company_name:string,company_type:string,company_id:string,email:string) {
        try {
            setMasteriumApiAuthorizationHeader(token)

        // let  data = new FormData()
            // console.log(token,'tokentokentokentokentokentoken');
            let data={
                first_name:name,
                last_name:surname,
                is_cooperative_user:is_cooperative_user,
                company_name:company_name,
                company_type_id:company_type,
                company_id:company_id,
               // credit_card_number:null,
                email:email
            }
            let d=JSON.stringify(data)
            const response = await authApi.post(`${keys.API_URL}/userdetails/set-personal-details/`,d);            
         return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error="Error"
            return error
            
            // throw new Error(ex);
        }
    }
    async setCity(city: string,) {
        try {
        //    setMasteriumApiAuthorizationHeader(token)

            // let  data = new FormData()
          //  console.log(token,'tokentokentokentokentokentoken');
            
            // data.append('city',city)
          //  data.append('last_name',surname)
          let d={city:city}
          let data=JSON.stringify(d)
            const response = await authApi.post(`${keys.API_URL}/userdetails/set-city/`,data);            
         return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error="Error"
            return error
            
            // throw new Error(ex);
        }
    }
    async editInfo(data:any) {
        try {
      console.log(data,"d");
            
          let d=JSON.stringify(data)
            const response = await authApi.put(`${keys.API_URL}/userdetails/edit-me-client/`,d);            
         return response.data
        } catch (ex) {
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error="Error"
            return error
            
        }
    }
    async changePhone(phone_number:string) {
        try {
            
          let d=JSON.stringify({phone_number:phone_number})
            const response = await authApi.post(`${keys.API_URL}/login/send-change-phone-code/`,d);            
         return response.data
        } catch (ex) {
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error="Error"
            return error
            
        }
    }
    async checkCode(phone: string,code:string) {
        try {
            
            // let  data = new FormData()
            // data.append('phone_number',phone)
            // data.append('code',code)
            phone='+995'+phone
            let d={phone_number:phone,code:code,}
            
            let data=JSON.stringify(d)
            const response = await authApi.post(`${keys.API_URL}/login/check-change-phone-code/`,data);            
         return response.data
        } catch (ex) {
            // dispatch(error())
            console.log(ex,"erorrrrrrrrrrrrrrrrrrrrrrr");
            
            const error={error:"Not found"}
            return error
            
            // throw new Error(ex);
        }
    }
}

const auth = new Auth();
export default auth;