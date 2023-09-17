export interface User {
  fullName: string
  email: string
  password: string
}

export type EmailAuth = Pick<User, 'email' | 'password'>

export interface ISignupForm extends User {
  passwordConfirm: string
}
