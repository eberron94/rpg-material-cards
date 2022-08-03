import cardUtil from '../../util/cardUtil';
import { Fill } from './css';

export default (params) => {
    return <Fill className='card-fill' flex={cardUtil.fillFlex(params)} />;
};
