import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

import { Pagination, RecipeDataForIndex } from 'interfaces';
import { getRecipes } from 'lib/api/recipes';
import { formatIngredients } from 'function/recipe_function';

import { RecipeTimeOutput } from 'components/recipe';

const IndexRecipe = () => {
    const navigate = useNavigate();
    const search = useLocation().search;
    const query = new URLSearchParams(search);
    const [loading, setLoading] = useState<boolean>(true);
    const [recipes, setRecipes] = useState<RecipeDataForIndex[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        current: 0,
        limit_value: 0,
        pages: 0,
    });

    const pageChange = (data: any) => {
        let pageNumber = data['selected'] + 1; //選択されたページ番号

        navigate(`/recipes?page=${pageNumber}`);
    };

    const handleGetRecipes = async () => {
        try {
            const query_page = query.get('page');
            const res = await getRecipes(query_page);
            console.log(res);

            if (res.data.status === 200 && res.data.recipes) {
                setRecipes(res.data.recipes);
                setPagination(res.data.pagination);
                console.log(pagination);
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
    }, [search]);

    return (
        <>
            {!loading ? (
                <div className="w-full md:w-2/3 md:my-5 ">
                    <div className=" md:grid lg:grid-cols-2 gap-2">
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
                    <div className="paginate-list flex justify-center">
                        <ReactPaginate
                            pageCount={pagination.pages} //総ページ数
                            marginPagesDisplayed={2} //先頭と末尾に表示するページの数
                            pageRangeDisplayed={5} //上記の「今いるページの前後」の番号をいくつ表示させるか
                            onPageChange={pageChange}
                            containerClassName="pagination flex my-1 lg:mt-4 mx-auto" //ページネーションリンクの親要素のクラス名
                            pageClassName="mx-3 page-item"
                            pageLinkClassName="page-link" //ページネーションのリンクのクラス名
                            activeClassName="active font-semibold" //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます
                            previousLabel="< Prev" //前のページ番号に戻すリンクのテキスト
                            nextLabel="Next >" //次のページに進むボタンのテキスト
                            disabledClassName="disabled"
                            breakLabel="..."
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default IndexRecipe;
