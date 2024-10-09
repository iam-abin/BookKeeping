export interface UserDto {
    email: string;
    password: string;
}

export type UserSignInDto = UserDto;

export interface UserRegisterDto extends UserDto {
    name: string;
    role: string;
}
