import React from 'react';

interface RecipeNameInputProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const RecipeNameInput: React.FC<RecipeNameInputProps> = ({ title, setTitle }) => {
    return (
        <div className="w-full border-t-4 border-b-4 border-dotted border-logo-orange">
            <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                id="title"
                name="title"
                className="p-3 my-2 block w-full border border-gray-200 bg-gray-50 rounded-md text-sm"
                required
                placeholder="レシピ名"
            />
        </div>
    );
};

export default RecipeNameInput;
