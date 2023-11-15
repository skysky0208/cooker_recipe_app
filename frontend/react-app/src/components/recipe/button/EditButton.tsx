import React from 'react';

interface EditButtonProps {
    handler: () => void;
    text: string;
}

const EditButton: React.FC<EditButtonProps> = ({ handler, text }) => {
    return (
        <button
            type="button"
            onClick={handler}
            className="block mx-auto my-1 py-1 px-5 border-2 border-orange-400 rounded-md"
        >
            {text}
        </button>
    );
};

export default EditButton;
