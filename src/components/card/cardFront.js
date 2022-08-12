import React from 'react';
import cardUtil from '../../util/cardUtil';
import styleUtil from '../../util/styleUtil';
import CardContent from './cardContent';
import { Card, CardFrontContentContainer, Table } from './css';
import Title from './title';

export default React.forwardRef((props, ref) => {
    const cardStyle = styleUtil.makeCardStyle(props);

    return (
        <Card ref={ref} className='card' cardStyle={cardStyle.front}>
            <Title {...props} cardStyle={cardStyle.front} />
            <CardFrontContentContainer
                className='card-content-container'
                cardStyle={cardStyle.front}
            >
                <CardContentArray cardStyle={cardStyle.front} {...props} />
            </CardFrontContentContainer>
        </Card>
    );
});

const CardContentArray = (props) => {
    const { cardData } = props;
    const { contents } = cardData;
    const smartContents = contents
        .concat([''])
        .map((e) => cardUtil.splitParams(e))
        .map(([type, ...params]) => ({ type, params }));

    const groupedContents = groupTableContent(smartContents);
    const reactContents = groupedContents.map((arr, i) => {
        if (arr.length === 0) return null;
        if (arr.length === 1)
            return arr.map((value, i) => (
                <CardContent key={i} {...value} {...props} />
            ));

        return makeTable(arr, i, props);
    });

    return reactContents;
};

const groupTableContent = (contents) => {
    if (contents.length === 0) return [];

    const groups = [];

    let queue = [];
    contents.forEach((item) => {
        switch (item.type) {
            // case 'tableprops':
            case 'tablehead':
            case 'tableheader':
            case 'th':
            case 'tablerow':
            case 'table':
            case 'row':
            case 'tr':
                queue.push(item);
                break;
            default:
                if (queue.length) {
                    groups.push(queue);
                    queue = [];
                }
                groups.push([item]);
                break;
        }
    });

    return groups;
};

const makeTable = (arr, parentIndex, props) => {
    // Handle Table Groups
    const tableprops = (arr.find((row) => row.type === 'tableprops') || '')
        .toLowerCase()
        .replace(/\s+/g, '');

    const cellStyle = {};
    const rowStyle = {};
    const tableStyle = {};

    if (tableprops.includes('norow;')) {
        cellStyle.border = 0;
        rowStyle.border = 0;
    }
    if (tableprops.includes('lefttext;')) {
        cellStyle.textAlign = 'left';
    }
    if (tableprops.includes('paragraph;')) {
        rowStyle.marginTop = 5.33;
    }

    return (
        <Table key={parentIndex} className='card-table' style={tableStyle}>
            {arr
                .filter((row) => row.type !== 'tableprops')
                .map((row, i) => (
                    <CardContent
                        key={i}
                        {...props}
                        {...row}
                        {...tableprops}
                        cellStyle={cellStyle}
                        rowStyle={rowStyle}
                    />
                ))}
        </Table>
    );
};
