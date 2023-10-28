import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useFieldArray, useForm, Controller } from 'react-hook-form';

import AlertMessage from 'components/AlertMessage';

import { Step } from 'interfaces';
import { getSteps, updateSteps } from 'lib/api/steps';

interface StepsInputProps {
    viewFlag: boolean;
    setViewFlag: React.Dispatch<React.SetStateAction<boolean>>;
    steps: Step[];
    setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
}

const StepsInput: React.FC<StepsInputProps> = ({ viewFlag, setViewFlag, steps, setSteps }) => {
    const { id } = useParams<{ id: string | undefined }>();
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(true);

    const { register, handleSubmit, setValue, control, reset } = useForm();
    const { fields, append, remove, swap } = useFieldArray({
        control,
        name: 'steps',
    });

    const handleUpdateStep = async (data: any) => {
        try {
            console.log(data);
            const res = await updateSteps(id, data);
            console.log(res);

            if (res.data.status === 200) {
                reset();
                setViewFlag(false);
                setSteps(res.data.steps);
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
        setValue('steps', steps);
        setLoading(false);
    }, [viewFlag]);

    // input をいくつ追加したカウント
    const [count, setCount] = useState(0);
    const countUp = () => setCount(count + 1);

    return (
        <>
            {!loading ? (
                <div className="mt-10 md:mx-5">
                    <form onSubmit={handleSubmit(handleUpdateStep)}>
                        {fields.map((field, index) => {
                            setValue(`steps.${index}.order`, index + 1);

                            return (
                                <div key={field.id} className="flex mb-2">
                                    <p className="w-7 h-7 bg-orange-950 text-yellow-100 rounded-md text-center">
                                        {index + 1}
                                    </p>
                                    <label htmlFor={`steps.${index}.descriptipn`} />
                                    <textarea
                                        {...register(`steps.${index}.description`)}
                                        id={`steps.${index}.descriptipn`}
                                        className="p-2 ml-2 w-5/6 border border-gray-300 bg-gray-50 rounded-md text-sm"
                                        placeholder="説明文"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => [swap(index, index - 1)]}
                                        disabled={index === 0}
                                        className="ml-2 h-8 my-auto"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4 md:w-6 md:h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4.5 15.75l7.5-7.5 7.5 7.5"
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => [swap(index, index + 1)]}
                                        disabled={index === fields.length - 1}
                                        className="ml-2 h-8 my-auto"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-4 h-4 md:w-6 md:h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                            />
                                        </svg>
                                    </button>

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
                                            className="w-4 h-4 md:w-6 md:h-6"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            );
                        })}

                        <button
                            type="button"
                            onClick={() => [append({ description: '' }), countUp()]}
                            className="mx-2 my-1 py-1 px-2 border-2 border-orange-400 rounded-md"
                        >
                            + 手順を追加
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

export default StepsInput;
