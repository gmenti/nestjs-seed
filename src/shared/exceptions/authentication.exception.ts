import { CodedError } from './coded.exception';

export class AuthenticationError extends CodedError {
  constructor() {
    super(
      'NOT_AUTHENTICATED',
      'Invalid credentials or insufficient permission',
    );
  }
}
