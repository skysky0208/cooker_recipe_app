import React from 'react';
import { Link } from 'react-router-dom';

import { Recipe } from 'interfaces';

interface Props {
    recommendedRecipe: Recipe | undefined;
}

const RecommendedRecipeCard: React.FC<Props> = ({ recommendedRecipe }) => {
    return (
        <div className="recommended-recipe">
            <Link to={`/recipes/${recommendedRecipe?.id}`}>
                <div className="lg:w-3/5 mx-5 lg:mx-auto flex flex-wrap border shadow-lg rounded-lg bg-white">
                    <img
                        alt="ecommerce"
                        className="lg:w-1/2 w-full lg:h-auto h-40 object-cover object-center "
                        src={recommendedRecipe?.image.url}
                    />
                    <div className="lg:w-1/2 w-full px-3 lg:pl-5 lg:py-6 my-4 lg:mt-0 text-orange-950">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">今日のおすすめレシピ</h2>
                        <h1 className=" text-xl my-1 lg:text-2xl font-bold lg:my-3">{recommendedRecipe?.title}</h1>
                        <p className="leading-relaxed text-sm lg:text-base">{recommendedRecipe?.caption}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default RecommendedRecipeCard;
