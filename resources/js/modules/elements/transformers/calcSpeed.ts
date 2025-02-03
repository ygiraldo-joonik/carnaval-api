import { Parade } from "@/types/parade";
import { calcParadeLength } from "./calcLength";

// [DEPRECATED] This function is not used in the project
export const calcParadeSpeed = (
    parade: Parade,
    fixDecimals: boolean = false
): number | string => {
    const paradeLength = calcParadeLength(parade);
    const totalLength = (paradeLength + parade.distance) / 1000;
    const paradeDuration = parade.duration / 60;
    const speed = totalLength / paradeDuration;
    if (fixDecimals) return speed.toFixed(1);
    return speed;
};

export const metterPerMinuteToKilometerPerHour = (speed: number): number =>
    (speed * 60) / 1000;
