import styled from 'styled-components'
import TodayItem from '../check-in-out/TodayItem'
import { ActivityType } from '../../types/activity.type'

const StyledTodayList = styled.ul`
  overflow: scroll;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`

interface TodayListProps {
  activities: ActivityType[]
}

export default function TodayList({ activities }: TodayListProps) {
  return (
    <StyledTodayList>
      {activities.map((activity) => (
        <TodayItem key={activity.id} activity={activity} />
      ))}
    </StyledTodayList>
  )
}
