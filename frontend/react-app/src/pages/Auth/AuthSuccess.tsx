import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContent, Typography } from '@mui/material';

import { CustomCard, CustomCardHeader } from 'features/Auth/styles';

const AuthSuccess = () => {
    const navigate = useNavigate();

    return (
        <>
            <p>認証完了しました</p>
        </>
    );
};

export default AuthSuccess;
