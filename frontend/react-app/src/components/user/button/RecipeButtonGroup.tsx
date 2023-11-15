import React from 'react';
import { useNavigate } from 'react-router-dom';

import { EditButton, DeleteButton } from 'components/user';

import { Recipe } from 'interfaces';

interface RecipeButtonGroupProps {
    recipe: Recipe;
    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
    isViewButton?: boolean;
}

const RecipeButtonGroup: React.FC<RecipeButtonGroupProps> = ({ recipe, recipes, setRecipes, isViewButton = true }) => {
    const navigate = useNavigate();

    return (
        <div className="button-group">
            {isViewButton && (
                <button
                    type="button"
                    className="w-full my-1 py-1 text-orange-600 text-sm font-medium font-bold border-2 border-orange-300 rounded-lg"
                    onClick={() => {
                        navigate(`/recipes/${recipe.id}`);
                    }}
                >
                    レシピを見る
                </button>
            )}
            <div className="flex justify-center gap-1">
                <EditButton
                    handler={() => {
                        navigate(`/recipes/${recipe.id}/edit`);
                    }}
                />
                <DeleteButton id={recipe.id} recipes={recipes} setRecipes={setRecipes} />
            </div>
        </div>
    );
};

export default RecipeButtonGroup;
