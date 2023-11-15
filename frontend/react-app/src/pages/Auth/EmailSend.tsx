import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContent, Typography } from '@mui/material';

import { CustomCard, CustomCardHeader } from 'components/auth/styles';

const EmailSend = () => {
    const navigate = useNavigate();

    return (
        <>
            <p>メール送信完了しました</p>
        </>
    );
};

export default EmailSend;
