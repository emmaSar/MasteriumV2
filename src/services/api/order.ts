import authApi, { setMasteriumApiAuthorizationHeader } from "./authInstance"
import qs from 'query-string';
import keys from "../keys";
import { Platform } from "react-native";




interface IOrder {
}
class Order implements IOrder {
   
    async createOrder(description:string,image:Array<any>,start_date:string,address_id:number,subservice:Array<any>,product:Array<any>) {
        try {
            let data={}
            let order={
                start_date:start_date,
                description:description,
                address_id:address_id
            }
            data={
                order:order,
                subservice:subservice,
                product:product,
                image:image
            }
            const response = await authApi.post(`${keys.API_URL}/orders/save-order/`,data);    
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getOrders(start_index:number,status_id:any,limit:number) {
        try {
            let data={
                start_index:start_index,
                status_id:status_id,
                limit:limit
            }
           
            const response = await authApi.post(`${keys.API_URL}/orders/get-my-orders/`,data);    
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getOrderStatus() {
        try {
          
           
            const response = await authApi.get(`${keys.API_URL}/utils/order-status/`,);    
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async deleteOrderById(id:number) {
        try {
            const response = await authApi.post(`${keys.API_URL}/orders/delete-order/${id}/`,);    
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getSuborderDetails(suborder_id:any,order_id:any) {
        try {
            let data={
                suborder_id:suborder_id,
                order_id:order_id,
          
            }
            const response = await authApi.post(`${keys.API_URL}/orders/get-suborder-details/`,data);    
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getDisputs(user_id:any,status_id:any) {
        try {
            const link=status_id!==null?`/orders/disput/?user_id=${user_id}&status_id=${status_id}`:
            `/orders/disput/?user_id=${user_id}`
            const response = await authApi.get(`${keys.API_URL}${link}`,);    
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex) 
        }
    }
    async getDisputStatus() {
        try {
            const response = await authApi.get(`${keys.API_URL}/utils/disput-status/`,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
        async createDisput(id:number,description:string,image:Array<any>) {
        try {
            const data={
                disput:{
                    suborder_id:id,
                    description:description
                },
                image:image
            }
            const response = await authApi.post(`${keys.API_URL}/orders/disput/`,data);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getDisputDetails(id:number) {
        try {
            const response = await authApi.get(`${keys.API_URL}/orders/disput/${id}/`,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async checkOrderSubOrders(id:number) {
        try {
            const response = await authApi.get(`${keys.API_URL}/orders/check-order-suborder/${id}/`,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getOrderDetails(id:number) {
        try {
            const response = await authApi.get(`${keys.API_URL}/orders/get-order-details/${id}/`,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getSubOrderDetailsById(id:number) {
        try {
            const response = await authApi.get(`${keys.API_URL}/orders/get-suborder-details/${id}/`,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getOrderSubOrders(id:number) {
        try {
            const response = await authApi.get(`${keys.API_URL}/orders/get-order-suborders/${id}/`,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async addReview(to_user:number,review:string,rating:number,for_suborder:number,tip:number) {
        try {
            const data={
                to_user:to_user,
                review:review,
                rating:rating,
                for_suborder:for_suborder,
                tip:tip
            }
            const response = await authApi.post(`${keys.API_URL}/orders/review/`,data);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getNextDisputs(body:string) {
        try {
          
            const response = await authApi.get(body,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getNextReviews(body:string) {
        try {
          
            const response = await authApi.get(body,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getMyTransactions() {
        try {
            const response = await authApi.get(`${keys.API_URL}/orders/get-my-transactions/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
    async getNextTransaction (body:string){
        try {
            const response = await authApi.get(body);  
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
}

const order = new Order();
export default order;