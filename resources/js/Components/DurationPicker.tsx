import { Duration } from "@/types/parade";
import React, { useState, useEffect } from "react";

// Define the type for the props
interface DurationPickerProps {
    defaultValue?: Duration;
    onChange: (duration: Duration) => void;
}

const DurationPicker: React.FC<DurationPickerProps> = ({
    defaultValue = { hours: 0, minutes: 0 },
    onChange,
}) => {
    // State for hours and minutes
    const [hours, setHours] = useState<number>(defaultValue.hours);
    const [minutes, setMinutes] = useState<number>(defaultValue.minutes);

    // Update internal state if defaultValue changes
    useEffect(() => {
        setHours(defaultValue.hours);
        setMinutes(defaultValue.minutes);
    }, [defaultValue.hours, defaultValue.minutes]);

    // Handler for hours input change
    const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(
            0,
            Math.min(23, parseInt(e.target.value, 10) || 0)
        );
        setHours(value);
        onChange({ hours: value, minutes });
    };

    // Handler for minutes input change
    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(
            0,
            Math.min(59, parseInt(e.target.value, 10) || 0)
        );
        setMinutes(value);
        onChange({ hours, minutes: value });
    };

    return (
        <div className="w-full flex gap-2">
            <div className="flex-1">
                <label
                    htmlFor="hours"
                    className="block text-sm font-medium text-gray-400"
                >
                    Horas
                </label>
                <input
                    type="number"
                    id="hours"
                    value={hours}
                    onChange={handleHoursChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    min="0"
                    max="23"
                />
            </div>
            <div className="flex-1">
                <label
                    htmlFor="minutes"
                    className="block text-sm font-medium text-gray-400"
                >
                    Minutos
                </label>
                <input
                    type="number"
                    id="minutes"
                    value={minutes}
                    onChange={handleMinutesChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    min="0"
                    max="59"
                />
            </div>
        </div>
    );
};

export default DurationPicker;
