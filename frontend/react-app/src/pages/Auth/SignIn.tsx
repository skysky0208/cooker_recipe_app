import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { EmailForm, PasswordForm } from 'components/auth';
import AlertMessage from 'components/common/AlertMessage';

import { AuthContext } from 'App';
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

            if (res.status === 200) {
                // ログインに成功した場合はCookieに各値を格納
                Cookies.set('_access_token', res.headers['access-token']);
                Cookies.set('_client', res.headers['client']);
                Cookies.set('_uid', res.headers['uid']);

                setIsSignedIn(true);
                setCurrentUser(res.data.data);

                navigate('/mypage', { replace: true });
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
            <div className="w-full md:w-1/2 bg-white border border-gray-200 md:rounded-xl shadow-sm">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-xl md:text-2xl text-center font-bold text-neutral-600">ログイン</h1>
                    </div>

                    <div className="mt-5">
                        <form>
                            <div className="grid gap-y-4">
                                <EmailForm email={email} setEmail={setEmail} />
                                <PasswordForm password={password} setPassword={setPassword} />

                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className=" md:mt-4 mx-10 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-300 transition-all text-sm"
                                >
                                    ログイン
                                </button>

                                <div className="flex items-center justify-between md:mt-4">
                                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-2/6"></span>
                                    <p className="text-xs text-center text-gray-500 uppercase">
                                        初めてご利用の方はこちら
                                    </p>
                                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-2/6"></span>
                                </div>

                                <button
                                    onClick={() => {
                                        navigate('/signup');
                                    }}
                                    className=" md:mt-4 mx-10 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-gray-400 font-semibold text-gray-700 hover:bg-gray-100 transition-all text-sm"
                                >
                                    ユーザ登録
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

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
