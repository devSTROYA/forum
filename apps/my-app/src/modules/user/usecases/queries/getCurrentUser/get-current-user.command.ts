import { AppQuery } from '@app/cqrs';
import { AppException } from '@app/exception';
import { E } from '@core/logic';

import { GetCurrentUserDto, GetCurrentUserResponseDto } from './get-current-user.dto';

export class GetCurrentUserQuery extends AppQuery<GetCurrentUserDto, GetCurrentUserResult> {}

export type GetCurrentUserResult = E.Either<AppException, GetCurrentUserResponseDto>;
