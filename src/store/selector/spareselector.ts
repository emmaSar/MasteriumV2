import { ISpareState } from '../reducers/spare';

export const spareSelector = ({ spare: { spareList } }: { spare: ISpareState }) => spareList;
