import { Recipe } from 'interfaces';
import client from './client';
import Cookies from 'js-cookie';

export const createRecipe = (data: Recipe) => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };

    return client.post('recipes', data, { headers: headers });
};
