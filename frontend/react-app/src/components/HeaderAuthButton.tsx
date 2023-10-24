import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { signOut } from 'lib/api/auth';

import { AuthContext } from 'App';

const HeaderAuthButton = () => {
    const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
        try {
            const res = await signOut();

            if (res.data.success === true) {
                // サインアウト時には各Cookieを削除
                Cookies.remove('_access_token');
                Cookies.remove('_client');
                Cookies.remove('_uid');

                setIsSignedIn(false);
                navigate('/signin');

                console.log('Succeeded in sign out');
            } else {
                console.log('Failed in sign out');
            }
        } catch (err) {
            console.log(err);
        }
    };

    if (!loading) {
        if (isSignedIn) {
            return (
                <button onClick={handleSignOut} className="bg-white duration-100 transition-colors px-2 md:px-3 py-2.5">
                    <svg
                        className="w-5 h-5 text-neutral-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                        />
                    </svg>
                </button>
            );
        } else {
            return (
                <button
                    onClick={() => navigate('/signin')}
                    className="bg-white duration-100 transition-colors px-2 md:px-3 py-2.5"
                >
                    <svg
                        className="w-7 h-5 text-neutral-900"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 16 16"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                        />
                    </svg>
                </button>
            );
        }
    } else {
        return <></>;
    }
};

export default HeaderAuthButton;
