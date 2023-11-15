import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { RecipeData } from 'interfaces';

interface RecipeCaptionInputProps {
    register: UseFormRegister<RecipeData>; // register 関数の型情報を指定
}

const RecipeCaptionInput: React.FC<RecipeCaptionInputProps> = ({ register }) => {
    return (
        <div>
            <label htmlFor="caption" className="block p-1 m-2 w-28 text-center bg-orange-200 rounded-md">
                説明文
            </label>
            <textarea
                {...register('caption')}
                id="caption"
                rows={4}
                className="block p-2.5 w-4/5 mx-auto  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="レシピの説明文をここに記入してください"
            ></textarea>
        </div>
    );
};

export default RecipeCaptionInput;
