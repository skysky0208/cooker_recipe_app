import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { RecipeData } from 'interfaces';

interface RecipeTitleInputProps {
    register: UseFormRegister<RecipeData>; // register 関数の型情報を指定
    isBorder: boolean;
}

const RecipeTitleInput: React.FC<RecipeTitleInputProps> = ({ register, isBorder }) => {
    return (
        <div className={`w-full  ${isBorder ? 'border-t-4 border-b-4 border-dotted border-logo-orange' : ''}`}>
            <input
                {...register('title')}
                type="text"
                id="title"
                name="title"
                className="p-3 my-2 block w-full border border-gray-200 bg-gray-50 rounded-md text-lg"
                required
                placeholder="レシピ名"
            />
        </div>
    );
};

export default RecipeTitleInput;
