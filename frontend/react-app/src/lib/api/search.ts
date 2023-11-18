import client from './client';

export const searchRecipes = (page: string | null, keyword: string, option: string | undefined) => {
    return client.get('search', {
        params: {
            page: page,
            keyword: keyword,
            option: option,
        },
    });
};
