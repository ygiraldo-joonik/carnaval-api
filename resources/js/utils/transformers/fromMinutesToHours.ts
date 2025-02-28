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
    if (h == 0) result += `${s}s`;

    return result.trim();
}

export function formatTo12Hour(timeString: string) {
    let [_, time] = timeString.split(" ");
    let [hour, minute] = time.split(":").map(Number);
    const period = hour >= 12 ? "p.m." : "a.m.";
    hour = hour % 12 || 12;
    return `${hour}:${minute.toString().padStart(2, "0")} ${period}`;
}