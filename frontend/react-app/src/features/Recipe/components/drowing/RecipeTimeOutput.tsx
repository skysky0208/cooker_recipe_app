import React from 'react';

interface RecipeTimeOutputProps {
    preparationTime: number;
    pressTime: number;
}

const RecipeTimeOutput: React.FC<RecipeTimeOutputProps> = ({ preparationTime, pressTime }) => {
    return (
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
                    <p className="text-lg font-medium">{preparationTime} 分</p>
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
                    <p className="text-lg font-medium">{pressTime} 分</p>
                </div>
            </div>
        </div>
    );
};

export default RecipeTimeOutput;
