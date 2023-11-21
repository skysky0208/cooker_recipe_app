export interface SignUpParams {
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
}

export interface SignInParams {
    email: string;
    password: string;
}

export interface User {
    id: number;
    uid: string;
    provider: string;
    email: string;
    lastName: string;
    firstName: string;
    nickname: string;
    image?: string;
    allowPasswordChange: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface Recipe {
    id: number | undefined;
    userId?: number;
    title: string;
    caption: string;
    pressTime: number;
    preparationTime: number;
    image: {
        url: string;
    };
    servings: number;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CreateRecipeData {
    title: string;
    pressTime: number;
    preparationTime: number;
    image: string;
}

export interface CreateRecipeFormData extends FormData {
    append(name: keyof CreateRecipeData, value: String | Blob, fileName?: string): any;
}

export interface RecipeData {
    title: string;
    caption: string;
    pressTime: number;
    preparationTime: number;
    image?: string;
    servings: number;
    isActive?: boolean;
    ingredients?: Ingredient[];
    steps?: Step[];
}

export interface RecipeFormData extends FormData {
    append(name: keyof RecipeData, value: String | Blob, fileName?: string): any;
}

export interface Ingredient {
    name: string;
    amount?: string;
}

export interface Step {
    order: number;
    description: string;
}

export interface RecipeDataForShow {
    title: string;
    caption: string;
    pressTime: number;
    preparationTime: number;
    image: {
        url: string;
    };
    servings: number;
    ingredients: Ingredient[];
    steps: Step[];
    user?: User;
}

export interface RecipeDataForIndex {
    id: number;
    title: string;
    pressTime: number;
    preparationTime: number;
    image: {
        url: string;
    };
    ingredients: Ingredient[];
}

export interface Pagination {
    current: number;
    limit_value: number;
    pages: number;
}

export interface Option {
    value: string;
    label: string;
}
