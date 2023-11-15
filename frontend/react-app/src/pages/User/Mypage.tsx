import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import { DeleteButton, EditButton } from 'components/user';

import { getUserForMypage } from 'lib/api/user';
import { User, Recipe } from 'interfaces';
import { RecipeCards } from 'components/user';

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
                <div className="bg-white border border-gray-200 lg:rounded-xl shadow-sm text-gray-600 lg:w-2/3">
                    <div className="md:flex mt-5">
                        <div className="md:w-3/12 text-center md:px-4 md:py-8">
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
                            <div className="flex items-center text-center justify-center">
                                <p className="font-medium title-font mt-4 text-gray-900 text-lg">{user?.nickname}</p>
                            </div>
                        </div>

                        <div className="md:w-8/12 border-gray-200 mt-4 text-center sm:text-left">
                            <div className="flex flex-wrap px-3">
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
                                    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
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
                                <div className="flex flex-col min-w-0 w-full bg-white mb-6 shadow-lg rounded">
                                    <div className={openTab === 1 ? 'block' : 'hidden'} id="active">
                                        <RecipeCards recipes={activeRecipes} setRecipes={setActiveRecipes} />
                                    </div>
                                    <div className={openTab === 2 ? 'block' : 'hidden'} id="inactive">
                                        <RecipeCards
                                            recipes={inactiveRecipes}
                                            setRecipes={setInactiveRecipes}
                                            isViewButton={false}
                                        />
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
