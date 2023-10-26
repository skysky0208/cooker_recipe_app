import React from 'react';
import { zenkaku2Hankaku } from '../function';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { UpdateRecipeData } from 'interfaces';

interface RecipeTimeInputProps {
    setValue: UseFormSetValue<UpdateRecipeData>;
    register: UseFormRegister<UpdateRecipeData>; // register 関数の型情報を指定
}

const RecipeTimeInput: React.FC<RecipeTimeInputProps> = ({ register, setValue }) => {
    const handleNumPreparationTime = (event: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = zenkaku2Hankaku(event.target.value);
        const parsedValue = isNaN(parseFloat(inputValue)) ? 0 : parseFloat(inputValue);
        setValue('preparationTime', parsedValue);
    };

    const handleNumPressTime = (event: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = zenkaku2Hankaku(event.target.value);
        const parsedValue = isNaN(parseFloat(inputValue)) ? 0 : parseFloat(inputValue);
        setValue('pressTime', parsedValue);
    };

    return (
        <div className="text-right">
            <div className="inline-block text-sm">
                <label htmlFor="preparationTime">準備</label>
                <input
                    {...register('preparationTime')}
                    type="string"
                    id="preparationTime"
                    name="preparationTime"
                    className="p-2 ml-2 w-12 border border-gray-200 bg-gray-50 rounded-md text-sm"
                    required
                    placeholder="10"
                    onBlur={handleNumPreparationTime}
                />
                <span className="ml-2">分</span>
            </div>
            <div className="ml-5 inline-block text-sm">
                <label htmlFor="pressTime">加圧</label>
                <input
                    {...register('pressTime')}
                    type="string"
                    id="pressTime"
                    name="pressTime"
                    className="p-2 ml-2 w-12 border border-gray-200 bg-gray-50 rounded-md"
                    required
                    placeholder="10"
                    onBlur={handleNumPressTime}
                />
                <span className="ml-2">分</span>
            </div>
        </div>
    );
};

export default RecipeTimeInput;
