import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { RecipeDataForShow } from 'interfaces';
import { getRecipe } from 'lib/api/recipes';
import { AuthorOutput, IngredientsList, RecipeTimeOutput, StepsList } from 'components/recipe';

const ShowRecipe = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [recipe, setRecipe] = useState<RecipeDataForShow>({
        title: '',
        caption: '',
        pressTime: 0,
        preparationTime: 0,
        image: {
            url: '',
        },
        servings: 0,
        ingredients: [],
        steps: [],
    });

    const handleGetRecipe = async () => {
        try {
            const res = await getRecipe(id);
            console.log(res);

            if (res.data.status === 200 && res.data.recipe) {
                setRecipe(res.data.recipe);
            } else {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    useEffect(() => {
        handleGetRecipe();
    }, []);

    return (
        <>
            {!loading ? (
                <div className="w-full lg:w-2/3 px-3 md:p-5 lg:my-5 bg-white border border-gray-200 lg:rounded-xl shadow-sm">
                    <div className="w-3/4 md:w-1/2 mx-auto my-3 border-t-4 border-b-4 border-dotted border-logo-orange text-center font-semibold">
                        <p className="py-2 text-xl md:text-2xl text-orange-950">{recipe.title}</p>
                    </div>
                    <div className="md:flex">
                        <img className="md-left-contents md:w-3/5 md:p-5" src={recipe.image.url} alt="recipe-img" />
                        <div className="md-right-contents md:w-2/5 md:py-5">
                            <RecipeTimeOutput preparationTime={recipe.preparationTime} pressTime={recipe.pressTime} />
                            <IngredientsList servings={recipe.servings} ingredients={recipe.ingredients} />
                        </div>
                    </div>
                    <StepsList steps={recipe.steps} />

                    <div className="caption mb-5">
                        <p className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md caption-title">説明文</p>
                        <p className="mx-5">{recipe.caption}</p>
                    </div>
                    <AuthorOutput nickname={recipe.user?.nickname} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default ShowRecipe;
