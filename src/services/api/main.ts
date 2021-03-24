import authApi, { setMasteriumApiAuthorizationHeader } from "./authInstance"
import qs from 'query-string';
import keys from "../keys";
import { Platform } from "react-native";
import { io } from "socket.io-client";


 

interface IMain {
}
class Main implements IMain {
    async uploadTaskImage(image: any,file:boolean) {
        try {
            let upload_body
            if(file==false){
                 upload_body = {
                    uri: image['path'],
                    type: image['mime'],
                    name: Platform.OS === 'ios' ? image['filename'] : `my_profile_${Date.now()}.${image['mime'] === 'image/jpeg' ? 'jpg' : 'png'}`,
                }
            }
            else{
                console.log("elseeeee");
                
              upload_body = {
                    uri: image['uri'],
                    type: image['type'],
                    name: image['name'],
                }
            }
        
            let _data_body = new FormData()

            _data_body.append('file_url', upload_body)

            const response = await authApi.post(`${keys.API_URL}/files/files/`, _data_body, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(response);

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getCompanyType(token: any) {
        try {
            setMasteriumApiAuthorizationHeader(token)
            const response = await authApi.get(`${keys.API_URL}/utils/company-type/`);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getAddresses() {
        try {

            const response = await authApi.get(`${keys.API_URL}/userdetails/get-my-addresses/`);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async addAddress(data: any) {
        try {
            let d = JSON.stringify(data)
            const response = await authApi.post(`${keys.API_URL}/userdetails/save-my-address/`, d);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getMyMasters() {
        try {

            const response = await authApi.get(`${keys.API_URL}/userdetails/get-my-executors/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async deleteMyMasterById(id: number) {
        try {

            const response = await authApi.post(`${keys.API_URL}/userdetails/remove-my-executor/${id}/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getHelp() {
        try {

            const response = await authApi.get(`${keys.API_URL}/utils/help/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getFriends() {
        try {

            const response = await authApi.get(`${keys.API_URL}/userdetails/friend-invitation/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async addFriend(phone_number: string) {
        try {
            let data = { phone_number: phone_number }
            const response = await authApi.post(`${keys.API_URL}/userdetails/friend-invitation/`, data);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getMe() {
        try {

            const response = await authApi.get(`${keys.API_URL}/userdetails/get-me`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getPopularSubCategory() {
        try {

            const response = await authApi.get(`${keys.API_URL}/services/get-popular-subcategories/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getExecutorById(id: number) {
        try {            
            const response = await authApi.get(`${keys.API_URL}/userdetails/get-executor/${id}/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getUserReviewById(id: number) {
        try {            
            const response = await authApi.get(`${keys.API_URL}/orders/get-user-review/${id}/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async addExecutor(id: number) {
        try {
            const response = await authApi.post(`${keys.API_URL}/userdetails/user-executors/${id}/`);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async addCreditCard(user: number,number:string,month:number,year:number,cvc:number) {
        try {
            const data={
                user:user,
                number:number,
                month:month,
                year:year,
                cvc:cvc
            }            
            const response = await authApi.post(`${keys.API_URL}/userdetails/credit-cards/`,data);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async sendCodeToMe() {
        try {
            const response = await authApi.post(`${keys.API_URL}/login/send-code-to-me/`);
            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async checkCode(code:string) {
        try {
            const data={
                code:code
            }
            const response = await authApi.post(`${keys.API_URL}/login/check-code-sended-to-me/`,data);
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
    async getCreditCards(id:number) {
        try {
            const response = await authApi.get(`${keys.API_URL}/userdetails/credit-cards/?user_id=${id}&limit=1000`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
    async getRoomForUser(user_id:any,is_with_admin:boolean) {
        try {
            let data={
                user_id:user_id,
                is_with_admin:is_with_admin
            }
            const response = await authApi.post(`${keys.API_URL}/chat/get-room-for-user/`,data);
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
    async getUnseenMessageCount() {
        try {
            
            const response = await authApi.get(`${keys.API_URL}/chat/get-unseen-message-room-count-user/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
    async getUnseenNotificationCount() {
        try {
            const response = await authApi.get(`${keys.API_URL}/notifications/get-unseen-notification-count/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
    async getMyNotification() {
        try {
            const response = await authApi.get(`${keys.API_URL}/notifications/get-my-notifications/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
    async getNextNotifications(body:string) {
        try {
            const response = await authApi.get(body);
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
    async downloadFile(id:number) {
        try {
            // let data={
            //     file_url:file_url
            // }
            const response = await authApi.get(`${keys.API_URL}/chat/download-message-file/${id}/`,);
            return response.data
        } catch (ex) {
            console.log(ex.response);
        }
    }
    async setMessageSeeen(id:number) {
        try {
          
            const response = await authApi.get(`${keys.API_URL}/chat/set-message-seen/${id}/`,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async getAdminPhone() {
        try {
          
            const response = await authApi.get(`${keys.API_URL}/utils/office-phone-number/`,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
    async setPrimaryAddress(id:number) {
        try {
          
            const response = await authApi.get(`${keys.API_URL}/userdetails/set-primary-address/${id}/`,);    

            return response.data
        } catch (ex) {
            console.log(ex.response);
            //return Alert.alert("Error",ex)
        }
    }
}

const main = new Main();
export default main;