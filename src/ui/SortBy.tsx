import { useSearchParams } from 'react-router-dom'
import Option from '../types/options.type'
import Select from './Select'

interface SortByProps {
  options: Option[]
}

export default function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  // Get State from URL to sync with app
  const sortBy = searchParams.get('sortBy') || ''

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Store URL State
    searchParams.set('sortBy', e.target.value)
    setSearchParams(searchParams)
  }

  return <Select value={sortBy} options={options} type='white' onChange={handleChange} />
}
