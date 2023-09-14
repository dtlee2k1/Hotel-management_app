import { useState, useEffect } from 'react'
import styled from 'styled-components'
import BookingDataBox from '../bookings/BookingDataBox'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from '../bookings/useBooking'
import { BookingType } from '../../types/booking.type'

import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'
import Spinner from '../../ui/Spinner'
import Checkbox from '../../ui/Checkbox'
import { formatCurrency } from '../../utils/helpers'
import useCheckin from './useCheckin'
import useSettings from '../settings/useSettings'

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const moveBack = useMoveBack()

  const { booking, isLoading } = useBooking()
  const { checkinMutate, isCheckingIn } = useCheckin()
  const { settings, isLoading: isLoadingSettings } = useSettings()
  const [confirmPaid, setConfirmPaid] = useState<boolean>(false)
  const [addBreakfast, setAddBreakfast] = useState<boolean>(false)

  useEffect(() => {
    if (booking?.isPaid) setConfirmPaid(true)
  }, [booking])

  if (isLoading || isLoadingSettings) return <Spinner />

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights
  } = booking as BookingType

  const optionalBreakfastPrice = Number(settings?.breakfastPrice) * numGuests * numNights

  function handleConfirmPaid() {
    setConfirmPaid((confirm) => !confirm)
  }

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkinMutate({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      })
    } else checkinMutate({ bookingId, breakfast: {} })
  }

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking as BookingType} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            id='breakfast'
            checked={addBreakfast}
            disabled={hasBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add)
              setConfirmPaid(false)
            }}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          id='confirm'
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={handleConfirmPaid}
        >
          I confirmed that {guests.fullName} has paid the total amount of{' '}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(
                totalPrice
              )} + ${formatCurrency(optionalBreakfastPrice)})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button $variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
