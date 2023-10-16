import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, TextField, CardContent, Button, Box, Typography } from '@mui/material';
import { CustomCard, CustomCardHeader } from 'features/Auth/styles';

import AlertMessage from 'components/AlertMessage';
import { AuthContext } from 'App';
import { Recipe } from 'interfaces';
import { createRecipe } from 'lib/api/recipes';

const CreateRecipe = () => {
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);

    const [formValue, setFormValue] = useState<Recipe>({
        id: null,
        title: '',
        pressTime: 0,
        preparationTime: 0,
    });
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const data: Recipe = {
            id: formValue.id,
            userId: currentUser?.id,
            title: formValue.title,
            pressTime: formValue.pressTime,
            preparationTime: formValue.preparationTime,
        };

        try {
            const res = await createRecipe(data);
            console.log(res);

            if (res.status === 200) {
                setFormValue({
                    id: null,
                    title: '',
                    pressTime: 0,
                    preparationTime: 0,
                });
                navigate('/');
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
                            value={formValue.title}
                            margin="dense"
                            onChange={(event) =>
                                setFormValue({
                                    ...formValue,
                                    title: event.target.value,
                                })
                            }
                        />

                        <TextField
                            style={{ marginRight: '20px' }}
                            variant="outlined"
                            required
                            fullWidth
                            label="準備時間"
                            size="small"
                            value={formValue.preparationTime}
                            margin="dense"
                            type="number"
                            onChange={(event) =>
                                setFormValue({
                                    ...formValue,
                                    preparationTime: parseInt(event.target.value, 10),
                                })
                            }
                        />

                        <TextField
                            style={{ marginRight: '20px' }}
                            variant="outlined"
                            required
                            fullWidth
                            label="加圧時間"
                            size="small"
                            value={formValue.pressTime}
                            margin="dense"
                            type="number"
                            onChange={(event) =>
                                setFormValue({
                                    ...formValue,
                                    pressTime: parseInt(event.target.value, 10),
                                })
                            }
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
                            disabled={!formValue.title ? true : false}
                            onClick={handleSubmit}
                        >
                            登録する
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
