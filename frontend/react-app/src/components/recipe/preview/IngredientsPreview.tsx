import { Ingredient } from 'interfaces';
import React from 'react';
import { EditButton } from 'components/recipe';

interface Props {
    ingredients: Ingredient[];
    handleSetPopup: () => void;
}

const IngredientsPreview: React.FC<Props> = ({ ingredients, handleSetPopup }) => {
    return (
        <>
            <div className="mx-10 py-2">
                <table className="w-full">
                    <tbody>
                        {ingredients.map((ingredient, index) => {
                            return (
                                <tr className="px-3">
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
