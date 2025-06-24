import { UserDto } from '../../../dtos';

export class GetCurrentUserDto {
  userId: string;
}

export class GetCurrentUserResponseDto {
  user: UserDto;
}
