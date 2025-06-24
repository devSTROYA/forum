import { IQuery, Query } from '@nestjs/cqrs';

export abstract class AppQuery<QueryInput extends Record<string, any>, QueryOutput>
  extends Query<QueryOutput>
  implements IQuery
{
  constructor(readonly payload: QueryInput = {} as QueryInput) {
    super();
  }
}
