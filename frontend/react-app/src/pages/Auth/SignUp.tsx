import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Grid, TextField, CardContent, Button, Box, Typography } from '@mui/material';
import { CustomCard, CustomCardHeader } from 'components/auth/styles';

import { AuthContext } from 'App';
import Cookies from 'js-cookie';
import AlertMessage from 'components/common/AlertMessage';
import { signUp } from 'lib/api/auth';
import { SignUpParams } from 'interfaces/index';

// サインアップ用ページ
const SignUp = () => {
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    const generateParams = () => {
        const data: SignUpParams = {
            firstName: firstName,
            lastName: lastName,
            nickname: nickname,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
        };
        return data;
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const params = generateParams();

        try {
            const res = await signUp(params);
            console.log(res);

            if (res.status === 200) {
                console.log('confirm email');
                Cookies.set('_access_token', res.headers['access-token']);
                Cookies.set('_client', res.headers['client']);
                Cookies.set('_uid', res.headers['uid']);

                setIsSignedIn(true);
                setCurrentUser(res.data.data);

                navigate('/mypage', { replace: true });
                // navigate('/auth/send', { replace: true });
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
                    <CustomCardHeader title="新規会員登録" style={{ textAlign: 'center' }} />
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    style={{ marginRight: '20px' }}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="姓"
                                    size="small"
                                    value={lastName}
                                    margin="dense"
                                    onChange={(event) => setLastName(event.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    label="名"
                                    size="small"
                                    value={firstName}
                                    margin="dense"
                                    onChange={(event) => setFirstName(event.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            size="small"
                            label="アカウント名"
                            value={nickname}
                            margin="dense"
                            onChange={(event) => setNickname(event.target.value)}
                        />
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
                            size="small"
                            label="パスワード"
                            type="password"
                            placeholder="6文字以上"
                            value={password}
                            margin="dense"
                            autoComplete="current-password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            size="small"
                            placeholder="6文字以上"
                            label="パスワード（確認用）"
                            type="password"
                            value={passwordConfirmation}
                            margin="dense"
                            autoComplete="current-password"
                            onChange={(event) => setPasswordConfirmation(event.target.value)}
                        />

                        <Box textAlign="center" style={{ margin: '20px 0' }}>
                            <Typography variant="body2">
                                入力内容送信後に登録認証メールが届きます。
                                <br />
                                メール記載のURLにアクセスしていただくことで
                                <br />
                                会員登録完了となります。
                                <br />
                                <br />
                                ※メールが届かない場合、
                                <br />
                                迷惑メール設定・ドメイン指定受信設定をご確認ください。
                            </Typography>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            disabled={
                                !firstName! || !lastName || !nickname || !email || !password || !passwordConfirmation
                                    ? true
                                    : false
                            }
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
                message="メールアドレスかパスワードが間違っています"
            />
        </>
    );
};

export default SignUp;
