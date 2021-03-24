import axios from 'axios';
import Keys from '../keys';
export const setMasteriumApiAuthorizationHeader = (token: string | null) => {
	
	authApi.defaults.headers.common.Authorization = token
		? `Token ${token}`
		: null;
};
const authApi = axios.create({
	baseURL: Keys.API_URL,
	headers: {'Content-Type': 'application/json' }

});
export default authApi;