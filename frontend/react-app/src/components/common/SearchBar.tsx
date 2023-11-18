import React, { useState } from 'react';
import { Pagination, Recipe, RecipeDataForIndex } from 'interfaces';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import { searchRecipes } from 'lib/api/search';
import ReactPaginate from 'react-paginate';

interface SearchBarProps {
    setPagination: (pagination: Pagination) => void;
    setRecipes: (recipes: RecipeDataForIndex[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setPagination, setRecipes }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const search = useLocation().search;
    const query = new URLSearchParams(search);

    const handleSearch = async () => {
        try {
            const page = query.get('page');
            const res = await searchRecipes(page, searchTerm);
            console.log(res);

            if (res.data.status === 200 && res.data.recipes) {
                setRecipes(res.data.recipes);
                setPagination(res.data.pagination);
            } else {
                navigate('/recipes');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <label htmlFor="default-search" className="sr-only">
                Search
            </label>
            <div className="relative md:w-1/2">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-500"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    id="default-search"
                    className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                    placeholder="検索ワードを入力する"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="absolute px-4 py-1.5 end-1.5 bottom-1.5 bg-gray-500 hover:bg-gray-500 rounded-lg text-sm text-white"
                    onClick={handleSearch}
                >
                    検索
                </button>
            </div>
        </>
    );
};

export default SearchBar;
