const cCard = (state) => {
    return state?.cards?.find(({ _idv4 }) => _idv4 === state?.card);
};

export default {
    state: (state) => state,
    cardData: cCard,
    card: {
        index: (state) =>
            state.cards.length
                ? findCardIndex(state.cards, cCard(state)?._idv4)
                : 0,
        id: (state) => state?.card,
        title: (state) => cCard(state)?.title,
        titleFont: (state) => cCard(state)?.title_font_size,
        bodyFont: (state) => cCard(state)?.body_font_size,
        count: (state) => cCard(state)?.count,
        body: (state) => cCard(state)?.contents,
        qr: (state) => cCard(state)?.qr,
        iconFront: (state) => cCard(state)?.icon_front,
        iconBack: (state) => cCard(state)?.icon_back,
        color: (state) => {
            return cCard(state)?.color;
        },
        code: (state) => cCard(state)?.code,
    },
    cardList: (state) => state.cards,
    defaults: {
        titleFont: (state) => state.options.default_title_font_size,
        bodyFont: (state) => state.options.default_body_font_size,
        color: (state) => state.options.default_color,
        icon: (state) => state.options.default_icon,
        cardHeight: (state) => state.options.card_height,
        cardWidth: (state) => state.options.card_width,
        cardSizeUnit: (state) =>
            String(state.options.card_width).includes('in') ? 'in' : 'mm',
        pageHeight: (state) => state.options.page_height,
        pageWidth: (state) => state.options.page_width,
        pageSizeUnit: (state) =>
            String(state.options.page_width).includes('in') ? 'in' : 'mm',
        pageRow: (state) => state.options.page_rows,
        pageCol: (state) => state.options.page_columns,
        titleFormat: (state) => state.options.title_format,
        shrink: (state) => state.options.shrink,
        scale: (state) => state.options.scale,
        name: (state) => state.name,
    },
};

const findCardIndex = (deck, id) => deck.findIndex(({ _idv4 }) => _idv4 === id);
