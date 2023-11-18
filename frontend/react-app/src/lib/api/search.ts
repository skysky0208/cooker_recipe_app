import { CreateRecipeFormData, RecipeFormData } from 'interfaces';
import client from './client';

export const searchRecipes = (page: string | null, keyword: string) => {
    return client.get('search', {
        params: {
            page: page,
            keyword: keyword,
        },
    });
};
