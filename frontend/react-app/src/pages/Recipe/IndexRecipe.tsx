import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { RecipeDataForIndex } from 'interfaces';
import { getRecipes } from 'lib/api/recipes';
import { formatIngredients } from 'features/Recipe/function';

import { RecipeTimeOutput } from 'features/Recipe/components';

const IndexRecipe = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);
    const [recipes, setRecipes] = useState<RecipeDataForIndex[]>([]);

    const handleGetRecipes = async () => {
        try {
            const res = await getRecipes();
            console.log(res);

            if (res.data.status === 200 && res.data.recipes) {
                setRecipes(res.data.recipes);
                console.log(recipes);
            } else {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    useEffect(() => {
        handleGetRecipes();
    }, []);

    return (
        <>
            {!loading ? (
                <div className="w-full md:grid lg:grid-cols-2 gap-2  md:w-2/3 md:my-5 ">
                    {recipes.map((recipe: RecipeDataForIndex, index) => (
                        <Link to={`/recipes/${recipe.id}`} key={index}>
                            <div className="flex items-center bg-white border-t border-b border-gray-200 md:rounded-lg md:gap-2 shadow md:flex-row md:max-w-xl hover:bg-gray-100">
                                <img
                                    className="m-2 w-40 h-32 object-cover rounded-lg"
                                    src={recipe.image.url}
                                    alt="recipe-img"
                                />
                                <div className="w-full p-2">
                                    <h5 className="mb-1 text-lg font-bold tracking-tight text-gray-900">
                                        {recipe.title}
                                    </h5>
                                    <p className="mb-3 text-sm text-gray-700">
                                        {formatIngredients(recipe.ingredients)}
                                    </p>
                                    <RecipeTimeOutput
                                        preparationTime={recipe.preparationTime}
                                        pressTime={recipe.pressTime}
                                        isSmall={true}
                                    />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default IndexRecipe;
