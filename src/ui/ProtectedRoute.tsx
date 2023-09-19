import { useEffect } from 'react'
import styled from 'styled-components'
import { useUser } from '../features/authentication/useUser'
import Spinner from './Spinner'
import { useNavigate } from 'react-router-dom'

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--grey-color-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate()
  // 1. Load the Authenticated user
  const { isLoading, isAuthenticated } = useUser()
  // 2. If there is no authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login')
  }, [navigate, isAuthenticated, isLoading])

  // 3. While loading show the spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )

  // 4. If there is a user, render the app
  return isAuthenticated ? children : null
}
