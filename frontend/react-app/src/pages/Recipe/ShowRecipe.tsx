import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Ingredient, Recipe, Step, User } from 'interfaces';
import { getRecipe } from 'lib/api/recipes';

const ShowRecipe = () => {
    const { id } = useParams<{ id: string | undefined }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [recipe, setRecipe] = useState<Recipe>({
        id: undefined,
        title: '',
        caption: '',
        pressTime: 0,
        preparationTime: 0,
        image: {
            url: '',
        },
        servings: 0,
        isActive: true,
    });
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);
    const [user, setUser] = useState<User>();

    const handleGetRecipe = async () => {
        try {
            const res = await getRecipe(id);
            console.log(res);

            if (res.data.status === 200 && res.data.recipe) {
                setRecipe(res.data.recipe);
                setIngredients(res.data.ingredients);
                setSteps(res.data.steps);
                setUser(res.data.user);
            } else if (res.data.status === 404) {
                console.log('No recipe');
                console.log(res);
                navigate('/not_found');
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
                            <div className="flex w-full p-3 justify-center text-orange-950">
                                <div className="flex justify-center items-center w-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1"
                                        stroke="currentColor"
                                        className="w-10 h-10"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <div className="mx-3">
                                        <p className="text-sm">準備</p>
                                        <p className="text-lg font-medium">{recipe.preparationTime} 分</p>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center w-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-10 h-10 fill-current"
                                        enableBackground="new 0 0 44 44"
                                        viewBox="0 0 44 44"
                                        id="cooking-pot"
                                    >
                                        <path d="M41.4 19h-3.5c-.5-3.4-3.4-6-6.9-6h-2.2l-.4-1.7C28 9.9 26.8 9 25.4 9h-4.9c-1.4 0-2.6.9-2.9 2.3L17.2 13H13c-3.5 0-6.4 2.6-6.9 6H2.6C1.2 19 0 20.2 0 21.6c0 .4.1.8.3 1.2l1.3 2.5c.5 1 1.5 1.7 2.7 1.7H6v12c0 2.2 1.8 4 4 4h24c2.2 0 4-1.8 4-4V27h1.8c1.1 0 2.2-.6 2.7-1.7l1.3-2.6c.2-.4.3-.8.3-1.2C44 20.2 42.8 19 41.4 19zM19.6 11.8c.1-.4.5-.8 1-.8h4.9c.5 0 .9.3 1 .8l.3 1.2h-7.4L19.6 11.8zM13 15h18c2.4 0 4.4 1.7 4.9 4H8.1C8.6 16.7 10.6 15 13 15zM4.2 25c-.4 0-.7-.2-.9-.6l-1.3-2.5C2 21.8 2 21.7 2 21.6 2 21.3 2.3 21 2.6 21H6v4H4.2zM36 39c0 1.1-.9 2-2 2H10c-1.1 0-2-.9-2-2V26v-5h28v5V39zM41.9 21.9l-1.3 2.6c-.2.3-.5.6-.9.6H38v-4h3.4c.3 0 .6.3.6.6C42 21.7 42 21.8 41.9 21.9zM34.4 9.2c-.4.4-.5 1-.1 1.4.2.2.5.4.8.4.2 0 .5-.1.6-.2C36.5 10 37 9.1 37 8s-.5-2-1.4-2.8c-.4-.4-1.1-.3-1.4.1-.4.4-.3 1.1.1 1.4C34.8 7.1 35 7.5 35 8 35 8.5 34.8 8.9 34.4 9.2zM30.3 6.8C30.8 7.1 31 7.5 31 8c0 .5-.2.9-.6 1.2-.4.4-.5 1-.1 1.4.2.2.5.4.8.4.2 0 .5-.1.6-.2C32.5 10 33 9.1 33 8c0-1-.4-1.9-1.2-2.6 0 0-.1-.1-.1-.1C31.2 4.9 31 4.5 31 4s.2-.9.6-1.2c.4-.4.5-1 .1-1.4C31.6 1.1 31.3 1 31 1c-.2 0-.5.1-.7.2C29.5 2 29 2.9 29 4c0 1 .4 1.9 1.2 2.6C30.3 6.7 30.3 6.7 30.3 6.8z"></path>
                                    </svg>
                                    <div className="mx-3">
                                        <p className="text-sm">加圧</p>
                                        <p className="text-lg font-medium">{recipe.pressTime} 分</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ingredients mb-5">
                                <div className="ingredient-title flex items-center">
                                    <p className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md">材料</p>
                                    <p className="inline"> （{recipe.servings}人分）</p>
                                </div>
                                <div className="ingredient-contents mx-10 md:mr-5">
                                    {ingredients.map((ingredient, index) => (
                                        <div className="flex justify-between  items-center">
                                            <p className="pr-4 flex-none">{ingredient.name}</p>
                                            <span className="border-b-2 border-gray-400 border-dotted flex-grow"></span>
                                            <p className="pl-4 flex-none">{ingredient.amount}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="staps mb-5">
                        <p className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md steps-title">作り方</p>
                        <div className="staps-contents mx-5">
                            {steps.map((step, index) => (
                                <div className="flex mb-2">
                                    <div className=" text-orange-400 font-semibold">{step.order}</div>
                                    <p className="pl-3 w-full">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="caption mb-5">
                        <p className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md caption-title">説明文</p>
                        <p className="mx-5">{recipe.caption}</p>
                    </div>

                    <div className="flex m-5 p-2 items-center border-2 rounded-md">
                        <div className="relative w-8 h-8 overflow-hidden bg-gray-300 rounded-full">
                            <svg
                                className="absolute w-10 h-10 text-gray-500 -left-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </div>
                        <p className="mx-5">{user?.nickname}</p>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default ShowRecipe;
