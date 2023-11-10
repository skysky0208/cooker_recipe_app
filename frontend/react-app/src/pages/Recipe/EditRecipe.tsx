import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { AlertMessage, PopUpComponent } from 'components/common';
import {
    RecipeTitleInput,
    RecipeTimeInput,
    RecipeActiveInput,
    RecipeCaptionInput,
    IngredientsInput,
    StepsInput,
    SubmitButton,
    ImageInput,
    StepsPreview,
    IngredientsPreview,
} from 'components/recipe';

import { RecipeData, Recipe, Ingredient, RecipeFormData, Step } from 'interfaces';
import { updateRecipe, getRecipeForEdit } from 'lib/api/recipes';

const EditRecipe = () => {
    const { register, handleSubmit, setValue, watch } = useForm<RecipeData>();

    const navigate = useNavigate();
    const { id } = useParams<{ id: string | undefined }>();

    const [recipe, setRecipe] = useState<Recipe>();
    const [image, setImage] = useState<string>('');
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [steps, setSteps] = useState<Step[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
    const [ingredientPopupFlag, setIngredientPopupFlag] = useState<boolean>(false);
    const [stepPopupFlag, setStepPopupFlag] = useState<boolean>(false);

    const updateFormData = (data: any): RecipeFormData => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });
        if (image) formData.append('image', image);
        return formData;
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

    const handleUpdateRecipe = async (data: RecipeData) => {
        try {
            const formdata = updateFormData(data);
            console.log(formdata);
            const res = await updateRecipe(id, formdata);
            console.log(res);

            if (res.data.status === 200) {
                navigate('/');
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
                <div className="w-full md:mx-3 lg:w-2/3 lg:my-5 bg-white border border-gray-200 lg:rounded-xl shadow-sm">
                    <form>
                        <div className="p-4 sm:p-7 flex justify-center ">
                            <div className="grid gap-y-4 w-full">
                                <RecipeTitleInput register={register} isBorder={true} />
                                <ImageInput defult_image_src={recipe?.image.url} setImage={setImage} />

                                <RecipeTimeInput register={register} setValue={setValue} />
                                <RecipeCaptionInput register={register} />

                                <div className="grid gap-4 md:flex">
                                    <div className="md:w-5/12">
                                        <IngredientsPreview
                                            ingredients={ingredients}
                                            handleSetPopup={() => setIngredientPopupFlag(true)}
                                        />
                                    </div>
                                    <div className="md:w-7/12">
                                        <StepsPreview steps={steps} handleSetPopup={() => setStepPopupFlag(true)} />
                                    </div>
                                </div>
                                <RecipeActiveInput setValue={setValue} defaultValue={watch('isActive')} />
                                <SubmitButton handler={handleSubmit(handleUpdateRecipe)} />
                            </div>
                        </div>
                    </form>

                    <PopUpComponent
                        viewFlag={ingredientPopupFlag}
                        setViewFlag={setIngredientPopupFlag}
                        children={
                            <IngredientsInput
                                viewFlag={ingredientPopupFlag}
                                setViewFlag={setIngredientPopupFlag}
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
