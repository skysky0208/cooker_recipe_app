import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import RecentRecipeArea from 'components/home/area/RecentRecipesArea';
import { RecommendedRecipeCard } from 'components/home';

import { getRecommendedRecipe, getRecentRecipes } from 'lib/api/recipes';
import { Recipe } from 'interfaces';

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
                    <RecommendedRecipeCard recommendedRecipe={recommendedRecipe} />
                    <RecentRecipeArea recentRecipes={recentRecipes} />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Home;
