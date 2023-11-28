import React from 'react';
import { Link } from 'react-router-dom';

import { RecipeTimeOutput } from 'components/recipe';

import { Recipe } from 'interfaces';

interface Props {
    recipe: Recipe;
    index: number;
}

const RecentRecipeCard: React.FC<Props> = ({ recipe, index }) => {
    return (
        <Link to={`/recipes/${recipe.id}`} className="p-4 w-full md:w-1/3" key={index}>
            <div className="border-2 border-gray-200 border-opacity-60 rounded-lg shadow-lg">
                <img className="h-40 w-full lg:h-48 object-cover" src={recipe.image.url} alt="recipe_img" />
                <div className="md:h-44 p-5 text-orange-950">
                    <h1 className="title-font text-lg font-semibold mb-3">{recipe.title}</h1>
                    <p className="leading-relaxed text-sm mb-3">{recipe.caption}</p>
                    <RecipeTimeOutput
                        preparationTime={recipe.preparationTime}
                        pressTime={recipe.pressTime}
                        isSmall={true}
                    />
                </div>
            </div>
        </Link>
    );
};

export default RecentRecipeCard;
