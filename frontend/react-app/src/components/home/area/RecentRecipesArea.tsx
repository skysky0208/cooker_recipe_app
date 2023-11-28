import React from 'react';
import { Recipe } from 'interfaces';
import { Link } from 'react-router-dom';
import { RecipeTimeOutput } from 'components/recipe';
import RecentRecipeCard from '../card/RecentRecipeCard';

interface Props {
    recentRecipes: Recipe[];
}

const RecentRecipeArea: React.FC<Props> = ({ recentRecipes }) => {
    return (
        <div className="recent-recipe">
            <h2 className="mt-10  text-xl md:text-2xl font-bold text-center text-gray-800">最近投稿されたレシピ</h2>
            <div className="mb-0.5 border-t-4 border-orange-200 w-3/4 md:w-1/3 mx-auto"></div>
            <div className=" border-t-4 border-orange-200 w-3/4 md:w-1/3 mx-auto"></div>

            <div className="container my-5 px-5 mx-auto">
                <div className="flex flex-wrap -m-4">
                    {recentRecipes.map((recipe: Recipe, index) => (
                        <RecentRecipeCard recipe={recipe} index={index} />
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-center mb-5">
                <Link to={`/recipes`} className="inline-flex items-center md:mb-2 lg:mb-0 underline text-orange-800">
                    レシピをもっと見る →
                </Link>
            </div>
        </div>
    );
};

export default RecentRecipeArea;
