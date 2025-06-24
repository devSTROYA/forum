import { E } from '@core/logic';
import { User, UserId } from '@domain/user';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { UserRepo } from '@repository/user';

import { UserMap } from '../../../dtos';
import { GetCurrentUserQuery, GetCurrentUserResult } from './get-current-user.command';

@QueryHandler(GetCurrentUserQuery)
export class GetCurrentUserQueryHandler implements IQueryHandler<GetCurrentUserQuery> {
  constructor(private readonly userRepo: UserRepo) {}

  async execute(query: GetCurrentUserQuery): Promise<GetCurrentUserResult> {
    const userId = UserId.retrieve(query.payload.userId);

    let user: User;

    try {
      user = await this.userRepo.getByUserId(userId);
    } catch (error) {
      return E.left(error);
    }

    return E.right({
      user: UserMap.toDto(user),
    });
  }
}
