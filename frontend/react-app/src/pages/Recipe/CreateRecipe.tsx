import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, TextField, CardContent, Button, Box, Typography } from '@mui/material';
import { CustomCard, CustomCardHeader } from 'features/Auth/styles';

import AlertMessage from 'components/AlertMessage';
import { AuthContext } from 'App';
import { CreateRecipeFormData } from 'interfaces';
import { createRecipe } from 'lib/api/recipes';

const CreateRecipe = () => {
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    const [title, setTitle] = useState<string>('');
    const [pressTime, setPressTime] = useState<number>(0);
    const [preparationTime, setPreparationTime] = useState<number>(0);
    const [image, setImage] = useState<string>('');
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
    const [preview, setPreview] = useState<string>('');

    // 画像プレビューを表示
    const previewImage = useCallback((e: any) => {
        const file = e.target.files[0];
        if (file) {
            const blob = new Blob([file], { type: file.type });
            setPreview(window.URL.createObjectURL(blob));
            setImage(file);
        }
    }, []);

    // フォームデータを作成
    const createFormData = (): CreateRecipeFormData => {
        const formData = new FormData();

        formData.append('title', title);
        formData.append('pressTime', pressTime.toString());
        formData.append('preparationTime', preparationTime.toString());
        formData.append('image', image);

        return formData;
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const data = createFormData();

        try {
            const res = await createRecipe(data);
            console.log(res);

            if (res.status === 200) {
                setTitle('');
                setPressTime(0);
                setPreparationTime(0);
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
            <form noValidate autoComplete="off">
                <CustomCard>
                    <CustomCardHeader title="レシピを書く" style={{ textAlign: 'center' }} />
                    <CardContent>
                        <TextField
                            style={{ marginRight: '20px' }}
                            variant="outlined"
                            required
                            fullWidth
                            label="レシピのタイトル"
                            size="small"
                            value={title}
                            margin="dense"
                            onChange={(event) => setTitle(event.target.value)}
                        />

                        <div>
                            <label htmlFor="file-button">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="preview img"
                                        style={{ margin: '0 auto', width: '450px', height: '300px' }}
                                    />
                                ) : (
                                    <img
                                        src={`${process.env.PUBLIC_URL}/sample-recipe-img.png`}
                                        alt="sample"
                                        style={{ margin: '0 auto', width: '450px', height: '300px' }}
                                    />
                                )}
                            </label>
                            <input
                                accept="image/*"
                                id="file-button"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    previewImage(e);
                                }}
                            />
                        </div>

                        <TextField
                            style={{ marginRight: '20px' }}
                            variant="outlined"
                            required
                            fullWidth
                            label="準備時間"
                            size="small"
                            value={preparationTime}
                            margin="dense"
                            type="number"
                            onChange={(event) => setPreparationTime(parseInt(event.target.value, 10))}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                        />

                        <TextField
                            style={{ marginRight: '20px' }}
                            variant="outlined"
                            required
                            fullWidth
                            label="加圧時間"
                            size="small"
                            value={pressTime}
                            margin="dense"
                            type="number"
                            onChange={(event) => setPressTime(parseInt(event.target.value, 10))}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                            }}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={!title || !pressTime || !preparationTime ? true : false}
                            onClick={handleSubmit}
                        >
                            材料や手順を記入する
                        </Button>
                        <Button
                            type="submit"
                            variant="outlined"
                            size="large"
                            style={{ marginTop: '10px' }}
                            fullWidth
                            onClick={() => {
                                navigate('/');
                            }}
                        >
                            キャンセル
                        </Button>
                    </CardContent>
                </CustomCard>
            </form>
            <AlertMessage // エラーが発生した場合はアラートを表示
                open={alertMessageOpen}
                setOpen={setAlertMessageOpen}
                severity="error"
                message="必須項目を埋めてください"
            />
        </>
    );
};

export default CreateRecipe;
