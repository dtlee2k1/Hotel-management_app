import useSettings from './useSettings'
import useUpdateSetting from './useUpdateSetting'

import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {}
  } = useSettings()

  const { updateSettingMutate, isUpdating } = useUpdateSetting()

  const handleUpdate = (e: React.FocusEvent<HTMLInputElement, Element>, field: string) => {
    const { value } = e.target
    if (!value || +value <= 0) return
    updateSettingMutate({ [field]: +value })
  }

  if (isLoading) return <Spinner />

  return (
    <Form>
      <FormRow label='Minimum nights/booking' id='min-nights'>
        <Input
          type='number'
          id='min-nights'
          defaultValue={minBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum nights/booking' id='max-nights'>
        <Input
          type='number'
          id='max-nights'
          defaultValue={maxBookingLength}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>
      <FormRow label='Maximum guests/booking' id='max-guests'>
        <Input
          type='number'
          id='max-guests'
          defaultValue={maxGuestsPerBooking}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>
      <FormRow label='Breakfast price' id='breakfast-price'>
        <Input
          type='number'
          id='breakfast-price'
          defaultValue={breakfastPrice}
          disabled={isUpdating}
          onBlur={(e) => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
