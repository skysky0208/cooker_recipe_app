import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import CommonLayout from 'components/layouts/CommonLayout';
import Home from 'pages/Home/Home';
import SignIn from 'pages/Auth/SignIn';
import SignUp from 'pages/Auth/SignUp';
import EmailSend from 'pages/Auth/EmailSend';
import AuthSuccess from 'pages/Auth/AuthSuccess';
import CreateRecipe from 'pages/Recipe/CreateRecipe';
import EditRecipe from 'pages/Recipe/EditRecipe';
import ShowRecipe from 'pages/Recipe/ShowRecipe';
import IndexRecipe from 'pages/Recipe/IndexRecipe';
import { getCurrentUser } from 'lib/api/auth';
import { User } from 'interfaces/index';
import Mypage from 'pages/User/Mypage';
import NotFound from 'pages/NotFound';

// グローバルで扱う変数・関数
export const AuthContext = createContext(
    {} as {
        loading: boolean;
        setLoading: React.Dispatch<React.SetStateAction<boolean>>;
        isSignedIn: boolean;
        setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
        currentUser: User | undefined;
        setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>;
    }
);

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User | undefined>();

    const handleGetCurrentUser = async () => {
        try {
            const res = await getCurrentUser();

            if (res?.data.isLogin === true) {
                setIsSignedIn(true);
                setCurrentUser(res?.data.data);
            } else {
                console.log('No current user');
            }
        } catch (err) {
            console.log(err);
        }

        setLoading(false);
    };

    useEffect(() => {
        handleGetCurrentUser();
    }, [setCurrentUser]);

    const Private = ({ children }: { children: React.ReactElement }) => {
        if (!loading) {
            if (isSignedIn) {
                return children;
            } else {
                return <Navigate to="/signin" />;
            }
        } else {
            return <></>;
        }
    };

    return (
        <Router>
            <AuthContext.Provider
                value={{
                    loading,
                    setLoading,
                    isSignedIn,
                    setIsSignedIn,
                    currentUser,
                    setCurrentUser,
                }}
            >
                <CommonLayout>
                    <Routes>
                        <Route path="signup" element={<SignUp />} />
                        <Route path="signin" element={<SignIn />} />
                        <Route path="auth/send" element={<EmailSend />} />
                        <Route path="auth/success" element={<AuthSuccess />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/recipes" element={<IndexRecipe />} />
                        <Route path="/recipes/:id" element={<ShowRecipe />} />
                        <Route
                            path="/recipes/new"
                            element={
                                <Private>
                                    <CreateRecipe />
                                </Private>
                            }
                        />
                        <Route
                            path="/recipes/:id/edit"
                            element={
                                <Private>
                                    <EditRecipe />
                                </Private>
                            }
                        />

                        <Route
                            path="/mypage"
                            element={
                                <Private>
                                    <Mypage />
                                </Private>
                            }
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </CommonLayout>
            </AuthContext.Provider>
        </Router>
    );
};

export default App;
