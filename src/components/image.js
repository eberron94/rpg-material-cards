export default ({ alt, src, rotation = '', color = '', style, ...props }) => {
    if (!src) return null;

    let imageStyle = typeof style === 'object' ? { ...style } : {};

    if (rotation) {
        imageStyle.transform = `rotate(${rotation}deg)`;
    }

    if (color) {
        imageStyle.color = color;
    }

    return <img alt={alt} src={src} style={imageStyle} {...props} />;
};
