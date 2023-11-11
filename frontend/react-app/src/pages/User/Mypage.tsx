import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import { getUserForMypage } from 'lib/api/user';
import { User, Recipe } from 'interfaces';

const Mypage = () => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User>();
    const [activeRecipes, setActiveRecipes] = useState<Recipe[]>([]);
    const [inactiveRecipes, setInactiveRecipes] = useState<Recipe[]>([]);
    const [openTab, setOpenTab] = useState<number>(1);

    const handleGetUser = async () => {
        try {
            const res = await getUserForMypage();
            console.log(res);

            if (res.data.status === 200) {
                setUser(res.data.user);
                setActiveRecipes(res.data.activeRecipes);
                setInactiveRecipes(res.data.inactiveRecipes);
            } else {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    useEffect(() => {
        handleGetUser();
    }, []);

    return (
        <>
            {!loading ? (
                <div className="bg-white border border-gray-200 lg:rounded-xl shadow-sm text-gray-600">
                    <div className="px-5 mx-auto lg:w-4/6">
                        <div className="flex flex-col sm:flex-row mt-5">
                            <div className="sm:w-1/4 text-center sm:pr-8 sm:py-8">
                                <div className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400">
                                    <svg
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        className="w-10 h-10"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                </div>
                                <div className="flex flex-col items-center text-center justify-center">
                                    <p className="font-medium title-font mt-4 text-gray-900 text-lg">
                                        {user?.nickname}
                                    </p>
                                </div>
                            </div>

                            <div className="md:w-2/3 sm:pl-8 border-gray-200 mt-4 text-center sm:text-left">
                                <div className="flex flex-wrap">
                                    <ul
                                        className="flex mb-0 list-none flex-wrap pt-3 flex-row border-b border-gray-300"
                                        role="tablist"
                                    >
                                        <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                                            <a
                                                className={
                                                    'text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal ' +
                                                    (openTab === 1 ? 'bg-orange-200' : 'bg-gray-100')
                                                }
                                                onClick={() => {
                                                    setOpenTab(1);
                                                }}
                                                data-toggle="tab"
                                                href="#active"
                                                role="tablist"
                                            >
                                                公開中のレシピ
                                            </a>
                                        </li>
                                        <li className="-mb-px last:mr-0 flex-auto text-center border-b border-gray-300">
                                            <a
                                                className={
                                                    'text-xs font-bold uppercase px-5 py-3 rounded-t-lg block leading-normal ' +
                                                    (openTab === 2 ? 'bg-orange-200' : 'bg-gray-100')
                                                }
                                                onClick={() => {
                                                    setOpenTab(2);
                                                }}
                                                data-toggle="tab"
                                                href="#inactive"
                                                role="tablist"
                                            >
                                                非公開中のレシピ
                                            </a>
                                        </li>
                                    </ul>

                                    {/* Tab contents */}
                                    <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                                        <div className={openTab === 1 ? 'block' : 'hidden'} id="active">
                                            <div className="content">
                                                {activeRecipes.map((recipe, index) => (
                                                    <div className="flex items-center bg-white border-t border-gray-200 shadow md:flex-row md:max-w-xl">
                                                        <img
                                                            className="m-2 w-2/5 object-cover rounded-lg"
                                                            src={recipe.image.url}
                                                            alt="recipe-img"
                                                        />
                                                        <div className="w-full p-2">
                                                            <h5 className="mb-1 font-bold tracking-tight text-gray-900">
                                                                {recipe.title}
                                                            </h5>
                                                            <div className="button-group">
                                                                <button
                                                                    type="button"
                                                                    className="w-full my-1 py-1 text-orange-600 text-sm font-medium font-bold border-2 border-orange-300 rounded-lg"
                                                                    onClick={() => {
                                                                        navigate(`/recipes/${recipe.id}`);
                                                                    }}
                                                                >
                                                                    レシピを見る
                                                                </button>
                                                                <div className="flex justify-center gap-1">
                                                                    <button
                                                                        type="button"
                                                                        className="w-1/2 py-1 font-medium text-sm text-orange-600 font-bold border-2 border-orange-300 rounded-lg"
                                                                        onClick={() => {
                                                                            navigate(`/recipes/${recipe.id}/edit`);
                                                                        }}
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke-width="1.5"
                                                                            stroke="currentColor"
                                                                            className="inline w-4 h-4 mr-1"
                                                                        >
                                                                            <path
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                                            />
                                                                        </svg>
                                                                        編集
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className="w-1/2 py-1 font-medium text-sm text-orange-600 font-bold border-2 border-orange-300 rounded-lg"
                                                                    >
                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke-width="1.5"
                                                                            stroke="currentColor"
                                                                            className="inline w-4 h-4 mr-1"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                                            />
                                                                        </svg>
                                                                        削除
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={openTab === 2 ? 'block' : 'hidden'} id="inactive">
                                            {inactiveRecipes.map((recipe, index) => (
                                                <div className="content" key={index}>
                                                    <div className="flex items-center bg-white border-t border-gray-200 shadow md:flex-row md:max-w-xl">
                                                        <img
                                                            className="m-2 w-2/5 object-cover rounded-lg"
                                                            src={recipe.image.url}
                                                            alt="recipe-img"
                                                        />
                                                        <div className="w-full p-2">
                                                            <h5 className="mb-1 text-md font-bold tracking-tight text-gray-900">
                                                                {recipe.title}
                                                            </h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default Mypage;
