import { useState } from 'react'
import { User } from '@supabase/supabase-js'
import { useUser } from './useUser'

import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import { useUpdateUser } from './useUpdateUser'
import Spinner from '../../ui/Spinner'

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user, isLoading } = useUser()
  const { updateUserMutate, isUpdating } = useUpdateUser()

  const {
    email,
    user_metadata: { fullName: currentFullName }
  } = user as User

  const [fullName, setFullName] = useState<string>(currentFullName)
  const [avatar, setAvatar] = useState<File | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!fullName) return
    updateUserMutate(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null)
        }
      }
    )
  }

  function handleCancel() {
    setFullName(currentFullName)
    setAvatar(null)
  }

  if (isLoading) return <Spinner />

  return (
    <Form $item='regular' onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input value={email} disabled />
      </FormRow>
      <FormRow id='fullName' label='Full name'>
        <Input
          id='fullName'
          type='text'
          value={fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRow>
      <FormRow id='avatar' label='Avatar image'>
        <FileInput
          id='avatar'
          accept='image/*'
          disabled={isUpdating}
          onChange={(e) => {
            setAvatar((e.target.files as FileList)[0])
          }}
        />
      </FormRow>
      <FormRow>
        <Button type='reset' onClick={handleCancel} $variation='secondary' disabled={isUpdating}>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
