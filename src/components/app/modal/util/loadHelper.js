import { isValidCard } from '../../../../util/dataUtil';

export const handleNewData =
    (dispatch, sourceName, errorMessage, isDeckData) => (rawData) => {
        const printCountError = (count) => {
            if (count === 0)
                alert(
                    'No cards could be validated from ' +
                        sourceName +
                        '\n' +
                        errorMessage
                );
            return count;
        };
        try {
            const data = JSON.parse(rawData);

            // handle deck object
            if (typeof data === 'object' && Array.isArray(data.cards)) {
                if (isDeckData && typeof data.options === 'object') {
                    dispatch.deck.setOptions(data.options);
                }
                const tempValid = data.cards.filter(isValidCard);
                dispatch.deck.addCardsFromData(tempValid);
                return printCountError(tempValid.length);
            }

            // handle array of cards
            if (Array.isArray(data)) {
                const tempValid = data.filter(isValidCard);
                dispatch.deck.addCardsFromData(tempValid);
                return printCountError(tempValid.length);
            }

            // handle single card
            if (typeof data === 'object' && isValidCard(data)) {
                dispatch.deck.addCardsFromData(data);
                return 1;
            }
        } catch (err) {
            console.error(err);
        }

        if (sourceName) {
            alert('Could not validate ' + sourceName + '\n' + errorMessage);
        } else {
            alert(errorMessage);
        }

        return 0;
    };
