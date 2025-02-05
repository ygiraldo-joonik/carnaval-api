export function fromMinutesToHours(m:number) {
    const hours = Math.floor(m / 60);
    const min = Math.round(m % 60);
    return `${hours}:${min.toString().padStart(2, '0')}`;
}