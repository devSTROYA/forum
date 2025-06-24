import { AppCommand } from '@app/cqrs';
import { AppException } from '@app/exception';
import { E } from '@core/logic';

import { RevokeDto, RevokeResponseDto } from './revoke.dto';
import { RevokeErrors } from './revoke.error';

export class RevokeCommand extends AppCommand<RevokeDto, RevokeResult> {}

export type RevokeResult = E.Either<
  AppException | RevokeErrors.InvalidOrExpiredRefreshToken | RevokeErrors.UserNotFound,
  RevokeResponseDto
>;
