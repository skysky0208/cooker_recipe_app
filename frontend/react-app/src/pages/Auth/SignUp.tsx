import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { AuthContext } from 'App';
import Cookies from 'js-cookie';
import AlertMessage from 'components/common/AlertMessage';
import { signUp } from 'lib/api/auth';
import { SignUpParams } from 'interfaces/index';

// サインアップ用ページ
const SignUp = () => {
    const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const { register, handleSubmit, getValues, trigger } = useForm<SignUpParams>();

    const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

    const createFormData = (data: any) => {
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
        });

        return formData;
    };

    const handleCreateUser = async (data: SignUpParams) => {
        try {
            const formdata = createFormData(data);
            const res = await signUp(formdata);

            if (res.status === 200) {
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
            <div className="w-full md:mx-10 md:my-5 lg:w-1/2 bg-white border border-gray-200 md:rounded-xl shadow-sm">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-xl md:text-2xl text-center font-bold text-neutral-600">
                            新規会員登録
                        </h1>
                    </div>

                    <div className="mt-5">
                        <form className="mx-auto grid max-w-screen-md gap-4 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="firstName"
                                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                                >
                                    姓*
                                </label>
                                <input
                                    {...register('firstName')}
                                    name="firstName"
                                    type="text"
                                    id="firstName"
                                    required
                                    placeholder="鈴木"
                                    className="w-full rounded border px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="lastName"
                                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                                >
                                    名*
                                </label>
                                <input
                                    {...register('lastName')}
                                    name="lastName"
                                    type="text"
                                    id="lastName"
                                    required
                                    placeholder="太郎"
                                    className="w-full rounded border px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="nickname"
                                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                                >
                                    アカウント名
                                </label>
                                <input
                                    {...register('nickname')}
                                    name="nickname"
                                    type="text"
                                    id="nickname"
                                    required
                                    placeholder="nikniknik"
                                    className="w-full rounded border px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                    メールアドレス*
                                </label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="sample@sample.com"
                                    className="w-full rounded border px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="password"
                                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                                >
                                    パスワード*
                                </label>
                                <input
                                    {...register('password')}
                                    type="password"
                                    name="password"
                                    id="password"
                                    required
                                    placeholder="6文字以上"
                                    className="w-full rounded border px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="passwordConfirmation"
                                    className="mb-2 inline-block text-sm text-gray-800 sm:text-base"
                                >
                                    パスワード(確認用)*
                                </label>

                                <input
                                    {...register('passwordConfirmation')}
                                    type="password"
                                    name="passwordConfirmation"
                                    id="passwordConfirmation"
                                    required
                                    placeholder="6文字以上"
                                    className="w-full rounded border px-3 py-2 text-gray-800 outline-none ring-orange-300 transition duration-100 focus:ring"
                                />
                            </div>

                            <button
                                type="submit"
                                onClick={handleSubmit(handleCreateUser)}
                                className="mt-5 mx-10 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-orange-400 text-white hover:bg-orange-300 transition-all text-sm"
                            >
                                登録する
                            </button>

                            <button
                                type="submit"
                                onClick={() => {
                                    navigate('/');
                                }}
                                className=" md:mt-4 mx-10 py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-gray-400 font-semibold text-gray-700 hover:bg-gray-100 transition-all text-sm"
                            >
                                キャンセル
                            </button>
                            <p></p>
                            <p className="text-right w-full text-sm text-gray-500">*Required</p>
                        </form>
                    </div>
                </div>
            </div>

            <AlertMessage // エラーが発生した場合はアラートを表示
                open={alertMessageOpen}
                setOpen={setAlertMessageOpen}
                severity="error"
                message="ユーザ作成ができません"
            />
        </>
    );
};

export default SignUp;
