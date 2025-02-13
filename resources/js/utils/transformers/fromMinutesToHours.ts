export function fromMinutesToHours(m: number) {
    const hours = Math.floor(m / 60);
    const min = Math.round(m % 60);
    return `${hours}:${min.toString().padStart(2, "0")}`;
}

export function formatSeconds(s: number) {
    const hours = Math.floor(s / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = Math.round(s % 60);

    if (hours === 0) {
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
}
