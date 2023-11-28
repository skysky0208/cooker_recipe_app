import { CreateRecipeFormData, RecipeFormData } from 'interfaces';
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

export const getRecipes = (
    page: string | null,
    keyword: string | undefined,
    option: string | undefined,
    sortedBy: string | undefined
) => {
    return client.get('recipes', {
        params: {
            page: page,
            keyword: keyword,
            option: option,
            sortedBy: sortedBy,
        },
    });
};

export const getRecipeForEdit = (id: string | undefined) => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };

    return client.get(`recipes/${id}/edit`, { headers: headers });
};

export const updateRecipe = (id: string | undefined, data: RecipeFormData) => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };

    return client.put(`recipes/${id}`, data, { headers: headers });
};

export const deleteRecipe = (id: number | undefined) => {
    const headers = {
        'access-token': Cookies.get('_access_token'),
        client: Cookies.get('_client'),
        uid: Cookies.get('_uid'),
    };

    return client.delete(`recipes/${id}`, { headers: headers });
};

export const getRecommendedRecipe = () => {
    return client.get(`recipes/recommended`);
};

export const getRecentRecipes = () => {
    return client.get(`recipes/recent`);
};
