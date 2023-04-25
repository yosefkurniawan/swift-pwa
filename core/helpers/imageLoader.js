export default function thumborLoader({ src, width, quality }) {
    return `https://thumbor.sirclocdn.com/unsafe/filters:format(webp)/${src}?w=${width}&q=${quality || 75}`;
}
