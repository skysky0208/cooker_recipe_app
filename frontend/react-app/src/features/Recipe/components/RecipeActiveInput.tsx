import React from 'react';

interface RecipeActiveInputProps {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}

const RecipeActiveInput: React.FC<RecipeActiveInputProps> = ({ isActive, setIsActive }) => {
    return (
        <div className="flex justify-center">
            <div className="flex items-center pl-4">
                <input
                    onChange={(event) => setIsActive(event.target.value === 'true')}
                    checked={isActive}
                    id="bordered-radio-1"
                    type="radio"
                    value="true"
                    name="bordered-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label htmlFor="bordered-radio-1" className="w-full py-4 ml-2 font-medium text-gray-90 ">
                    公開
                </label>
            </div>
            <div className="flex items-center pl-4">
                <input
                    onChange={(event) => setIsActive(event.target.value === 'true')}
                    checked={!isActive}
                    id="bordered-radio-2"
                    type="radio"
                    value="false"
                    name="bordered-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                />
                <label htmlFor="bordered-radio-2" className="w-full py-4 ml-2 font-medium text-gray-900">
                    非公開
                </label>
            </div>
        </div>
    );
};

export default RecipeActiveInput;
