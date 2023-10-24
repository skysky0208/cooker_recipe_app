import React from 'react';
import { zenkaku2Hankaku } from '../function';

interface RecipeTimeInputProps {
    preparationTime: number | string;
    pressTime: number | string;
    setPreparationTime: React.Dispatch<React.SetStateAction<number | string>>;
    setPressTime: React.Dispatch<React.SetStateAction<number | string>>;
}

const handleNumFromChange = (event: any, setValue: React.Dispatch<React.SetStateAction<number | string>>) => {
    const inputValue = zenkaku2Hankaku(event.target.value);
    const parsedValue = isNaN(parseFloat(inputValue)) ? '' : parseFloat(inputValue);
    setValue(parsedValue);
};

const RecipeTimeInput: React.FC<RecipeTimeInputProps> = ({
    preparationTime,
    pressTime,
    setPreparationTime,
    setPressTime,
}) => {
    return (
        <div className="text-right">
            <div className="inline-block text-sm">
                <label htmlFor="preparationTime">準備</label>
                <input
                    type="string"
                    value={preparationTime}
                    onChange={(event) => handleNumFromChange(event, setPreparationTime)}
                    id="preparationTime"
                    name="preparationTime"
                    className="p-2 ml-2 w-12 border border-gray-200 bg-gray-50 rounded-md text-sm"
                    required
                    placeholder="10"
                />
                <span className="ml-2">分</span>
            </div>
            <div className="ml-5 inline-block text-sm">
                <label htmlFor="pressTime">加圧</label>
                <input
                    type="string"
                    value={pressTime}
                    onChange={(event) => handleNumFromChange(event, setPressTime)}
                    id="pressTime"
                    name="pressTime"
                    className="p-2 ml-2 w-12 border border-gray-200 bg-gray-50 rounded-md"
                    required
                    placeholder="10"
                />
                <span className="ml-2">分</span>
            </div>
        </div>
    );
};

export default RecipeTimeInput;
