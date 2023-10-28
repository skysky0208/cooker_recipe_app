import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useFieldArray, useForm } from 'react-hook-form';

import AlertMessage from 'components/AlertMessage';

import { Ingredient } from 'interfaces';
import { updateIngredients } from 'lib/api/ingredients';

interface IngredientsInputProps {
    viewFlag: boolean;
    setViewFlag: React.Dispatch<React.SetStateAction<boolean>>;
    ingredients: Ingredient[];
    setIngredients: React.Dispatch<React.SetStateAction<Ingredient[]>>;
}

const IngredientsInput: React.FC<IngredientsInputProps> = ({ viewFlag, setViewFlag, ingredients, setIngredients }) => {
    const { id } = useParams<{ id: string | undefined }>();
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    // const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { register, handleSubmit, setValue, control, watch, reset } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const handleUpdateIngredient = async (data: any) => {
        try {
            console.log(data);
            const res = await updateIngredients(id, data);
            console.log(res);

            if (res.data.status === 200) {
                reset();
                setIngredients(res.data.ingredients);
                setViewFlag(false);
            } else {
                console.log('保存できませんでした');
                setAlertMessageOpen(true);
            }
        } catch (err) {
            console.log(err);
            setAlertMessageOpen(true);
        }
    };

    useEffect(() => {
        setValue('ingredients', ingredients);
        setLoading(false);
    }, [viewFlag]);

    // input をいくつ追加したカウント
    const [count, setCount] = useState(0);
    const countUp = () => setCount(count + 1);

    return (
        <>
            {!loading ? (
                <div className="mt-10 md:mx-5">
                    <form onSubmit={handleSubmit(handleUpdateIngredient)}>
                        {fields.map((fields, index) => (
                            <div key={fields.id} className="flex mb-2">
                                <label htmlFor={`ingredients.${index}.name`} />
                                <input
                                    {...register(`ingredients.${index}.name`)}
                                    id={`ingredients.${index}.name`}
                                    className="p-2 ml-2 w-5/6 border border-gray-300 bg-gray-50 rounded-md text-sm"
                                    placeholder="具材・調味料"
                                />

                                <label htmlFor={`ingredients.${index}.amount`} />
                                <input
                                    {...register(`ingredients.${index}.amount`)}
                                    id={`ingredients.${index}.amount`}
                                    className="p-2 ml-2 w-5/6 border border-gray-300 bg-gray-50 rounded-md text-sm"
                                    placeholder="分量"
                                />

                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="ml-2 h-8 my-auto border-2 border-orange-400 rounded-md text-orange-400"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                        />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={() => [append({ name: '', amount: '' }), countUp()]}
                            className="mx-2 my-1 py-1 px-2 border-2 border-orange-400 rounded-md"
                        >
                            + 材料を追加
                        </button>
                        <button
                            type="submit"
                            className="block mx-auto mt-2 py-2 px-10 gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-300"
                        >
                            保存する
                        </button>
                    </form>
                    <AlertMessage
                        open={alertMessageOpen}
                        setOpen={setAlertMessageOpen}
                        severity="error"
                        message="保存できませんでした"
                    />
                </div>
            ) : (
                <></>
            )}
        </>
    );
};

export default IngredientsInput;
