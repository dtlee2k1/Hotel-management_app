export interface UserAuth {
  fullName: string
  email: string
  password: string
  avatar?: File | null
}

export type EmailAuth = Pick<UserAuth, 'email' | 'password'>

export interface ISignupForm extends UserAuth {
  passwordConfirm: string
}
