import rr from 'react-string-replace';
import styled from '@emotion/styled';

const PF2eAction = styled.span`
    font-family: PF2E;
    font-weight: 400;
    line-height: 0;
    user-select: none;
`;

const stylize = (str) => {
    let count = 0;

    // Add bold and italics to ***string***
    str = rr(str, /\*\*\*([^\*]+)\*\*\*/g, (match, i) => (
        <strong key={match + count++}>
            <em>{match}</em>
        </strong>
    ));

    // Add bold to **string**
    str = rr(str, /\*\*([^\*]+)\*\*/g, (match, i) => (
        <strong key={match + count++}>{match}</strong>
    ));

    // Add italics to *string*
    str = rr(str, /\*([^\*]+)\*/g, (match, i) => (
        <em key={match + count++}>{match}</em>
    ));

    // Replace mdash to ---
    str = rr(str, '---', (match, i) => (
        <span key={match + count++}> &mdash; </span>
    ));

    // Replace ndash to --
    str = rr(str, '--', (match, i) => (
        <span key={match + count++}> &ndash; </span>
    ));

    // Replace html break
    str = rr(str, '<br>', (match, i) => (
        <span key={match + count++}>
            <br />
        </span>
    ));

    str = rr(str, '<br/>', (match, i) => (
        <span key={match + count++}>
            <br />
        </span>
    ));

    // Replace ^^ with newline
    str = rr(str, '^^', (match, i) => (
        <span key={match + count++}>
            <br />
        </span>
    ));

    // Replace PF one-action with icon
    str = rr(str, '[[one-action]]', (match, i) => (
        <PF2eAction key={match + count++}>1</PF2eAction>
    ));

    // Replace PF two-action with icon
    str = rr(str, '[[two-action]]', (match, i) => (
        <PF2eAction key={match + count++}>2</PF2eAction>
    ));

    // Replace PF three-action with icon
    str = rr(str, '[[three-action]]', (match, i) => (
        <PF2eAction key={match + count++}>3</PF2eAction>
    ));

    // Replace PF free-action with icon
    str = rr(str, '[[free-action]]', (match, i) => (
        <PF2eAction key={match + count++}>F</PF2eAction>
    ));

    // Replace PF reaction with icon
    str = rr(str, '[[reaction]]', (match, i) => (
        <PF2eAction key={match + count++}>R</PF2eAction>
    ));

    return str;
};

export default { stylize };
