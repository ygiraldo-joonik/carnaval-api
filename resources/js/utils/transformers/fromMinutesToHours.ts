export function fromMinutesToHours(m: number) {
    return formatTimeHMS(m * 60);
}

export function formatSeconds(_seconds: number) {
    return formatTimeHMS(_seconds);
}

export function formatTimeHMS(_seconds: number) {
    const seconds = Math.abs(_seconds);
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.round(seconds % 60);

    let result = "";
    if (h > 0) result += `${h}h `;
    if (m > 0 || h > 0) result += `${m}m `;
    result += `${s}s`;

    return result.trim();
}
