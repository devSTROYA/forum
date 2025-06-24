import { Result, ResultType } from './result';

export class WithChanges {
  private changes: ResultType<any>[];

  constructor() {
    this.changes = [];
  }

  public addChange(result: ResultType<any>): void {
    this.changes.push(result);
  }

  public getChangeResult(): ResultType<any> {
    return Result.combine(this.changes);
  }
}
