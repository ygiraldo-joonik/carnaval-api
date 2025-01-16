export default function truncateText(text: string, length = 50) {
    if (text.length > length) {
        return text.substring(0, length) + "...";
    }
    return text;
}
