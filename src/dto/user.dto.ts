export interface UserCredentialsDto {
    email: string;
    password: string;
}

export type UserSignInDto = UserCredentialsDto;

export interface UserRegisterDto extends UserCredentialsDto {
    password: string;
}
