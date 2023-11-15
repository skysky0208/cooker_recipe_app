import React from 'react';

import { RecipeButtonGroup } from 'components/user';

import { Recipe } from 'interfaces';

interface RecipeCardsProps {
    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
    isViewButton?: boolean;
}

const RecipeCards: React.FC<RecipeCardsProps> = ({ recipes, setRecipes, isViewButton = true }) => {
    return (
        <>
            {recipes.map((recipe: Recipe, index: number) => (
                <div className="flex items-center bg-white border-t border-gray-200 shadow" key={index}>
                    <img className="m-2 w-2/5 h-28 object-cover rounded-lg" src={recipe.image.url} alt="recipe-img" />
                    <div className="w-3/5 p-2">
                        <h5 className="mb-1 font-bold tracking-tight text-gray-900">{recipe.title}</h5>
                        <RecipeButtonGroup
                            recipe={recipe}
                            recipes={recipes}
                            setRecipes={setRecipes}
                            isViewButton={isViewButton}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default RecipeCards;
