import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { ISignupForm, UserAuth } from '../../types/auth.type'
import { useSignUp } from './useSignup'

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signUpMutate, isLoading } = useSignUp()

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors }
  } = useForm<ISignupForm>()

  const onSubmit = ({ fullName, email, password }: UserAuth) => {
    signUpMutate({ fullName, email, password })
  }

  return (
    <Form $item='regular' onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Full name' error={errors.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isLoading}
          {...register('fullName', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Email address' error={errors.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isLoading}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please provide a valid email address'
            }
          })}
        />
      </FormRow>

      <FormRow label='Password (min 8 characters)' error={errors.password?.message}>
        <Input
          type='password'
          id='password'
          disabled={isLoading}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password length must be at least 8 characters'
            }
          })}
        />
      </FormRow>

      <FormRow label='Repeat password' error={errors.passwordConfirm?.message}>
        <Input
          type='password'
          id='passwordConfirm'
          disabled={isLoading}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) => value === getValues().password || 'Passwords are not matching'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isLoading} $variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  )
}

export default SignupForm
