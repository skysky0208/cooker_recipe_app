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
