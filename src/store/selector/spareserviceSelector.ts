import { ISpareState } from '../reducers/spareservice';

export const spareServiceSelector = ({ spareservice: { spareserviceList } }: { spareservice: ISpareState }) => spareserviceList;
