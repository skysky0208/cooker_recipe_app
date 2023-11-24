import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import AlertMessage from 'components/common/AlertMessage';
import { RecipeTitleInput, RecipeTimeInput, SubmitButton, ImageInput } from 'components/recipe';

import { RecipeData, RecipeFormData } from 'interfaces';
import { createRecipe } from 'lib/api/recipes';

const CreateRecipe = () => {
    const { register, handleSubmit, setValue } = useForm<RecipeData>();
    const navigate = useNavigate();

    const [image, setImage] = useState<string>('');

    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    // フォームデータを作成
    const createFormData = (data: any): RecipeFormData => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        if (image) formData.append('image', image);
        return formData;
    };

    const handleCreateRecipe = async (data: RecipeData) => {
        try {
            const formdata = createFormData(data);
            const res = await createRecipe(formdata);

            if (res.data.status === 200) {
                navigate(`/recipes/${res.data.id}/edit`);
            } else {
                setAlertMessageOpen(true);
            }
        } catch (err) {
            console.log(err);
            setAlertMessageOpen(true);
        }
    };
    return (
        <>
            <div className="w-full md:mx-3 lg:w-2/3 lg:my-5 bg-white border border-gray-200 lg:rounded-xl shadow-sm">
                <form>
                    <div className="p-4 sm:p-7 flex justify-center ">
                        <div className="grid gap-y-4 w-full">
                            <RecipeTitleInput register={register} isBorder={false} />
                            <ImageInput
                                defult_image_src={`${process.env.PUBLIC_URL}/sample-recipe-img.png`}
                                setImage={setImage}
                            />
                            <RecipeTimeInput register={register} setValue={setValue} />
                            <SubmitButton handler={handleSubmit(handleCreateRecipe)} />
                        </div>
                    </div>
                </form>

                <AlertMessage // エラーが発生した場合はアラートを表示
                    open={alertMessageOpen}
                    setOpen={setAlertMessageOpen}
                    severity="error"
                    message="保存できませんでした"
                />
            </div>
        </>
    );
};

export default CreateRecipe;
