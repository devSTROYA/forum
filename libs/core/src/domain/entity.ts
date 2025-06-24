import { AggregateRoot } from '@nestjs/cqrs';

import { UniqueEntityID } from './unique-entity-id';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T extends Record<string, any>> extends AggregateRoot {
  protected readonly _id: UniqueEntityID;
  protected readonly props: T;

  constructor(props: T, id?: UniqueEntityID) {
    super();
    this._id = id || new UniqueEntityID();
    this.props = props;
  }

  isEquals(entity: Entity<T>): boolean {
    if (entity == null || entity == undefined) {
      return false;
    }

    if (!isEntity(entity)) {
      return false;
    }

    return this._id.isEquals(entity._id);
  }
}
