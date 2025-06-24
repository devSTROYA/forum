import { Entity, UniqueEntityID } from '@core/domain';
import { Result, ResultType, Validation } from '@core/logic';
import { UserCreatedEvent, UserDeletedEvent, UserLoggedInEvent } from '@event/user';
import { EmailAddress } from './email-address';
import { Password } from './password';
import { UserId } from './user-id';
import { UserName } from './user-name';

type UserProps = {
  email: EmailAddress;
  username: UserName;
  password: Password;
  isEmailVerified?: boolean;
  isAdminUser?: boolean;
  accessToken?: string;
  refreshToken?: string;
  isDeleted?: boolean;
  lastLogin?: Date;
};

export class User extends Entity<UserProps> {
  get userId(): UserId {
    return this._id;
  }

  get email(): EmailAddress {
    return this.props.email;
  }

  get username(): UserName {
    return this.props.username;
  }

  get password(): Password {
    return this.props.password;
  }

  get accessToken(): string {
    return this.props.accessToken;
  }

  get refreshToken(): string {
    return this.props.refreshToken;
  }

  get isDeleted(): boolean {
    return this.props.isDeleted;
  }

  get isEmailVerified(): boolean {
    return this.props.isEmailVerified;
  }

  get isAdminUser(): boolean {
    return this.props.isAdminUser;
  }

  get lastLogin(): Date {
    return this.props.lastLogin;
  }

  isLoggedIn(): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken;
  }

  setAccessToken(accessToken: string, refreshToken: string): void {
    this.apply(
      new UserLoggedInEvent({
        userId: this.userId.toString(),
      })
    );
    this.props.accessToken = accessToken;
    this.props.refreshToken = refreshToken;
    this.props.lastLogin = new Date();
  }

  delete(): boolean {
    if (!this.props.isDeleted) {
      this.apply(
        new UserDeletedEvent({
          userId: this.userId.toString(),
        })
      );
      this.props.isDeleted = true;

      return true;
    }

    return false;
  }

  private constructor(props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: UserProps): ResultType<User> {
    const validatePropsResult = Validation.againstNullOrUndefinedBulk([
      { argument: props.username, argumentName: 'User name' },
      { argument: props.email, argumentName: 'email address' },
      { argument: props.password, argumentName: 'password' },
    ]);

    if (validatePropsResult.isFailure()) {
      return Result.fail<User>(validatePropsResult.getErrorValue());
    }

    const user = new User(
      {
        ...props,
        isDeleted: false,
        isEmailVerified: false,
        isAdminUser: props.isAdminUser ? props.isAdminUser : false,
      },
      UserId.generate()
    );

    user.apply(
      new UserCreatedEvent({
        userId: user.userId.toString(),
      })
    );

    return Result.ok<User>(user);
  }

  static retrieve(props: UserProps, id: UniqueEntityID): User {
    return new User(props, id);
  }
}
