import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { getRecommendedRecipe, getRecentRecipes } from 'lib/api/recipes';
import { User, Recipe } from 'interfaces';
import { RecipeTimeOutput } from 'components/recipe';

// とりあえず認証済みユーザーの名前やメールアドレスを表示
const Home = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [recommendedRecipe, setRecommendedRecipe] = useState<Recipe>();
    const [recentRecipes, setRecentRecipes] = useState<Recipe[]>([]);

    const handleGetReccomendedRecipe = async () => {
        try {
            const res = await getRecommendedRecipe();

            if (res.status === 200) {
                setRecommendedRecipe(res.data.recommendedRecipe);
                console.log(recommendedRecipe);
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleGetRecentRecipes = async () => {
        try {
            const res = await getRecentRecipes();
            if (res.status === 200) {
                setRecentRecipes(res.data.recentRecipes);
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        handleGetReccomendedRecipe();
        handleGetRecentRecipes();
        setLoading(false);
    }, []);

    return (
        <>
            {!loading ? (
                <div className="bg-white border border-gray-200 my-5 lg:rounded-xl shadow-sm text-gray-600 lg:w-2/3">
                    <img src={`${process.env.PUBLIC_URL}/title.png`} className="mx-auto my-5" />

                    <Link to={`/recipes/${recommendedRecipe?.id}`}>
                        <div className="lg:w-3/5 mx-5 lg:mx-auto flex flex-wrap border shadow-lg rounded-lg bg-white">
                            <img
                                alt="ecommerce"
                                className="lg:w-1/2 w-full lg:h-auto h-40 object-cover object-center "
                                src={recommendedRecipe?.image.url}
                            />
                            <div className="lg:w-1/2 w-full px-3 lg:pl-5 lg:py-6 my-4 lg:mt-0 text-orange-950">
                                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                                    今日のおすすめレシピ
                                </h2>
                                <h1 className=" text-xl my-1 lg:text-2xl font-bold lg:my-3">
                                    {recommendedRecipe?.title}
                                </h1>
                                <p className="leading-relaxed text-sm lg:text-base">{recommendedRecipe?.caption}</p>
                            </div>
                        </div>
                    </Link>
                    <div className="">
                        <h2 className="mt-10  text-xl md:text-2xl font-bold text-center text-gray-800">
                            最近投稿されたレシピ
                        </h2>
                        <div className="mb-0.5 border-t-4 border-orange-200 w-3/4 md:w-1/3 mx-auto"></div>
                        <div className=" border-t-4 border-orange-200 w-3/4 md:w-1/3 mx-auto"></div>

                        <div className="container my-5 px-5 mx-auto">
                            <div className="flex flex-wrap -m-4">
                                {recentRecipes.map((recipe: Recipe, index) => (
                                    <Link to={`/recipes/${recipe.id}`} className="p-4 w-full md:w-1/3" key={index}>
                                        <div className="border-2 border-gray-200 border-opacity-60 rounded-lg shadow-lg">
                                            <img
                                                className="h-40 w-full lg:h-48 object-cover"
                                                src={recipe.image.url}
                                                alt="recipe_img"
                                            />
                                            <div className="md:h-44 p-5 text-orange-950">
                                                <h1 className="title-font text-lg font-semibold mb-3">
                                                    {recipe.title}
                                                </h1>
                                                <p className="leading-relaxed text-sm mb-3">{recipe.caption}</p>
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
                        </div>
                        <div className="flex items-center justify-center mb-5">
                            <Link
                                to={`/recipes`}
                                className="inline-flex items-center md:mb-2 lg:mb-0 underline text-orange-800"
                            >
                                レシピをもっと見る →
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Home;
