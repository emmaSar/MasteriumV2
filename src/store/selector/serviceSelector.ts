import {  IProducts} from '../reducers/products';
import { IServices } from '../reducers/service';



export const serviceListSelector = ({ service: { serviceList } }: { service: IServices }) => serviceList;
export const loadingSelector = ({ service: { loading } }: { service: IServices }) => loading;




