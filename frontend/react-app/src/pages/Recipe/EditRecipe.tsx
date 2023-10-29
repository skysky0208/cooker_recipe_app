import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import AlertMessage from 'components/AlertMessage';
import { PopUpComponent } from 'components/PopUpComponent';
import {
    RecipeTitleInput,
    RecipeTimeInput,
    RecipeActiveInput,
    RecipeCaptionInput,
    IngredientsInput,
    RecipeServingsInput,
    StepsInput,
} from 'features/Recipe/components';

import { UpdateRecipeData, Recipe, Ingredient, UpdateRecipeFormData, Step } from 'interfaces';
import { updateRecipe, getRecipeForEdit } from 'lib/api/recipes';

const EditRecipe = () => {
    const { register, handleSubmit, setValue, watch } = useForm<UpdateRecipeData>();

    const navigate = useNavigate();
    const { id } = useParams<{ id: string | undefined }>();

    const [recipe, setRecipe] = useState<Recipe>();
    const [image, setImage] = useState<string>('');
    const [preview, setPreview] = useState<string>('');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
    const [ingredientPopupFlag, setingredientPopupFlag] = useState<boolean>(false);
    const [stepPopupFlag, setStepPopupFlag] = useState<boolean>(false);

    const updateFormData = (data: any): UpdateRecipeFormData => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        if (image) formData.append('image', image);
        console.log(formData);
        return formData;
    };

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(window.URL.createObjectURL(file));
            setImage(file);
        } else {
            setImage('');
        }
    };

    const handleGetRecipe = async () => {
        try {
            const res = await getRecipeForEdit(id);
            console.log(res);

            if (res.data.status === 200 && res.data.recipe) {
                setValue('title', res.data.recipe.title);
                setValue('pressTime', res.data.recipe.pressTime);
                setValue('preparationTime', res.data.recipe.preparationTime);
                setValue('caption', res.data.recipe.caption || '');
                setValue('servings', res.data.recipe.servings || undefined);
                setValue('isActive', res.data.recipe.isActive);
                setValue('ingredients', res.data.ingredients);
                setIngredients(res.data.ingredients);
                setSteps(res.data.steps);
                setRecipe(res.data.recipe);
            } else if (res.data.status === 404) {
                console.log('No recipe');
                console.log(res);
                navigate('/not_found');
            } else {
                navigate('/');
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    const handleUpdateRecipe = async (data: UpdateRecipeData) => {
        try {
            const formdata = updateFormData(data);
            console.log(formdata);
            const res = await updateRecipe(id, formdata);
            console.log(res);

            if (res.data.status === 200) {
                navigate(`/recipes/new`);
            } else {
                setAlertMessageOpen(true);
            }
        } catch (err) {
            console.log(err);
            setAlertMessageOpen(true);
        }
    };

    useEffect(() => {
        handleGetRecipe();
    }, []);

    return (
        <>
            {!loading ? (
                <div className="w-full mx-3 lg:w-2/3 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <form>
                        <div className="p-4 sm:p-7 flex justify-center ">
                            <div className="grid gap-y-4 w-full">
                                <RecipeTitleInput register={register} />
                                <div>
                                    <label
                                        htmlFor="file-button"
                                        className="md:w-1/2 cursor-pointer block mx-auto border border-gray-300 relative"
                                    >
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="preview img"
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <img
                                                src={recipe?.image.url}
                                                alt="current img"
                                                className="object-cover w-full h-full"
                                            />
                                        )}
                                        <input
                                            accept="image/*"
                                            id="file-button"
                                            type="file"
                                            className="hidden"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                </div>

                                <RecipeTimeInput register={register} setValue={setValue} />
                                <RecipeCaptionInput register={register} />

                                <div className="grid gap-4 md:flex">
                                    <div className="md:w-5/12">
                                        <RecipeServingsInput register={register} setValue={setValue} />
                                        <div className="mx-10 py-2">
                                            <table className="w-full">
                                                <tbody>
                                                    {ingredients.map((ingredient, index) => {
                                                        return (
                                                            <tr className="px-3">
                                                                <td>{ingredient.name}</td>
                                                                <td className="text-right">{ingredient.amount}</td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setingredientPopupFlag(true)}
                                            className="block mx-auto my-1 py-1 px-5 border-2 border-orange-400 rounded-md"
                                        >
                                            材料を編集
                                        </button>
                                    </div>
                                    <div className="md:w-7/12">
                                        <p className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md">作り方</p>
                                        <div className="mx-8 py-2">
                                            {steps.map((step, index) => {
                                                return (
                                                    <div className="flex mb-2">
                                                        <div className=" w-7 h-7 bg-orange-950 text-yellow-100 rounded-md text-center ">
                                                            {step.order}
                                                        </div>
                                                        <p className="pl-3 w-full">{step.description}</p>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setStepPopupFlag(true)}
                                            className="block mx-auto my-1 py-1 px-5 border-2 border-orange-400 rounded-md"
                                        >
                                            作り方を編集
                                        </button>
                                    </div>
                                </div>
                                <RecipeActiveInput setValue={setValue} defaultValue={watch('isActive')} />
                                <button
                                    type="submit"
                                    onClick={handleSubmit(handleUpdateRecipe)}
                                    className="block mx-auto py-3 px-8 gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-300"
                                >
                                    保存する
                                </button>
                            </div>
                        </div>
                    </form>

                    <PopUpComponent
                        viewFlag={ingredientPopupFlag}
                        setViewFlag={setingredientPopupFlag}
                        children={
                            <IngredientsInput
                                viewFlag={ingredientPopupFlag}
                                setViewFlag={setingredientPopupFlag}
                                ingredients={ingredients}
                                setIngredients={setIngredients}
                            />
                        }
                    />
                    <PopUpComponent
                        viewFlag={stepPopupFlag}
                        setViewFlag={setStepPopupFlag}
                        children={
                            <StepsInput
                                viewFlag={stepPopupFlag}
                                setViewFlag={setStepPopupFlag}
                                steps={steps}
                                setSteps={setSteps}
                            />
                        }
                    />
                    <AlertMessage // エラーが発生した場合はアラートを表示
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

export default EditRecipe;
