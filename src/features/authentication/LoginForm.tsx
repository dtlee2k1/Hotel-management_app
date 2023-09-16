import { useState } from 'react'
import Button from '../../ui/Button'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import FormRowVertical from '../../ui/FormRowVertical'
import SpinnerMini from '../../ui/SpinnerMini'
import { useLogin } from './useLogin'

function LoginForm() {
  const [email, setEmail] = useState<string>('leducthai2k1@example.com')
  const [password, setPassword] = useState<string>('12345678')

  const { loginMutate, isLoading } = useLogin()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email || !password) return
    loginMutate(
      { email, password },
      {
        onSettled: () => {
          setEmail('')
          setPassword('')
        }
      }
    )
  }

  return (
    <Form $item='regular' onSubmit={handleSubmit}>
      <FormRowVertical id='email' label='Email address'>
        <Input
          type='email'
          id='email'
          // This makes this form better for password managers
          autoComplete='username'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical id='password' label='Password'>
        <Input
          type='password'
          id='password'
          autoComplete='current-password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button disabled={isLoading} size='large'>
          {isLoading ? <SpinnerMini /> : 'Login'}
        </Button>
      </FormRowVertical>
    </Form>
  )
}

export default LoginForm
