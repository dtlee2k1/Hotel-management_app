import CabinType from '../types/cabin.type'
import { PAGE_SIZE } from '../utils/constants'
import supabase, { supabaseUrl } from './supabase'

export async function getCabins(page: number) {
  let query = supabase
    .from('cabins')
    .select('*', { count: 'exact' })
    .order('id', { ascending: true })

  if (page) {
    const from = (page - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1

    query = query.range(from, to)
  }

  let { data, count, error } = await query

  if (error) {
    throw new Error('Cabins could not be loaded')
  }

  return { data: data as CabinType[], count: count }
}

export async function createCabin(newCabin: CabinType) {
  let hasImagePath
  if (typeof newCabin.image === 'string')
    hasImagePath = (newCabin.image as string).startsWith(supabaseUrl)

  const imageName = `${Math.random()}-${(newCabin.image as File).name}`.replaceAll('/', '')

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // https://txcfyapevwhlztzvncup.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1.Create cabin
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single()

  if (error) {
    throw new Error('Cabin could not be created')
  }

  // 2.Upload image
  if (hasImagePath) return data as CabinType[]

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image as File)

  // Delete the cabin IF there was an error uploading the image

  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id)

    throw new Error('Cabin image could not be uploaded and the cabin was not created')
  }

  return data as CabinType[]
}

export async function updateCabin(currCabin: CabinType, id: string) {
  let hasImagePath = false
  if (typeof currCabin.image === 'string')
    hasImagePath = (currCabin.image as string).startsWith(supabaseUrl)

  const imageName = `${Math.random()}-${(currCabin.image as File).name}`.replaceAll('/', '')

  const imagePath = hasImagePath
    ? currCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  // https://txcfyapevwhlztzvncup.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  // 1.Update cabin
  const { data, error } = await supabase
    .from('cabins')
    .update({ ...currCabin, image: imagePath })
    .eq('id', id)
    .select()
    .order('id', { ascending: true })

  if (error) {
    throw new Error('Cabin could not be updated')
  }

  // 2.Upload image
  if (hasImagePath) return data as CabinType[]

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, currCabin.image as File)

  // Delete the cabin IF there was an error uploading the image

  if (storageError) {
    throw new Error('Cabin image could not be uploaded and the cabin was not updated')
  }

  return data as CabinType[]
}

export async function deleteCabin(id: string) {
  const { error } = await supabase.from('cabins').delete().eq('id', id)

  if (error) {
    throw new Error('Cabins could not be deleted')
  }
}
