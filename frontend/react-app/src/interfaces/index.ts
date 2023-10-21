export interface SignUpParams {
    firstName: string;
    lastName: string;
    nickname: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    confirmSuccessUrl: string;
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
    id: number | null;
    userId: number;
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

export interface UpdateRecipeData {
    title?: string;
    caption?: string;
    pressTime?: number;
    preparationTime?: number;
    image?: string;
    servings?: number;
    isActive?: boolean;
}

export interface UpdateRecipeFormData extends FormData {
    append(name: keyof UpdateRecipeData, value: String | Blob, fileName?: string): any;
}
