import { Ingredient } from 'interfaces';
import client from './client';
import Cookies from 'js-cookie';

export const getIngredients = (id: string | undefined) => {
    return client.get(`recipes/${id}/ingredients`);
};

export const updateIngredients = (id: string | undefined, data: Ingredient[]) => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };

    return client.put(`recipes/${id}/ingredients`, data, { headers: headers });
};