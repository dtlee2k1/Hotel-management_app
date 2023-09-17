export interface UserAuth {
  fullName: string
  email: string
  password: string
}

export type EmailAuth = Pick<UserAuth, 'email' | 'password'>

export interface ISignupForm extends UserAuth {
  passwordConfirm: string
}
