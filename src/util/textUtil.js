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

    // Add biu to ~***string***~
    str = rr(str, /[~]{1}[_*]{3}([^\*]+)[_*]{3}[~]{1}/g, (match, i) => (
        <strong key={match + count++}>
            <em>
                <u>{match}</u>
            </em>
        </strong>
    ));

    // Add biu to ***~string~***
    str = rr(str, /[_*]{3}[~]{1}([^\*]+)[~]{1}[_*]{3}/g, (match, i) => (
        <strong key={match + count++}>
            <em>
                <u>{match}</u>
            </em>
        </strong>
    ));

    // Add bold and italics to ***string***
    str = rr(str, /[_*]{3}([^\*]+)[_*]{3}/g, (match, i) => (
        <strong key={match + count++}>
            <em>{match}</em>
        </strong>
    ));

    // Add bu to ~**string**~
    str = rr(str, /[~]{1}[_*]{2}([^\*]+)[_*]{2}[~]{1}/g, (match, i) => (
        <strong key={match + count++}>
            <u>{match}</u>
        </strong>
    ));

    // Add bu to **~string~**
    str = rr(str, /[_*]{2}[~]{1}([^\*]+)[~]{1}[_*]{2}/g, (match, i) => (
        <strong key={match + count++}>
            <u>{match}</u>
        </strong>
    ));

    // Add bold to **string**
    str = rr(str, /[_*]{2}([^\*]+)[_*]{2}/g, (match, i) => (
        <strong key={match + count++}>{match}</strong>
    ));

    // Add iu to ~*string*~
    str = rr(str, /[~]{1}[_*]{1}([^\*]+)[_*]{1}[~]{1}/g, (match, i) => (
        <em key={match + count++}>
            <u>{match}</u>
        </em>
    ));

    // Add iu to *~string~*
    str = rr(str, /[_*]{1}[~]{1}([^\*]+)[~]{1}[_*]{1}/g, (match, i) => (
        <em key={match + count++}>
            <u>{match}</u>
        </em>
    ));

    // Add italics to *string*
    str = rr(str, /[_*]{1}([^\*]+)[_*]{1}/g, (match, i) => (
        <em key={match + count++}>{match}</em>
    ));

    // Add underline to ~string~
    str = rr(str, /[~]{1}([^\*]+)[~]{1}/g, (match, i) => (
        <u key={match + count++}>{match}</u>
    ));

    // Replace mdash to ---
    str = rr(str, '---', (match, i) => (
        <span key={match + count++}>&mdash;</span>
    ));

    // Replace ndash to --
    str = rr(str, '--', (match, i) => (
        <span key={match + count++}>&ndash;</span>
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

export default {
    stylize,
};
