import React, { useState } from 'react';

import { AlertMessage } from 'components/common';

import { deleteRecipe } from 'lib/api/recipes';
import { Recipe } from 'interfaces';

interface DeleteButtonProps {
    id: number | undefined;
    recipes: Recipe[];
    setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ id, recipes, setRecipes }) => {
    const [showConfirmDialog, setConfirmDialog] = useState(false);
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    const handleDeleteRecipe = async () => {
        try {
            const res = await deleteRecipe(id);
            console.log(res);

            if (res.data.status === 200) {
                setRecipes(recipes.filter((item) => item.id !== id));
                setConfirmDialog(false);
            } else {
                setAlertMessageOpen(true);
                console.log('削除できませんでした');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <button
                type="button"
                className="w-1/2 py-1 font-medium text-sm text-orange-600 font-bold border-2 border-orange-300 rounded-lg"
                onClick={() => {
                    setConfirmDialog(true);
                }}
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                </svg>
                削除
            </button>

            {showConfirmDialog && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                    <div className="bg-white p-10 rounded shadow-md">
                        <p className="text-center">本当に削除しますか？</p>
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => {
                                    setConfirmDialog(false);
                                }}
                                className="bg-gray-500 text-white px-4 py-2 mr-2 rounded"
                            >
                                キャンセル
                            </button>
                            <button
                                onClick={() => {
                                    handleDeleteRecipe();
                                }}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                削除
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <AlertMessage // エラーが発生した場合はアラートを表示
                open={alertMessageOpen}
                setOpen={setAlertMessageOpen}
                severity="error"
                message="削除できませんでした"
            />
        </>
    );
};

export default DeleteButton;
