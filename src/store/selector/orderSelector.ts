import { IOrders } from '../reducers/order';

export const orderListSelector = ({ order: { ordersList } }: { order: IOrders }) => ordersList;
export const neworderSelector = ({ order: { neworder } }: { order: IOrders }) => neworder;
export const orderSelector = ({ order: { orders } }: { order: IOrders }) => orders;
export const statusListSelector = ({ order: { statusList } }: { order: IOrders }) => statusList;
export const suborderDetailsListSelector = ({ order: { suborderDetails } }: { order: IOrders }) => suborderDetails;
export const disputStatusListSelector = ({ order: { disputStatusList } }: { order: IOrders }) => disputStatusList;
export const orderDetailsSelector = ({ order: { orderDetails } }: { order: IOrders }) => orderDetails;
export const subOrdersSelector = ({ order: { suborders } }: { order: IOrders }) => suborders;
export const disputsSelector = ({ order: { disputs } }: { order: IOrders }) => disputs;
export const transactionSelector = ({ order: { transaction } }: { order: IOrders }) => transaction;