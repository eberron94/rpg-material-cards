import cardUtil from '../../util/cardUtil';
import textUtil from '../../util/textUtil';
import styled from '@emotion/styled';

export default (head) => (params) => {
    const row = cardUtil
        .tableCellTextArray(params)
        .map((e) => textUtil.stylize(e));

    const tableStyles = cardUtil.tableStyles(params);

    const rowElement = (
        <Row
            className={`card-table-${head ? 'header' : 'row'}`}
            row={row}
            style={tableStyles.row}
            cellStyle={tableStyles.cell}
        />
    );

    if (head) return <thead>{rowElement}</thead>;

    return <tbody>{rowElement}</tbody>;
};

const Row = ({ className, row, cellStyle, ...props }) => {
    const cells = row.map((cell, i) => (
        <Cell key={i} cell={cell} style={cellStyle} />
    ));

    return (
        <tr className={`card-element ${className}`} {...props}>
            {cells}
        </tr>
    );
};

const Cell = ({ cell, ...props }) => {
    return (
        <td className='card-table-cell' {...props}>
            {cell}
        </td>
    );
};
