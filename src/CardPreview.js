import React, { useEffect, useRef } from 'react';
import { CardPreview } from './components/card';

const defaultData = {
    cardData: {
        count: 1,
        color: 'maroon',
        title: 'Burning Hands [[one-action]]',
        icon: 'white-book-1',
        icon_back: 'robe',
        // body_font_size:8,
        contents: [
            // 'subtitle | 1st level evocation',
            // 'd20stat | 12 | 12 | 14 | 13 | 18 | 20',
            // 'icon | plain-square | | evenly | 10',
            // 'check | robe',
            // 'pftrait | uncommon | rare| run | jump | fly',
            // 'fill',
            'prop | Casting time | 1 a a a a a a a a a a a a a a a a a a a a  | thing | a a a a a a a a a a a a a a a a a a a a a a a a a a a a ',
            'prop | Casting | 1 action action action action action action action action action action action ',
            // 'bullet | Range | Self (15ft cone)',
            'check | Components | V,S [[one-action]] [[two-action]] [[three-action]] [[free-action]] [[reaction]]',
            // 'rule',
            // 'box  |3',
            // 'fill | 2',
            'text | Each creature in a 15-foot cone must make a Dexterity saving throw. A creature takes **3d6 fire damage** on a failed save, or half as much damage on a successful one.',
            // "text | The fire ignites any flammable objects in the area that aren't being worn or carried.",
            // 'fill | 3',
            // 'section | At higher levels | things | smith',
            // 'text | *+1d6* damage for each slot above 1st',
            // 'tablehead | a | b | c',
            // 'tablerow | a | b | c',
            // 'tablerow | a | b | c',
        ],
        tags: ['spell', 'mage'],
    },
    options: {
        foreground_color: 'white',
        background_color: 'white',
        default_color: 'black',
        default_icon: 'ace',
        default_title_font_size: '13',
        default_body_font_size: '8',
        default_card_count: 1,
        page_size: 'letter',
        page_rows: 2,
        page_columns: 2,
        card_orientation: 'portrait',
        page_orientation: 'portrait',
        card_arrangement: 'doublesided',
        card_size: '425x55',
        card_count: null,
        icon_inline: true,
        rounded_corners: false,
        scale: 1,
        card_scale: 6,
        page_scale: 4,
    },
};

const applyScaling = (scaledWrapper, scaledContent) => {
    scaledContent.style.transform = 'scale(1, 1)';

    let { width: cw, height: ch } = scaledContent.getBoundingClientRect();
    let { width: ww, height: wh } = scaledWrapper.getBoundingClientRect();
    let scaleAmtX = Math.min(ww / cw, wh / ch);
    let scaleAmtY = scaleAmtX;

    scaledContent.style.transform = `scale(${0.5}, ${0.5})`;
};

function App({ iconMap }) {
    const scaledWrapper = useRef();
    const scaledContent = useRef();

    useEffect(() => {
        if (scaledWrapper.current && scaledContent.current) {
            applyScaling(scaledWrapper.current, scaledContent.current);
        }
    }, [scaledWrapper.current, scaledContent.current]);

    return (
        <div ref={scaledWrapper} className='scaler'>
            <div ref={scaledContent}>
                {/* <CardPreview {...defaultData} iconMap={iconMap || {}} /> */}
            </div>
        </div>
    );
}
