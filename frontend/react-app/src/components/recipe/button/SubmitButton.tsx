import React from 'react';

interface SubmitButtonProps {
    handler: () => void;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ handler }) => {
    return (
        <button
            type="submit"
            onClick={handler}
            className="block mx-auto py-3 px-8 gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-300"
        >
            保存する
        </button>
    );
};

export default SubmitButton;
