import React from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { EditButton, RecipeServingsInput } from 'components/recipe';

import { Ingredient } from 'interfaces';
import { RecipeData } from 'interfaces';

interface Props {
    register: UseFormRegister<RecipeData>;
    setValue: UseFormSetValue<RecipeData>;
    ingredients: Ingredient[];
    handleSetPopup: () => void;
}

const IngredientsPreview: React.FC<Props> = ({ ingredients, handleSetPopup, register, setValue }) => {
    return (
        <>
            <RecipeServingsInput register={register} setValue={setValue} />
            <div className="mx-10 py-2">
                <table className="w-full">
                    <tbody>
                        {ingredients.map((ingredient, index) => {
                            return (
                                <tr className="px-3" key={index}>
                                    <td>{ingredient.name}</td>
                                    <td className="text-right">{ingredient.amount}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <EditButton handler={handleSetPopup} text={'材料を編集'} />
        </>
    );
};

export default IngredientsPreview;
