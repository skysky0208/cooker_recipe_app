import React, { useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
    Typography,
    Button,
    Box,
    TextField,
    FormControl,
    RadioGroup,
    Radio,
    FormLabel,
    FormControlLabel,
} from '@mui/material';
import { CustomCard, CustomCardHeader } from 'features/Auth/styles';

import AlertMessage from 'components/AlertMessage';
import { AuthContext } from 'App';
import { UpdateRecipeFormData } from 'interfaces';
import { updateRecipe, getRecipeForEdit } from 'lib/api/recipes';

const EditRecipe = () => {
    const navigate = useNavigate();
    const { currentUser } = useContext(AuthContext);
    const { id } = useParams<{ id: string | undefined }>();

    const [loading, setLoading] = useState<boolean>(true);

    const [title, setTitle] = useState<string>('');
    const [pressTime, setPressTime] = useState<number>(0);
    const [preparationTime, setPreparationTime] = useState<number>(0);
    const [image, setImage] = useState({ url: '' });
    const [caption, setCaption] = useState<string>('');
    const [servings, setServings] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [preview, setPreview] = useState<string>('');
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    const createFormData = (): UpdateRecipeFormData => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('caption', caption);
        formData.append('pressTime', pressTime.toString());
        formData.append('preparationTime', preparationTime.toString());
        formData.append('servings', servings.toString());
        formData.append('isActive', isActive.toString());
        formData.append('image', image.toString());
        return formData;
    };

    // 画像プレビューを表示
    const previewImage = useCallback((e: any) => {
        const file = e.target.files[0];
        if (file) {
            const blob = new Blob([file], { type: file.type });
            setPreview(window.URL.createObjectURL(blob));
            setImage(file);
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
                setImage(res.data.recipe.image);
                setCaption(res.data.recipe.caption || '');
                setServings(res.data.recipe.servings || undefined);
                setIsActive(res.data.recipe.isActivate);
            } else {
                console.log('No current user');
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    const handleUpdateRecipe = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const data = createFormData();

        try {
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
                <Box>
                    <TextField
                        style={{ marginRight: '20px' }}
                        variant="outlined"
                        required
                        fullWidth
                        size="small"
                        value={title || ''}
                        margin="dense"
                        onChange={(event) => setTitle(event.target.value)}
                    />

                    <label htmlFor="file-button">
                        {preview ? (
                            <img
                                src={preview}
                                alt="preview img"
                                style={{ margin: '0 auto', width: '450px', height: '300px' }}
                            />
                        ) : (
                            <img
                                src={image.url}
                                alt="preview img"
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
                    />

                    <TextField
                        style={{ marginRight: '20px' }}
                        variant="outlined"
                        required
                        fullWidth
                        size="small"
                        value={caption || ''}
                        margin="dense"
                        onChange={(event) => setCaption(event.target.value)}
                    />

                    <TextField
                        style={{ marginRight: '20px' }}
                        variant="outlined"
                        required
                        fullWidth
                        label="人分"
                        size="small"
                        value={servings}
                        margin="dense"
                        type="number"
                        onChange={(event) => setServings(parseInt(event.target.value, 10))}
                    />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">公開設定</FormLabel>
                        <RadioGroup
                            aria-label="gender"
                            name="gender1"
                            value={isActive}
                            onChange={(event) => setIsActive(event.target.value === 'true')}
                        >
                            <FormControlLabel value="true" control={<Radio />} label="公開" />
                            <FormControlLabel value="false" control={<Radio />} label="非公開" />
                        </RadioGroup>
                    </FormControl>

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        disabled={!title || !pressTime || !preparationTime ? true : false}
                        onClick={handleUpdateRecipe}
                    >
                        材料や手順を記入する
                    </Button>
                </Box>
            ) : (
                <></>
            )}
        </>
    );
};

export default EditRecipe;
