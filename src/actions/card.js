const types = {
    TITLE: 'card.set.title',
    TITLE_FONT: 'card.set.title-font',
    BODY_FONT: 'card.set.body-font',
    COUNT: 'card.set.count',
    BODY: 'card.set.body',
    QR: 'card.set.qr',
    ICON_FRONT: 'card.set.icon-front',
    ICON_BACK: 'card.set.icon-back',
    COLOR: 'card.set.color',
};

const actions = {
    setTitle: (value) => ({
        type: types.TITLE,
        value,
    }),
    setTitleFont: (value) => ({
        type: types.TITLE_FONT,
        value,
    }),
    setBodyFont: (value) => ({
        type: types.BODY_FONT,
        value,
    }),
    setCount: (value) => ({
        type: types.COUNT,
        value,
    }),
    setBody: (value) => ({
        type: types.BODY,
        value,
    }),
    setQR: (value) => ({
        type: types.QR,
        value,
    }),
    setIconFront: (value) => ({
        type: types.ICON_FRONT,
        value,
    }),
    setIconBack: (value) => ({
        type: types.ICON_BACK,
        value,
    }),
    setColor: (value) => ({
        type: types.COLOR,
        value,
    }),
};

export default { types, actions };
