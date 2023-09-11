import { useForm } from 'react-hook-form'

import useCreateCabin from './useCreateCabin'
import useUpdateCabin from './useUpdateCabin'
import CabinType from '../../types/cabin.type'

import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import FormRow from '../../ui/FormRow'

interface CreateCabinFormProps {
  cabinToEdit?: CabinType
  onCloseModal?: () => void
}

function CreateCabinForm(props: CreateCabinFormProps) {
  const { cabinToEdit = {}, onCloseModal } = props
  const { id: editId, ...editValues } = cabinToEdit as CabinType
  const isEditSession = Boolean(editId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues
  } = useForm<CabinType>({
    defaultValues: isEditSession ? editValues : {}
  })

  // Create New Cabin
  const { createCabinMutate, isCreating } = useCreateCabin()

  // Edit(Update) Cabin
  const { updateCabinMutate, isUpdating } = useUpdateCabin()

  const onSubmit = (data: CabinType) => {
    const image = typeof data.image === 'string' ? data.image : (data.image as FileList)[0]

    if (isEditSession)
      updateCabinMutate(
        {
          currCabin: { ...data, image },
          id: editId as string
        },
        {
          onSuccess: () => {
            onCloseModal && onCloseModal()
          }
        }
      )
    else
      createCabinMutate(
        { ...data, image },
        {
          onSuccess: () => {
            reset()
            onCloseModal && onCloseModal()
          }
        }
      )
  }

  const isWorking = isCreating || isUpdating

  return (
    <Form $item={onCloseModal ? 'modal' : 'regular'} onSubmit={handleSubmit(onSubmit)}>
      <FormRow id='name' label='Cabin name' error={errors.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow id='maxCapacity' label='Maximum capacity' error={errors.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1'
            }
          })}
        />
      </FormRow>

      <FormRow id='regularPrice' label='Regular price' error={errors.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Regular price should be at least $1'
            }
          })}
        />
      </FormRow>

      <FormRow id='discount' label='Discount' error={errors.discount?.message}>
        <Input
          type='number'
          id='discount'
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            min: {
              value: 0,
              message: 'Discount must not be less than 0'
            },
            validate: (value) =>
              Number(value) <= Number(getValues().regularPrice) ||
              'Discount should be less than regular price'
          })}
        />
      </FormRow>

      <FormRow id='description' label='Description for website' error={errors.description?.message}>
        <Textarea
          id='description'
          defaultValue=''
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow id='image' label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', { required: isEditSession ? false : 'This field is required' })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation='secondary' type='reset' onClick={onCloseModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Update' : 'Add'}</Button>
      </FormRow>
    </Form>
  )
}

export default CreateCabinForm
