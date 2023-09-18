import { EmailAuth, UserAuth } from '../types/auth.type'
import supabase, { supabaseUrl } from './supabase'

export async function signUp({ fullName, email, password }: UserAuth) {
  let {
    data: { user },
    error
  } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: ''
      }
    }
  })

  if (error) throw new Error((error as Error).message)

  return user
}

export async function login({ email, password }: EmailAuth) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    throw new Error('Provided email or password is incorrect')
  }

  return data
}

export async function getCurrentUser() {
  let { data: session } = await supabase.auth.getSession()
  if (!session.session) return null

  const {
    data: { user },
    error
  } = await supabase.auth.getUser()

  if (error) throw new Error((error as Error).message)

  return user
}

export async function logout() {
  let { error } = await supabase.auth.signOut()
  if (error) throw new Error((error as Error).message)
}

export async function updateCurrentUser({ password, fullName, avatar }: Partial<UserAuth>) {
  // 1. Update password or fullName
  let updateData = {}

  if (password) updateData = { password }
  if (fullName) updateData = { data: { fullName } }

  const { data, error } = await supabase.auth.updateUser(updateData)

  if (error) throw new Error((error as Error).message)
  if (!avatar) return data

  // 2. Upload the avatar image
  const avatarName = `avatar-${data.user.id}-${Math.random()}`

  const { error: storageError } = await supabase.storage.from('avatars').upload(avatarName, avatar)

  if (storageError) {
    throw new Error((storageError as Error).message)
  }

  // 3. Upload avatar in the user
  const avatarPath = `${supabaseUrl}/storage/v1/object/public/avatars/${avatarName}`
  // 'https://txcfyapevwhlztzvncup.supabase.co/storage/v1/object/public/avatars/avatar-1.jpg'

  const { data: updateUser, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: avatarPath
    }
  })
  if (error2) {
    throw new Error((error2 as Error).message)
  }

  return updateUser
}
