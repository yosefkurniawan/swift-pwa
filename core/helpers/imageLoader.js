// eslint-disable-next-line object-curly-newline
export default function thumborLoader({ src, width, quality, loaderURL = 'https://thumbor.sirclocdn.com' }) {
    return `${loaderURL}/unsafe/filters:format(webp)/${src}?w=${width}&q=${quality || 75}`;
}
