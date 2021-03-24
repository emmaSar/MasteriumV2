import { Socket,io } from "socket.io-client"
import {Store,CombinedState} from 'redux'
import store from "../store"

class ChatService {
    private static  socket:Socket
    private static store:Store<CombinedState<any>>
    public static init(store:Store<CombinedState<any>>,token:string){
        // if(!!this.socket){
        //     return
        // }
        this.store = store;
        this.socket = io('ws://www.api.masterium.ge/', {
            extraHeaders: {
                Authorization: token
            },
        })
        this.socket.on('rooms',(data)=>{
            console.log(data);
           // store.dispatch();
        })
    }
    public static emit(event:string,value:any){
        this.socket.emit(event,value)
    }   
    public static on(event:string, callBack:Function) {
        this.socket.on(event, callBack)
    }
    /**
     * disconnect
     */
    public static disconnect() {
        this.socket.disconnect()
    }
}

export default ChatService