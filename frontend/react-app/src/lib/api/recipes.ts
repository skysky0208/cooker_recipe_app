import { CreateRecipeFormData, UpdateRecipeFormData } from 'interfaces';
import client from './client';
import Cookies from 'js-cookie';

export const createRecipe = (data: CreateRecipeFormData) => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };

    return client.post('recipes', data, { headers: headers });
};

export const getRecipe = (id: string | undefined) => {
    return client.get(`recipes/${id}`);
};

export const getRecipeForEdit = (id: string | undefined) => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };

    return client.get(`recipes/${id}/edit`, { headers: headers });
};

export const updateRecipe = (id: string | undefined, data: UpdateRecipeFormData) => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };

    return client.put(`recipes/${id}`, data, { headers: headers });
};
