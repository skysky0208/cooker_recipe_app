import { styled } from '@mui/system';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

export const CustomCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(2),
    maxWidth: 500,
    marginTop: theme.spacing(6),
}));

export const CustomCardHeader = styled(CardHeader)(({ theme }) => ({
    display: 'block',
}));
