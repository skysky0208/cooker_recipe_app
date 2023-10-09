import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';

import { AuthContext } from 'App';
import AlertMessage from 'components/AlertMessage';
import { signUp } from 'lib/api/auth';
import { SignUpParams } from 'interfaces/index';

const CustomCard = styled(Card)(({ theme }) => ({
    marginTop: theme.spacing(6),
    padding: theme.spacing(2),
    maxWidth: 500,
}));

// サインアップ用ページ
const SignUp = () => {
    const navigate = useNavigate();
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);
    const confirmSuccessUrl = 'http://localhost:3000';

    const generateParams = () => {
        const data: SignUpParams = {
            firstName: firstName,
            lastName: lastName,
            nickname: nickname,
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
            confirmSuccessUrl: confirmSuccessUrl,
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
                    <CardHeader style={{ textAlign: 'center' }} title="Sign Up" />
                    <CardContent>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="姓"
                            value={lastName}
                            margin="dense"
                            onChange={(event) => setLastName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="名"
                            value={firstName}
                            margin="dense"
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="アカウント名"
                            value={nickname}
                            margin="dense"
                            onChange={(event) => setNickname(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
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
                            type="password"
                            value={password}
                            margin="dense"
                            autoComplete="current-password"
                            onChange={(event) => setPassword(event.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            label="パスワード（確認用）"
                            type="password"
                            value={passwordConfirmation}
                            margin="dense"
                            autoComplete="current-password"
                            onChange={(event) => setPasswordConfirmation(event.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="outlined"
                            color="primary"
                            disabled={
                                !firstName! || !lastName || !nickname || !email || !password || !passwordConfirmation
                                    ? true
                                    : false
                            }
                            onClick={handleSubmit}
                        >
                            送信
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
