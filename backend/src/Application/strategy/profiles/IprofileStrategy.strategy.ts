export interface IProfileStrategy {
    UserProfile (userId: string): Promise<any>;
}

