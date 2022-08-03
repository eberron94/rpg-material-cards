import { makeCardLine } from '../parts';

export default ({ type, params, cardData, options, ...props }) => {
    // const [lineType, ...params] = cardUtil.splitParams(line);
    const Gen = makeCardLine(type);
    const content = { params, cardData, options, ...props };

    if (type && Gen) {
        return <Gen {...content} />;
    }

    return null;
};
