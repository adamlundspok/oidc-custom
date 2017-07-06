export class UserAuth {
    public id_token: string;
    public subject: string;
    public name: string;

    public access_token: string;
    public token_type: string;
    public profile: any;
    public expires_at: number;

    public toStorageString(): string {
        return JSON.stringify(this);
    }

}
