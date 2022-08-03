

import box from './box';
import d20 from './d20';
import description from './description';
import fill from './fill';
import iconInline from './iconInline';
import list from './list';
import pftrait from './pftrait';
import picture from './picture';
import property from './property';
import ruler from './ruler';
import section from './section';
import subtitle from './subtitle';
import tablerow from './tablerow';
import text from './text';
import unknown from './unknown';

export const makeCardLine = (type) => {
    switch (type) {
        case 'subtitle':
            return subtitle;
        case 'property':
        case 'prop':
        case 'p':
            return property;
        case 'description':
        case 'desc':
        case 'd':
            return description;
        case 'ruler':
        case 'rule':
        case 'hr':
        case 'divider':
            return ruler;
        case 'box':
        case 'boxes':
            return box;
        case 'text':
        case 'center':
        case 'justify':
        case 'right':
            return text(type);
        case 'bullet':
        case 'list':
        case 'item':
            return list('bullet');
        case 'check':
        case 'todo':
            return list('check');
        case 'fill':
        case 'flex':
        case 'spacer':
        case 'space':
            return fill;
        case 'section':
        case 'subsection':
        case 'heading':
            return section;
        case 'picture':
        case 'image':
        case 'asset':
            return picture;
        case 'icon':
            return iconInline;
        case 'tablehead':
        case 'tableheader':
        case 'table':
        case 'th':
            return tablerow(true);
        case 'tablerow':
        case 'row':
        case 'tr':
            return tablerow(false);
        case 'pftrait':
            return pftrait;
        case 'd20stat':
        case 'd20ability':
        case 'd20table':
            return d20;
        default:
            return unknown;
    }
};
