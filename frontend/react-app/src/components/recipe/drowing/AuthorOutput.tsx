import React from 'react';

interface Props {
    nickname: string | undefined;
}

const AuthorOutput: React.FC<Props> = ({ nickname }) => {
    return (
        <div className="flex m-5 p-2 items-center border-2 rounded-md">
            <div className="relative w-8 h-8 overflow-hidden bg-gray-300 rounded-full">
                <svg
                    className="absolute w-10 h-10 text-gray-500 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </div>
            <p className="mx-5">{nickname}</p>
        </div>
    );
};

export default AuthorOutput;
