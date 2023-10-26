import React from 'react';
import { zenkaku2Hankaku } from '../function';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { UpdateRecipeData } from 'interfaces';

interface RecipeServingsInputProps {
    setValue: UseFormSetValue<UpdateRecipeData>;
    register: UseFormRegister<UpdateRecipeData>; // register 関数の型情報を指定
}

const RecipeServingsInput: React.FC<RecipeServingsInputProps> = ({ register, setValue }) => {
    const handleNumServings = (event: React.FocusEvent<HTMLInputElement>) => {
        const inputValue = zenkaku2Hankaku(event.target.value);
        const parsedValue = isNaN(parseFloat(inputValue)) ? 0 : parseFloat(inputValue);
        setValue('servings', parsedValue);
    };

    return (
        <div className="flex justify-between">
            <label htmlFor="servings" className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md">
                材料
            </label>
            <div className="inline m-1">
                <input
                    {...register('servings')}
                    type="string"
                    id="servings"
                    name="servings"
                    className="p-2 ml-2 w-12 border border-gray-300 bg-gray-50 rounded-md text-sm"
                    required
                    placeholder="2"
                    onBlur={handleNumServings}
                />
                <span className="ml-2">人分</span>
            </div>
        </div>
    );
};

export default RecipeServingsInput;
