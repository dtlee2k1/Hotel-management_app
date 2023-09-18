import { useForm } from 'react-hook-form'
import Button from '../../ui/Button'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'

import { useUpdateUser } from './useUpdateUser'
import { ISignupForm, UserAuth } from '../../types/auth.type'
import Form from '../../ui/Form'

function UpdatePasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset
  } = useForm<ISignupForm>()

  const { updateUserMutate, isUpdating } = useUpdateUser()

  function onSubmit({ password }: Partial<UserAuth>) {
    updateUserMutate({ password }, { onSuccess: () => reset() })
  }

  return (
    <Form $item='regular' onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Password (min 8 characters)' error={errors?.password?.message}>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters'
            }
          })}
        />
      </FormRow>

      <FormRow label='Confirm password' error={errors?.passwordConfirm?.message}>
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) => getValues().password === value || 'Passwords are not matching'
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={() => reset()} type='reset' $variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  )
}

export default UpdatePasswordForm
