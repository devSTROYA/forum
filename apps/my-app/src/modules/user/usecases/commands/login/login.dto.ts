export class LoginDto {
  username: string;
  password: string;
}

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
}
