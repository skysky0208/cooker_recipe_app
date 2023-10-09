import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import { CustomCard, CustomCardHeader } from 'features/Auth/styles';

import { AuthContext } from 'App';
import AlertMessage from 'components/AlertMessage';
import { signIn } from 'lib/api/auth';
import { SignInParams } from 'interfaces/index';

// サインイン用ページ
const SignIn = () => {
    const navigate = useNavigate();

    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const params: SignInParams = {
            email: email,
            password: password,
        };

        try {
            const res = await signIn(params);
            console.log(res);

            if (res.status === 200) {
                // ログインに成功した場合はCookieに各値を格納
                Cookies.set('_access_token', res.headers['access-token']);
                Cookies.set('_client', res.headers['client']);
                Cookies.set('_uid', res.headers['uid']);

                setIsSignedIn(true);
                setCurrentUser(res.data.data);

                navigate('/');

                console.log('Signed in successfully!');
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
                    <CustomCardHeader
                        avatar={
                            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="logo" style={{ margin: '0 auto' }} />
                        }
                    />
                    <CardContent>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            size="small"
                            label="メールアドレス"
                            value={email}
                            margin="dense"
                            onChange={(event) => setEmail(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="パスワード"
                            size="small"
                            type="password"
                            value={password}
                            margin="dense"
                            autoComplete="current-password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            style={{ marginTop: '20px' }}
                            fullWidth
                            disabled={!email || !password ? true : false} // 空欄があった場合はボタンを押せないように
                            onClick={handleSubmit}
                        >
                            ログイン
                        </Button>

                        <Box textAlign="center" style={{ marginTop: '40px' }}>
                            <Typography variant="body1">初めてご利用の方はこちら</Typography>
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                style={{ marginTop: '10px' }}
                                fullWidth
                                onClick={() => {
                                    navigate('/signup');
                                }}
                            >
                                ユーザ登録
                            </Button>
                        </Box>
                    </CardContent>
                </CustomCard>
            </form>

            <AlertMessage // エラーが発生した場合はアラートを表示
                open={alertMessageOpen}
                setOpen={setAlertMessageOpen}
                severity="error"
                message="Invalid emai or password"
            />
        </>
    );
};

export default SignIn;
