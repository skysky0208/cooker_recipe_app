import React, { useState } from 'react';
import DropdownList from './DropdownList';

interface SarchSortAreaProps {
    handleGetRecipes: (keyword?: string, option?: string, sortedBy?: string) => void;
}

export interface Option {
    value: string;
    label: string;
}

interface Radio {
    label: string;
    value: string;
}

const options: Option[] = [
    { value: 'title', label: '料理名' },
    { value: 'ingredient', label: '材料名' },
];

const radioButtons: Radio[] = [
    {
        label: '新着順',
        value: 'latest',
    },
    {
        label: '準備時間順',
        value: 'preparation_time',
    },
    {
        label: '加圧時間順',
        value: 'press_time',
    },
];

const SarchSortArea: React.FC<SarchSortAreaProps> = ({ handleGetRecipes }) => {
    const [sortedBy, setSortedBy] = useState<string>('latest');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedOption, setSelectedOption] = useState<Option | undefined>(options[0]);

    const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSortedBy(event.target.value);
    };

    return (
        <div className="lg:flex lg:justify-center lg:items-center ">
            {/* 検索欄 */}
            <div className="search-form lg:w-1/2 lg:mb-3">
                <div className="flex">
                    <label htmlFor="default-search" className="sr-only">
                        Search
                    </label>

                    <DropdownList
                        options={options}
                        selectedOption={selectedOption}
                        setSelectedOption={setSelectedOption}
                    />
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
                            onClick={() => handleGetRecipes(searchTerm, selectedOption?.value, sortedBy)}
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
            </div>

            {/* ソート欄 */}
            <div className="sort-button text-xs lg:text-base lg:w-1/2">
                <div className="flex justify-center">
                    {radioButtons.map((radio, index) => {
                        return (
                            <div className="flex items-center pl-4" key={index}>
                                <input
                                    type="radio"
                                    id={`bordered-radio-${index}`}
                                    value={radio.value}
                                    checked={radio.value === sortedBy}
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                    onChange={changeValue}
                                />
                                <label
                                    htmlFor={`bordered-radio-${index}`}
                                    className="w-full py-4 ml-2 font-medium text-gray-90 "
                                >
                                    {radio.label}
                                </label>
                            </div>
                        );
                    })}

                    <div className="flex items-center pl-4">
                        <button
                            className="px-5 py-2 text-white bg-gray-500 focus:bg-gray-400 rounded-lg"
                            onClick={() => handleGetRecipes(searchTerm, selectedOption?.value, sortedBy)}
                        >
                            更新
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SarchSortArea;
