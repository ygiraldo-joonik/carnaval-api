export interface Auth {
    user: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: any;
    created_at: string;
    updated_at: string;
    is_admin: number;
    invitation_token: any;
    state: number;
    deleted_at: any;
}
