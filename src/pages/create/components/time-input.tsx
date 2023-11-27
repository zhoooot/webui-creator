import { time } from 'console';
import React from 'react';

interface TimeInputProps {
    timeValue: number;
    handleTimeChange: (event: React.ChangeEvent<HTMLSelectElement>, time: number) => void;
}

export const TIME = [5, 10, 15, 20];

const TimeInput: React.FC<TimeInputProps> = ({
    timeValue,
    handleTimeChange,
}) => {
    return (
        <select className="select select-primary select-lg w-full max-w-xs" onChange={(event) => {
            const selectedIndex = event.target.selectedIndex;
            handleTimeChange(event, TIME[selectedIndex]);
            timeValue = TIME[selectedIndex];
        }} value={timeValue}>
            <option disabled selected>Time</option>
            {TIME.map((time, index) => (
                <option key={index} value={index}>{time}s</option>
            ))}
        </select>
    );
}

export default TimeInput;