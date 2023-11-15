import React from 'react';

interface EditButtonProps {
    handler: () => void;
}

const EditButton: React.FC<EditButtonProps> = ({ handler }) => {
    return (
        <button
            type="button"
            className="w-1/2 py-1 font-medium text-sm text-orange-600 font-bold border-2 border-orange-300 rounded-lg"
            onClick={handler}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="inline w-4 h-4 mr-1"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
            </svg>
            編集
        </button>
    );
};

export default EditButton;
