import cardUtil from '../../util/cardUtil';
import { D20Table, D20Score } from './css';

export default (params) => {
    const [str, dex, con, int, wis, cha] = cardUtil.d20AbilityScores(params);

    return (
        <D20Table
            className='card-element card-d20-stat'
            cardStyle={params.cardStyle}
        >
            <thead>
                <tr>
                    <th>STR</th>
                    <th>DEX</th>
                    <th>CON</th>
                    <th>INT</th>
                    <th>WIS</th>
                    <th>CHA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <Score value={str} />
                    <Score value={dex} />
                    <Score value={con} />
                    <Score value={int} />
                    <Score value={wis} />
                    <Score value={cha} />
                </tr>
            </tbody>
        </D20Table>
    );
};

const Score = ({ value: v = 10, ...props }) => {
    const value = Number(v) || 10;
    const mod = Math.floor((value - 10) / 2);
    return (
        <D20Score {...props}>{`${value} (${
            mod >= 0 ? '+' + mod : mod
        })`}</D20Score>
    );
};
