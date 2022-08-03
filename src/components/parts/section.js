import cardUtil from '../../util/cardUtil';
import textUtil from '../../util/textUtil';
import { Section, SectionText } from './css';

export default (params) => {
    const textArray = cardUtil.sectionTextArray(params).map((text, index) => (
        <SectionText key={index} cardStyle={params.cardStyle}>
            {textUtil.stylize(text)}
        </SectionText>
    ));

    return (
        <Section
            className={cardUtil.joinClass('card-section display-flex', params)}
            cardStyle={params.cardStyle}
        >
            {textArray}
        </Section>
    );
};
