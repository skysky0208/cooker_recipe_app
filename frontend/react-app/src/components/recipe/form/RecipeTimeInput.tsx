import React from 'react';
import { UseFormRegister, UseFormSetValue, FieldErrors } from 'react-hook-form';

import { RecipeData } from 'interfaces';
import { zenkaku2Hankaku } from 'function/recipe_function';

interface RecipeTimeInputProps {
    setValue: UseFormSetValue<RecipeData>;
    register: UseFormRegister<RecipeData>; // register 関数の型情報を指定
    errors: FieldErrors<RecipeData>;
}

const RecipeTimeInput: React.FC<RecipeTimeInputProps> = ({ register, setValue, errors }) => {
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
        <>
            <div className="text-right">
                <div className="inline-block text-sm">
                    <label htmlFor="preparationTime">準備</label>
                    <input
                        {...register('preparationTime', {
                            required: '必須項目です。',
                        })}
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
                        {...register('pressTime', {
                            required: '必須項目です。',
                        })}
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
            <div className="text-right">
                <div className="inline-block text-sm">
                    {(errors.preparationTime || errors.pressTime) && (
                        <span className="text-sm text-red-600 mx-3">準備時間と加圧時間は必須項目です。</span>
                    )}
                </div>
            </div>
        </>
    );
};

export default RecipeTimeInput;
