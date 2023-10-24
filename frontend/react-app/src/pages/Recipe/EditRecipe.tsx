import React, { useContext, useState, useCallback, useEffect } from 'react';
// import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import AlertMessage from 'components/AlertMessage';
import { RecipeNameInput, RecipeTimeInput, RecipeActiveInput } from 'features/Recipe/components';

import { AuthContext } from 'App';
import { UpdateRecipeFormData, Recipe } from 'interfaces';
import { updateRecipe, getRecipeForEdit } from 'lib/api/recipes';
import { zenkaku2Hankaku } from 'features/Recipe/function';

const EditRecipe = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { id } = useParams<{ id: string | undefined }>();

    const [loading, setLoading] = useState<boolean>(true);

    const [recipe, setRecipe] = useState<Recipe>();
    const [title, setTitle] = useState<string>('');
    const [pressTime, setPressTime] = useState<number | string>(0);
    const [preparationTime, setPreparationTime] = useState<number | string>(0);
    const [image, setImage] = useState<File>();
    const [caption, setCaption] = useState<string>('');
    const [servings, setServings] = useState<number | string>('');
    const [isActive, setIsActive] = useState<boolean>(false);
    const [preview, setPreview] = useState<string>('');
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    const updateFormData = (): UpdateRecipeFormData => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('pressTime', pressTime.toString());
        formData.append('preparationTime', preparationTime.toString());
        formData.append('servings', servings.toString());
        formData.append('isActive', isActive.toString());
        if (image) formData.append('image', image);
        console.log(formData);
        return formData;
    };

    const handleNumFromChange = (event: any, setValue: React.Dispatch<React.SetStateAction<number | string>>) => {
        const inputValue = zenkaku2Hankaku(event.target.value);
        const parsedValue = isNaN(parseFloat(inputValue)) ? '' : parseFloat(inputValue);
        setValue(parsedValue);
    };

    // アップロードした画像の情報を取得
    const uploadImage = useCallback((e: any) => {
        const file = e.target.files[0];
        console.log(file);
        if (file) {
            setImage(file);
        }
    }, []);

    // 画像プレビュー
    const previewImage = useCallback((e: any) => {
        const file = e.target.files[0];
        if (file) {
            setPreview(window.URL.createObjectURL(file));
        }
    }, []);

    const handleGetRecipe = async () => {
        try {
            const res = await getRecipeForEdit(id);
            console.log(res);

            if (res.status === 200 && res.data.recipe) {
                setTitle(res.data.recipe.title);
                setPressTime(res.data.recipe.pressTime);
                setPreparationTime(res.data.recipe.preparationTime);
                setCaption(res.data.recipe.caption || '');
                setServings(res.data.recipe.servings || undefined);
                setIsActive(res.data.recipe.isActive);
                setRecipe(res.data.recipe);
            } else {
                console.log('No recipe');
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    const handleUpdateRecipe = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const data = updateFormData();

        try {
            console.log(data);
            const res = await updateRecipe(id, data);
            console.log(res);

            if (res.status === 200) {
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
                <div className="w-full md:w-3/4 bg-white border border-gray-200 rounded-xl shadow-sm">
                    <form>
                        <div className="p-4 sm:p-7 flex justify-center ">
                            <div className="grid gap-y-4 w-full">
                                <RecipeNameInput title={title} setTitle={setTitle} />
                                <div>
                                    <label
                                        htmlFor="file-button"
                                        className="cursor-pointer block mx-auto w-72 h-48 border border-gray-300 relative"
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
                                                alt="preview img"
                                                className="object-cover w-full h-full"
                                            />
                                        )}
                                        <input
                                            accept="image/*"
                                            id="file-button"
                                            type="file"
                                            className="hidden"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                previewImage(e);
                                                uploadImage(e);
                                            }}
                                        />
                                    </label>
                                </div>

                                <RecipeTimeInput
                                    preparationTime={preparationTime}
                                    pressTime={pressTime}
                                    setPreparationTime={setPreparationTime}
                                    setPressTime={setPressTime}
                                />
                                <div>
                                    <label
                                        htmlFor="caption"
                                        className="block p-1 m-2 w-28 text-center bg-orange-200 rounded-md"
                                    >
                                        説明文
                                    </label>
                                    <textarea
                                        value={caption}
                                        onChange={(event) => setCaption(event.target.value)}
                                        id="caption"
                                        rows={4}
                                        className="block p-2.5 w-4/5 mx-auto  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                                        placeholder="レシピの説明文をここに記入してください"
                                    ></textarea>
                                </div>

                                <div className="flex">
                                    <div className="flex justify-between w-5/12">
                                        <label
                                            htmlFor="servings"
                                            className="p-1 m-2 w-20 text-center bg-orange-200 rounded-md"
                                        >
                                            材料
                                        </label>
                                        <div className="inline m-1">
                                            <input
                                                type="string"
                                                value={servings}
                                                onChange={(event) => handleNumFromChange(event, setServings)}
                                                id="servings"
                                                name="servings"
                                                className="p-2 ml-2 w-12 border border-gray-200 bg-gray-50 rounded-md text-sm"
                                                required
                                                placeholder="2"
                                            />
                                            <span className="ml-2">人分</span>
                                        </div>
                                    </div>
                                    <div className="grid w-7/12"></div>
                                </div>
                                <RecipeActiveInput isActive={isActive} setIsActive={setIsActive} />
                                <button
                                    type="submit"
                                    onClick={handleUpdateRecipe}
                                    className="block mx-auto py-3 px-10 gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-300"
                                >
                                    保存する
                                </button>
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
            ) : (
                <></>
            )}
        </>
    );
};

export default EditRecipe;
