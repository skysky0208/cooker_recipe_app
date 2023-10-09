import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { signOut } from 'lib/api/auth';

import { AuthContext } from 'App';

const Header = () => {
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

    const AuthButtons = () => {
        if (!loading) {
            if (isSignedIn) {
                return (
                    <Button onClick={handleSignOut} style={{ color: 'inherit', textTransform: 'none' }}>
                        Sign out
                    </Button>
                );
            } else {
                return (
                    <>
                        <Button component={Link} style={{ color: 'inherit', textTransform: 'none' }} to="/signin">
                            Sign in
                        </Button>
                        <Button component={Link} style={{ color: 'inherit', textTransform: 'none' }} to="/signup">
                            Sign Up
                        </Button>
                    </>
                );
            }
        } else {
            return <></>;
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/">Sample</Link>
                    </Typography>
                    <AuthButtons />
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
