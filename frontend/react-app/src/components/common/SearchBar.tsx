import React, { useState } from 'react';
import { Pagination, Recipe, RecipeDataForIndex } from 'interfaces';
import { useNavigate, Link, useLocation } from 'react-router-dom';

import { searchRecipes } from 'lib/api/search';
import ReactPaginate from 'react-paginate';
import DropdownList from './DropdownList';
import { Option } from 'interfaces';

interface SearchBarProps {
    setPagination: (pagination: Pagination) => void;
    setRecipes: (recipes: RecipeDataForIndex[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setPagination, setRecipes }) => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>('');
    const search = useLocation().search;
    const query = new URLSearchParams(search);

    const options: Option[] = [
        { value: 'title', label: '料理名' },
        { value: 'ingredient', label: '材料名' },
    ];
    const [selectedOption, setSelectedOption] = useState<Option | undefined>(options[0]);

    const handleSearch = async () => {
        try {
            const page = query.get('page');
            const res = await searchRecipes(page, searchTerm, selectedOption?.value);
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
            <div className="flex">
                <label htmlFor="default-search" className="sr-only">
                    Search
                </label>

                <DropdownList options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                <div className="relative w-full">
                    <input
                        type="search"
                        id="default-search"
                        className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-300 rounded-e-lg border border-gray-300 bg-gray-50"
                        placeholder="検索ワードを入力する"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full bg-gray-500 hover:bg-gray-500 rounded-e-lg text-sm text-white"
                        onClick={handleSearch}
                    >
                        <svg
                            className="w-4 h-4"
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
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default SearchBar;
