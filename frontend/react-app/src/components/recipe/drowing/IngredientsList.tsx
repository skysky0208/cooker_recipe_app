import React from 'react';

import { Ingredient } from 'interfaces';

interface Props {
    servings: number;
    ingredients: Ingredient[];
}

const IngredientsList: React.FC<Props> = ({ servings, ingredients }) => {
    return (
        <div className="ingredients mb-5">
            <div className="ingredient-title flex items-center">
                <p className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md">材料</p>
                <p className="inline"> （{servings}人分）</p>
            </div>
            <div className="ingredient-contents mx-10 md:mr-5">
                {ingredients.map((ingredient, index) => (
                    <div className="flex justify-between  items-center" key={index}>
                        <p className="pr-4 flex-none">{ingredient.name}</p>
                        <span className="border-b-2 border-gray-400 border-dotted flex-grow"></span>
                        <p className="pl-4 flex-none">{ingredient.amount}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IngredientsList;
